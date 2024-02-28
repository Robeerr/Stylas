"use server";

import { signOut } from "@/auth.config";

export const logout = async () => {
  await signOut();
  console.log("Logged out");
};
