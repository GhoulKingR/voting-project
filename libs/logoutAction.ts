"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function logout() {
  "use server";
  (await cookies()).delete("token");
  redirect("/");
}
