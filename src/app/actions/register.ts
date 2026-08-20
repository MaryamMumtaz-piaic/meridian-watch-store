"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const existing = await prisma.user.findUnique({ where: { email: data.email } });
  if (existing) return { error: "Email already registered" };

  const passwordHash = await bcrypt.hash(data.password, 12);
  await prisma.user.create({
    data: { name: data.name, email: data.email, passwordHash },
  });
  return { success: true };
}
