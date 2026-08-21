<script lang="ts">
  /**
   * Chat textarea with Groq transcription and a live waveform while recording.
   *
   * Key Behaviors:
   * - Records via MediaRecorder, posts audio to /api/transcribe, then submits.
   * - Exposes focus() and clear() for parent bind:this usage.
   */
  import { toast } from "svelte-sonner";
  import Mic from "@lucide/svelte/icons/mic";
  import Square from "@lucide/svelte/icons/square";
  import LoaderCircle from "@lucide/svelte/icons/loader-circle";

  const CHAT_INPUT_HEIGHT = "40px";

  interface Props {
    value?: string;
    isLoading?: boolean;
    minHeight?: string;
    placeholder?: string;
    shouldSubmitOnEnter?: boolean;
    onchange?: (value: string) => void;
    onsubmit?: (message: string) => Promise<void> | void;
  }

  let {
    value = $bindable(""),
    isLoading = false,
    minHeight = CHAT_INPUT_HEIGHT,
    placeholder = "Type your message...",
    shouldSubmitOnEnter = true,
    onchange,
    onsubmit,
  }: Props = $props();

  let isRecording = $state(false);
  let waveformActive = $state(false);
  let heights = $state<number[]>(new Array(20).fill(10));
  let maxHeight = $state(0);
  let textareaHeight = $state(CHAT_INPUT_HEIGHT);
  let isTranscribing = $state(false);

  let textareaEl = $state<HTMLTextAreaElement | null>(null);
  let audioChunks: Blob[] = [];
  let mediaRecorder: MediaRecorder | null = null;
  let animationFrameId: number | null = null;
  let audioCtx: AudioContext | null = null;
  let mediaStream: MediaStream | null = null;

  export function focus() {
    textareaEl?.focus();
  }

  export function clear() {
    value = "";
    onchange?.("");
    adjustTextareaHeight();
  }

  function adjustTextareaHeight() {
    if (!textareaEl) return;
    textareaEl.style.height = CHAT_INPUT_HEIGHT;
    const scrollHeight = textareaEl.scrollHeight;
    textareaEl.style.height = `${scrollHeight}px`;
    textareaHeight = `${Math.min(scrollHeight, 200)}px`;
  }

  function handleTextareaChange(event: Event) {
    const target = event.currentTarget as HTMLTextAreaElement;
    value = target.value;
    onchange?.(target.value);
    adjustTextareaHeight();
  }

  async function handleSubmit(transcription?: string) {
    if (!onsubmit) return;
    const messageToSubmit = transcription ?? value;
    if (!messageToSubmit.trim()) return;

    value = "";
    onchange?.("");
    if (textareaEl) textareaEl.value = "";
    adjustTextareaHeight();
    await onsubmit(messageToSubmit);
  }

  async function submitTranscription(transcription: string) {
    if (onsubmit) {
      await handleSubmit(transcription);
      return;
    }

    if (textareaEl) {
      textareaEl.value = transcription;
      value = transcription;
      onchange?.(transcription);
      adjustTextareaHeight();
    }
  }

  async function fetchTranscription(audioBlob: Blob): Promise<string | null> {
    isTranscribing = true;
    try {
      const formData = new FormData();
      formData.append("file", audioBlob, "audio.webm");

      const response = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        toast.error("Transcription failed.");
        return null;
      }

      const data = (await response.json()) as { text?: string };
      return data.text?.trim() ?? null;
    } catch (error) {
      console.error("Transcription error:", error);
      toast.error("An error occurred during transcription.");
      return null;
    } finally {
      isTranscribing = false;
    }
  }

  async function startRecording() {
    let stream = mediaStream;

    if (!stream || !stream.active || stream.getAudioTracks().length === 0) {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaStream = stream;
      } catch (error) {
        console.error("Microphone access denied:", error);
        toast.error("Microphone access is required to use voice recording.");
        return;
      }
    }

    isRecording = true;
    waveformActive = true;

    const mimeTypes = [
      "audio/webm;codecs=opus",
      "audio/ogg;codecs=opus",
      "audio/mp4",
    ];

    const mimeType = mimeTypes.find((type) => MediaRecorder.isTypeSupported(type));
    if (!mimeType) {
      toast.error("Recording is not supported in this browser.");
      isRecording = false;
      waveformActive = false;
      return;
    }

    audioCtx = new AudioContext();
    const source = audioCtx.createMediaStreamSource(stream);
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 128;
    source.connect(analyser);
    const dataArray = new Uint8Array(analyser.frequencyBinCount);

    const updateHeights = () => {
      analyser.getByteFrequencyData(dataArray);
      maxHeight = Math.max(...dataArray);
      heights = Array.from(dataArray.slice(0, 20));
      animationFrameId = requestAnimationFrame(updateHeights);
    };
    updateHeights();

    audioChunks = [];
    mediaRecorder = new MediaRecorder(stream, { mimeType });

    mediaRecorder.ondataavailable = (event: BlobEvent) => {
      audioChunks.push(event.data);
    };

    mediaRecorder.onstop = async () => {
      if (audioCtx) {
        await audioCtx.close();
        audioCtx = null;
      }
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      isRecording = false;
      waveformActive = false;

      const audioBlob = new Blob(audioChunks, { type: mimeType });
      if (audioBlob.size === 0) {
        toast.error("Recording failed. Please try again.");
        return;
      }

      const transcription = await fetchTranscription(audioBlob);
      if (transcription) {
        await submitTranscription(transcription);
      }
    };

    mediaRecorder.start();
  }

  function stopRecording() {
    mediaRecorder?.stop();
    mediaStream?.getTracks().forEach((track) => track.stop());
    mediaStream = null;
  }

  function handleKeydown(event: KeyboardEvent) {
    if (
      event.key === "Enter" &&
      (shouldSubmitOnEnter || event.shiftKey || event.ctrlKey || event.altKey)
    ) {
      event.preventDefault();
      void handleSubmit();
    }
  }

  $effect(() => {
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      void audioCtx?.close();
      mediaStream?.getTracks().forEach((track) => track.stop());
    };
  });
