<script lang="ts">
  /**
   * Theme-aware svelte-sonner toaster mounted once in the root layout.
   */
  import { Toaster } from "svelte-sonner";
  import { mode } from "mode-watcher";
</script>

<Toaster
  theme={mode.current === "dark" ? "dark" : "light"}
  position="top-right"
  richColors
/>
