"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({ email: z.string().email() });

export async function subscribeToNewsletter(
  _prev: { ok: boolean; message: string } | null,
  formData: FormData,
) {
  const parsed = schema.safeParse({ email: formData.get("email") });
  if (!parsed.success) {
    return { ok: false, message: "Please enter a valid email address." };
  }

  const email = parsed.data.email.toLowerCase();

  // Re-subscribing is a no-op rather than an error the visitor has to resolve.
  await prisma.newsletterSubscriber.upsert({
    where: { email },
    update: {},
    create: { email },
  });

  return { ok: true, message: "Thanks — you're on the list." };
}
