/**
 * Auth.js form-action handler for email sign-in.
 */
import { signIn } from "../../../auth";
import type { Actions } from "./$types";

export const actions: Actions = { default: signIn };
