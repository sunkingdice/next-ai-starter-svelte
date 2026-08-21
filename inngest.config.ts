/**
 * Inngest client, typed events, and background functions.
 */
import { Inngest } from "inngest";

export type AppEvents = {
  "user/registered": {
    data: {
      userId: string;
      email: string;
      name?: string;
      timestamp: string;
    };
  };
  "inngest/send": {
    data: {
      message: string;
      metadata?: Record<string, unknown>;
    };
  };
};

export const inngest = new Inngest({
  id: "newco",
  eventKey: "events",
});

export const userRegisteredFn = inngest.createFunction(
  { id: "user-registered-handler" },
  { event: "user/registered" },
  async ({ event, step }) => {
    await step.run("Log registration", async () => {
      console.log(`New user registered: ${event.data.email}`);
    });

    await step.run("Send welcome email", async () => {
      console.log(`Sending welcome email to ${event.data.email}`);
    });
  },
);

export const messageHandlerFn = inngest.createFunction(
  { id: "message-handler" },
  { event: "inngest/send" },
  async ({ event, step }) => {
    await step.run("Process message", async () => {
      console.log(`Processing message: ${event.data.message}`);
      if (event.data.metadata) {
        console.log("Metadata:", event.data.metadata);
      }
    });
  },
);
