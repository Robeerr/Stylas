"use client";

import { logout } from "@/actions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React, { use } from "react";

export const PerfilPage = () => {
  const session = useSession();
  console.log(session);
  return (
    <div className="">
      <div className="text-center mt-20">
        <h3 className="text-4xl font-semibold leading-normal mb-2 text-blueGray-700">
          {session.data?.user.name}
        </h3>
      </div>
      <div className="mt-20 py-10 border-t border-blueGray-200 text-center">
        <div className="flex flex-wrap justify-center gap-10 mt-20">
          <div className="hover:text-blue-700 transition-all duration-300">
            {" "}
            <button className="flex flex-col items-center justify-center tr-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-14 w-14 text-gray-500 hover:text-blue-700 transition-all duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span className="text-lg font-medium">Mi Perfil</span>
            </button>
          </div>

          <div className="hover:text-blue-700 transition-all duration-300">
            <Link
              className="flex flex-col items-center justify-center tr-300 "
              href="/orders"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-14 w-14 text-gray-500 hover:text-blue-700 transition-all duration-300"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <span className="text-lg font-medium">Mis Pedidos</span>
            </Link>
          </div>

          <div className="hover:text-red-500 cursor-pointer transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-14 w-14 text-gray-500 hover:text-red-500 transition-all duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
            <div className="text-lg font-medium" onClick={() => logout()}>
              <button>Salir</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
