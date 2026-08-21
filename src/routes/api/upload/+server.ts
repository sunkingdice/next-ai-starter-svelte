/**
 * Uploads a multipart file to S3 and returns the public URL.
 */
import { json } from "@sveltejs/kit";
import type { RequestHandler } from "./$types";
import { uploadFile } from "$lib/storage";

export const POST: RequestHandler = async ({ request }) => {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return json({ error: "No file" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const url = await uploadFile(file.name, buffer);
    return json({ url });
  } catch (error) {
    console.error("Upload error:", error);
    return json({ error: "Upload failed" }, { status: 500 });
  }
};
