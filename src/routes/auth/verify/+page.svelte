<script lang="ts">
  /**
   * Post-email-send confirmation for magic-link auth.
   */
  import ArrowLeft from "@lucide/svelte/icons/arrow-left";
  import Mail from "@lucide/svelte/icons/mail";
</script>

<div
  class="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950 px-4"
>
  <a
    href="/"
    class="group absolute left-4 top-4 flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-neutral-600 transition-colors hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200"
  >
    <ArrowLeft class="h-4 w-4 transition-transform group-hover:-translate-x-1" />
    Back
  </a>

  <div class="w-full max-w-md space-y-8">
    <div class="text-center">
      <div
        class="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-brandBlue-100 dark:bg-brandBlue-900"
      >
        <Mail class="h-6 w-6 text-brandBlue-600 dark:text-brandBlue-400" />
      </div>
      <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">
        Check your email
      </h1>
      <p class="mt-3 text-neutral-600 dark:text-neutral-300">
        A sign in link has been sent to your email address. Please check your
        inbox and click the link to continue.
      </p>
    </div>

    <div class="rounded-2xl bg-white dark:bg-neutral-800/50 p-8 shadow-xl">
      <div class="space-y-4 text-sm text-neutral-600 dark:text-neutral-400">
        <p>
          <strong>Didn't receive the email?</strong>
        </p>
        <ul class="list-disc pl-4 space-y-2">
          <li>Check your spam folder</li>
          <li>Make sure you entered the correct email address</li>
          <li>
            If you still haven't received it after a few minutes,
            <a
              href="/auth/signin"
              class="text-brandBlue-600 dark:text-brandBlue-400 hover:text-brandBlue-500"
            >
              try signing in again
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>
