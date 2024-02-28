import { create } from "zustand";
import { persist } from "zustand/middleware";

interface State {
  direccion: {
    nombre: string;
    apellidos: string;
    direccion: string;
    direccion2?: string;
    codigoPostal: string;
    pais: string;
    ciudad: string;
    telefono: string;
  };

  //Metodos
  setDireccion: (direccion: State["direccion"]) => void;
}

export const useAddressStore = create<State>()(
  persist(
    (set, get) => ({
      direccion: {
        nombre: "",
        apellidos: "",
        direccion: "",
        direccion2: "",
        codigoPostal: "",
        pais: "",
        ciudad: "",
        telefono: "",
      },
      setDireccion: (direccion) => set({ direccion }),
    }),
    {
      name: "address-store",
    }
  )
);
