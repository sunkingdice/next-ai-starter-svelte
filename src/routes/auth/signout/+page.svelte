<script lang="ts">
  /**
   * Confirm-and-sign-out page using Auth.js client helpers.
   */
  import { signOut } from "@auth/sveltekit/client";
  import ArrowLeft from "@lucide/svelte/icons/arrow-left";
  import LogOut from "@lucide/svelte/icons/log-out";

  let isLoading = $state(false);

  async function handleSignOut() {
    isLoading = true;
    await signOut({ redirectTo: "/" });
  }
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
        <LogOut class="h-6 w-6 text-brandBlue-600 dark:text-brandBlue-400" />
      </div>
      <h1 class="text-2xl font-bold text-neutral-900 dark:text-white">
        Sign out
      </h1>
      <p class="mt-3 text-neutral-600 dark:text-neutral-300">
        Are you sure you want to sign out?
      </p>
    </div>

    <div class="rounded-2xl bg-white dark:bg-neutral-800/50 p-8 shadow-xl">
      <div class="flex flex-col gap-4">
        <button
          onclick={handleSignOut}
          disabled={isLoading}
          class="group relative flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brandBlue-500 to-brandBlue-600 px-4 py-3 text-white shadow-lg shadow-brandBlue-500/20 transition-all hover:from-brandBlue-600 hover:to-brandBlue-700 hover:shadow-xl hover:shadow-brandBlue-500/30 focus:outline-none focus:ring-2 focus:ring-brandBlue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <LogOut class="h-5 w-5" />
          {isLoading ? "Signing out..." : "Sign out"}
        </button>

        <a
          href="/"
          class="flex w-full items-center justify-center gap-2 rounded-lg border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-3 text-neutral-700 dark:text-neutral-300 shadow-sm transition-all hover:bg-neutral-50 dark:hover:bg-neutral-700 focus:outline-none focus:ring-2 focus:ring-brandBlue-500 focus:ring-offset-2"
        >
          Cancel
        </a>
      </div>
    </div>
  </div>
</div>
