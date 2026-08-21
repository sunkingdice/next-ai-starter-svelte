/**
 * HTML welcome email. Resend accepts html strings — no React needed.
 */
export function welcomeEmailHtml(name: string) {
  const safeName = name.replace(/[<>&"]/g, (char) => {
    const entities: Record<string, string> = {
      "<": "&lt;",
      ">": "&gt;",
      "&": "&amp;",
      '"': "&quot;",
    };
    return entities[char] ?? char;
  });

  return `<div>
  <h1>Welcome, ${safeName}!</h1>
  <p>Thanks for joining us!</p>
</div>`;
}
