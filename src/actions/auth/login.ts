"use server";
import { signIn } from "@/auth.config";
import { sleep } from "@/utils";
import { sign } from "crypto";

export async function authenticate(
  prevState: string | undefined,
  formData: FormData
) {
  try {
    // await sleep(1);
    await signIn("credentials", {
      ...Object.fromEntries(formData),
      redirect: false,
    });

    console.log("Success");
    return "Success";
  } catch (error) {
    if ((error as any).type === "CredentialsSignin") {
      console.log("CredentialsSignin");
      return "CredentialsSignin";
    }

    return "Error de autenticación.";
  }
}

export const login = async (email: string, password: string) => {
  try {
    await signIn("credentials", {
      email,
      password,
    });
    return {
      ok: true,
      message: "Inicio de sesión exitoso",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "Error al iniciar sesión",
    };
  }
};
