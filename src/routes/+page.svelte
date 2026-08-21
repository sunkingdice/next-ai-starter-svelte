<script lang="ts">
  /**
   * Home page: marketing CTA when signed out, welcome when signed in.
   */
  import ArrowRight from "@lucide/svelte/icons/arrow-right";
  import Footer from "$lib/components/Footer.svelte";

  let { data } = $props();
  const year = new Date().getFullYear();
</script>

<div class="min-h-screen flex flex-col relative">
  <main class="flex-1 flex flex-col w-full mx-auto">
    <div
      class="flex-1 flex items-start justify-center bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-900 dark:to-neutral-950"
    >
      {#if data.session}
        <section class="max-w-7xl w-full space-y-8 fade-in">
          <h1>Welcome {data.session.user?.name}</h1>
        </section>
      {:else}
        <section class="max-w-7xl w-full space-y-8 fade-in">
          <div
            class="flex flex-col sm:flex-row gap-4 items-center justify-center"
          >
            <h1 class="text-4xl font-bold mt-10">
              Welcome - Click the button below to get started
            </h1>
            <a
              href="/auth/signin"
              class="group w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg px-8 py-4 text-lg font-medium shadow-lg shadow-blue-500/20 transition-all duration-200 hover:shadow-xl hover:shadow-blue-500/30"
            >
              Get Started
              <ArrowRight
                class="w-5 h-5 group-hover:translate-x-1 transition-transform"
              />
            </a>
          </div>
        </section>
      {/if}
    </div>
  </main>

  <Footer {year} />
</div>
