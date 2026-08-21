<script lang="ts">
  /**
   * Root layout: theme watcher, toasts, and global styles.
   */
  import "../app.css";
  import { ModeWatcher } from "mode-watcher";
  import Toaster from "$lib/components/Toaster.svelte";

  let { children } = $props();
</script>

<svelte:head>
  <title></title>
  <meta name="description" content="" />
</svelte:head>

<ModeWatcher />
<Toaster />
{@render children()}
