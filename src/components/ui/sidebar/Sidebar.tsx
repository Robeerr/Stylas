"use client";

import { logout } from "@/actions";
import { useStore } from "@/store";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import {
  IoArrowDownOutline,
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";

export const Sidebar = () => {
  const isSidebarOpen = useStore((state) => state.isSidebarOpen);
  const closeSidebar = useStore((state) => state.closeSidebar);

  const { data: session } = useSession();

  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user.role === "admin";

  return (
    <div>
      {/* Background black */}
      {isSidebarOpen && (
        <div className="fixed inset-0 w-screen h-screen z-10 bg-black opacity-30"></div>
      )}

      {/* Blur */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
          onClick={() => closeSidebar()}
        ></div>
      )}

      {/* Side Menu */}
      <nav
        className={clsx(
          "flex flex-col fixed p-5 inset-y-0 left-0 w-full max-w-xs bg-white z-20 shadow-2xl transform transition-all duration-300",
          {
            "-translate-x-full": !isSidebarOpen,
          }
        )}
      >
        <IoCloseOutline
          className="absolute top-5 right-5 text-3xl cursor-pointer"
          onClick={() => closeSidebar()}
        />
        <div className="relative mt-14">
          <IoSearchOutline className="absolute top-1 left-3 text-2xl" />
          <input
            type="text"
            className="w-full pl-10 py-1 rounded border border-gray-300 justify-center focus:outline-none focus:ring-2 focus:ring-green-500 transition-all duration-300"
            placeholder="Buscar"
          />
        </div>

        {isAuthenticated && (
          <>
            <Link
              href="/profile"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all duration-300"
              onClick={() => closeSidebar()}
            >
              <IoPersonOutline size={30} />
              <span className="ml-3">Mi cuenta</span>
            </Link>

            <Link
              href="/orders"
              className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all duration-300"
              onClick={() => closeSidebar()}
            >
              <IoTicketOutline size={30} />
              <span className="ml-3">Pedidos</span>
            </Link>
            <div className="w-full h-px border-t border-gray-300 my-10"></div>
          </>
        )}

        {/* Main content */}

        {
          // If user is not authenticated
          !isAuthenticated && (
            <>
              <div className="flex-grow overflow-y-auto flex justify-center items-center h-screen">
                <div className="flex flex-col items-center justify-center p-2 rounded transition-all duration-300">
                  <h1 className="text-gray-500 text-lg font-semibold">
                    Inicia sesión para ver más opciones
                  </h1>
                  <IoArrowDownOutline size={50} className="ml-3 mt-10" />
                </div>
              </div>
            </>
          )
        }

        {/* Separator line */}

        {isAuthenticated && isAdmin && (
          <>
            <div className=" overflow-y-auto flex flex-col">
              <h1 className="text-lg font-semibold text-gray-500">
                Panel de administrador
              </h1>
              <Link
                href="/admin/products"
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all duration-300"
                onClick={() => closeSidebar()}
              >
                <IoShirtOutline size={30} />
                <span className="ml-3">Productos</span>
              </Link>

              <Link
                href="/admin/orders"
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all duration-300"
                onClick={() => closeSidebar()}
              >
                <IoTicketOutline size={30} />
                <span className="ml-3">Revisar pedidos de clientes</span>
              </Link>

              <Link
                href="/admin/users"
                className="flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all duration-300"
                onClick={() => closeSidebar()}
              >
                <IoPeopleOutline size={30} />
                <span className="ml-3">Clientes</span>
              </Link>
            </div>
          </>
        )}
        <div className="mt-auto">
          {isAuthenticated && (
            <>
              <span className="ml-3">Hola de nuevo, {session?.user.name}</span>

              {/* Solo mostrar el enlace a /admin si el usuario es admin */}
              {isAdmin && (
                <Link
                  href="/admin"
                  className="flex items-center p-2 hover:bg-gray-100 rounded transition-all duration-300"
                  onClick={() => closeSidebar()}
                >
                  <IoPeopleOutline size={30} />
                  <span className="ml-3">Admin</span>
                </Link>
              )}

              <div
                className="flex items-center p-2 hover:bg-red-100 rounded cursor-pointer transition-all duration-300"
                onClick={() => logout()}
              >
                <IoLogOutOutline size={30} />
                <button className="ml-3">Salir</button>
              </div>
            </>
          )}
        </div>

        {!isAuthenticated && (
          <div className="flex items-center p-2 hover:bg-blue-100 rounded cursor-pointer transition-all duration-300">
            <IoLogInOutline size={30} />
            <Link className="ml-3" href="/auth/login">
              Inicia sesión
            </Link>
          </div>
        )}
        {/* Bottom buttons */}
      </nav>
    </div>
  );
};
