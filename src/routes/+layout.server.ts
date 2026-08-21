/**
 * Loads the Auth.js session for every route via $page.data.session.
 */
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async (event) => {
  return {
    session: await event.locals.auth(),
  };
};
