"use client";
import React from "react";
import { IoIosArrowDown } from "react-icons/io";

export const Arrow = () => {
  const scrollDown = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };
  return (
    <>
      <button
        onClick={scrollDown}
        aria-label="Desliza para ver la colección"
        className="text-white"
      >
        <IoIosArrowDown className="animate-bounce" size={50} />
      </button>
      <p className="text-white text-sm mt-2">Desliza para ver la colección</p>
    </>
  );
};
