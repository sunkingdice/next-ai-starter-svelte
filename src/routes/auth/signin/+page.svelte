<script lang="ts">
  /**
   * Email magic-link sign-in form using Auth.js client helpers.
   */
  import { signIn } from "@auth/sveltekit/client";
  import { page } from "$app/state";
  import ArrowLeft from "@lucide/svelte/icons/arrow-left";
  import Mail from "@lucide/svelte/icons/mail";

  let email = $state("");
  let isLoading = $state(false);

  const callbackUrl = $derived(page.url.searchParams.get("callbackUrl") || "/");

  async function handleSubmit(event: SubmitEvent) {
    event.preventDefault();
    isLoading = true;
    await signIn("nodemailer", { email, redirectTo: callbackUrl });
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
      <h1 class="text-4xl font-bold">
        <span
          class="bg-clip-text text-transparent bg-gradient-to-r from-brandBlue-500 to-brandBlue-700 dark:from-brandBlue-400 dark:to-brandBlue-600"
        >
          Welcome
        </span>
      </h1>
      <p class="mt-3 text-neutral-600 dark:text-neutral-300">
        Enter your email to sign in or create an account
      </p>
    </div>

    <div class="rounded-2xl bg-white dark:bg-neutral-800/50 p-8 shadow-xl">
      <form onsubmit={handleSubmit} class="space-y-6">
        <div>
          <label
            for="email"
            class="block text-sm font-medium text-neutral-700 dark:text-neutral-300"
          >
            Email address
          </label>
          <div class="mt-2">
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              bind:value={email}
              class="block w-full rounded-lg border border-neutral-300 dark:border-neutral-600 px-4 py-3 text-neutral-900 dark:text-white placeholder-neutral-500 dark:placeholder-neutral-400 shadow-sm dark:bg-neutral-800 focus:border-brandBlue-500 dark:focus:border-brandBlue-400 focus:ring-brandBlue-500 dark:focus:ring-brandBlue-400"
              placeholder="you@example.com"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          class="group relative flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-brandBlue-500 to-brandBlue-600 px-4 py-3 text-white shadow-lg shadow-brandBlue-500/20 transition-all hover:from-brandBlue-600 hover:to-brandBlue-700 hover:shadow-xl hover:shadow-brandBlue-500/30 focus:outline-none focus:ring-2 focus:ring-brandBlue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Mail class="h-5 w-5" />
          {isLoading ? "Sending link..." : "Sign in with Email"}
        </button>
      </form>

      <div class="mt-6">
        <p class="text-center text-sm text-neutral-600 dark:text-neutral-400">
          By signing in, you agree to our
          <a
            href="https://example.com/legal"
            class="font-medium text-brandBlue-600 dark:text-brandBlue-400 hover:text-brandBlue-500"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  </div>
</div>
