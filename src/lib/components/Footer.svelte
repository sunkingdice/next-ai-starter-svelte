<script lang="ts">
  /**
   * Site footer with legal links.
   */
  interface Props {
    year?: number;
  }

  let { year = new Date().getFullYear() }: Props = $props();
</script>

<footer
  class="border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900"
>
  <div
    class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col md:flex-row items-center justify-between gap-4"
  >
    <span class="text-sm text-neutral-600 dark:text-neutral-400">
      © {year} All Rights Reserved
    </span>
    <div
      class="flex items-center gap-6 text-sm text-neutral-600 dark:text-neutral-400"
    >
      <a
        href="/privacy"
        class="hover:text-blue-600 dark:hover:text-blue-400"
      >
        Privacy Policy
      </a>
      <a href="/terms" class="hover:text-blue-600 dark:hover:text-blue-400">
        Terms of Service
      </a>
      <a href="/contact" class="hover:text-blue-600 dark:hover:text-blue-400">
        Contact
      </a>
    </div>
  </div>
</footer>