</script>

<div class="relative flex flex-col" style:min-height={minHeight}>
  <div
    class="hide-scrollbar flex h-full w-full items-center overflow-hidden overflow-y-scroll rounded-2xl border-aurora-100 bg-aurora-50/30 dark:border-sky-600/30 dark:bg-slate-700 transition-all duration-300 {waveformActive
      ? 'border-aurora-500/50 bg-gradient-to-r from-aurora-500/30 via-aurora-50/30 to-aurora-500/30 p-6'
      : 'p-1.5'}"
  >
    <textarea
      bind:this={textareaEl}
      class="hide-scrollbar m-0 flex-1 resize-none border-0 bg-transparent px-3 py-2 transition-colors focus:outline-none focus:ring-0 {waveformActive
        ? 'text-transparent'
        : 'text-dark-blue dark:text-slate-100'} {isLoading ? 'opacity-50' : ''}"
      {value}
      oninput={handleTextareaChange}
      onkeydown={handleKeydown}
      placeholder={waveformActive ? "" : placeholder}
      rows="1"
      disabled={waveformActive}
      style:min-height={waveformActive ? textareaHeight : minHeight}
    ></textarea>

    <div class="hide-scrollbar mr-2 mt-auto flex flex-row space-x-4">
      <button
        type="button"
        class="transform text-xl dark:text-gray-300 dark:hover:text-gray-500 {waveformActive
          ? 'z-20 mr-5 text-blossom-500 hover:text-blossom-700'
          : 'text-aurora-500 hover:text-aurora-600'}"
        onclick={isRecording ? stopRecording : startRecording}
        aria-label={isRecording ? "Stop recording" : "Start recording"}
        disabled={isTranscribing}
      >
        {#if isTranscribing}
          <LoaderCircle class="h-5 w-5 animate-spin" />
        {:else if isRecording}
          <Square class="h-8 w-8" />
        {:else}
          <Mic class="h-5 w-5" />
        {/if}
      </button>

      {#if onsubmit}
        <button
          type="button"
          class="flex h-8 w-8 items-center justify-center rounded-full bg-aurora-500 text-white transition-colors hover:bg-aurora-600 focus-visible:outline-none disabled:bg-gray-300 dark:bg-sky-600 dark:hover:bg-sky-700 dark:disabled:bg-gray-600 {waveformActive
            ? 'hidden'
            : ''}"
          disabled={!value.trim() || isLoading || waveformActive}
          onclick={() => void handleSubmit()}
          aria-label="Send message - or use cmd + enter"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11.3939 6.67973C11.7286 6.34499 12.2714 6.34499 12.6061 6.67973L16.4633 10.537C16.798 10.8717 16.798 11.4145 16.4633 11.7492C16.1286 12.084 15.5857 12.084 15.251 11.7492L12.8571 9.35534V16.7143C12.8571 17.1877 12.4734 17.5714 12 17.5714C11.5266 17.5714 11.1429 17.1877 11.1429 16.7143V9.35534L8.74902 11.7492C8.41428 12.084 7.87144 12.084 7.53669 11.7492C7.20195 11.4145 7.20195 10.8717 7.53669 10.537L11.3939 6.67973Z"
              fill="currentColor"
            />
          </svg>
        </button>
      {/if}
    </div>

    {#if waveformActive}
      <div class="absolute left-1/2 top-5 flex -translate-x-1/2 transform justify-center">
        <div class="flex">
          {#each heights as height, index}
            {@const centerIndex = heights.length / 2}
            {@const distanceFromCenter = Math.abs(index - centerIndex)}
            {@const maxDistance = heights.length / 2}
            {@const factor = 1 - distanceFromCenter / maxDistance}
            {@const adjustedHeight = index > 0 ? Math.round(height * factor * 1.3) : 0}
            <div
              class="w-1 rounded-full transition-transform duration-75 {adjustedHeight >
              100
                ? 'bg-aurora-500'
                : adjustedHeight > 50
                  ? 'bg-aurora-500/80'
                  : 'bg-aurora-500/40'}"
              style:height="50px"
              style:transform-origin="center"
              style:margin-left="{Math.max(Math.round(maxHeight / 30), 6)}px"
              style:transform="scaleY({Math.max(adjustedHeight, 20) / 128})"
            ></div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>
