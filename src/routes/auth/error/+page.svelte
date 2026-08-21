<script lang="ts">
  /**
   * Auth error page. Reads the Auth.js error query param.
   */
  import { page } from "$app/state";
  import ArrowLeft from "@lucide/svelte/icons/arrow-left";

  const error = $derived(page.url.searchParams.get("error"));
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
      <h1 class="text-4xl font-bold text-red-600 dark:text-red-500">
        Authentication Error
      </h1>
      <p class="mt-3 text-neutral-600 dark:text-neutral-300">
        {error === "AccessDenied"
          ? "Access denied."
          : "An error occurred during authentication. Please try again."}
      </p>
    </div>

    <div class="flex justify-center">
      <a
        href="/auth/signin"
        class="rounded-lg bg-gradient-to-r from-brandBlue-500 to-brandBlue-600 px-6 py-3 text-white shadow-lg shadow-brandBlue-500/20 transition-all hover:from-brandBlue-600 hover:to-brandBlue-700 hover:shadow-xl hover:shadow-brandBlue-500/30"
      >
        Try Again
      </a>
    </div>
  </div>
</div>
