<script module>
  import { defineMeta } from "@storybook/addon-svelte-csf";
  import Button from "../lib/components/Button.svelte";

  const { Story } = defineMeta({
    title: "Components/Button",
    component: Button,
    tags: ["autodocs"],
    argTypes: {
      variant: {
        control: "radio",
        options: ["primary", "secondary"],
      },
      size: {
        control: "radio",
        options: ["sm", "md", "lg"],
      },
    },
  });
</script>

<Story name="Primary" args={{ variant: "primary", size: "md" }}>
  {#snippet template({ variant, size })}
    <Button {variant} {size}>Primary Button</Button>
  {/snippet}
</Story>

<Story name="Secondary" args={{ variant: "secondary", size: "md" }}>
  {#snippet template({ variant, size })}
    <Button {variant} {size}>Secondary Button</Button>
  {/snippet}
</Story>

<Story name="Small" args={{ variant: "primary", size: "sm" }}>
  {#snippet template({ variant, size })}
    <Button {variant} {size}>Small Button</Button>
  {/snippet}
</Story>

<Story name="Large" args={{ variant: "primary", size: "lg" }}>
  {#snippet template({ variant, size })}
    <Button {variant} {size}>Large Button</Button>
  {/snippet}
</Story>
