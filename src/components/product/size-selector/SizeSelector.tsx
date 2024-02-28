import { Size } from "@/interfaces";
import clsx from "clsx";
import React from "react";

interface Props {
  selectedSize?: Size;
  availableSizes: Size[];

  onSizeChange: (size: Size) => void;
}

export const SizeSelector = ({
  selectedSize,
  availableSizes,
  onSizeChange,
}: Props) => {
  return (
    <div className="mt-5">
      <h1 className="text-xl font-bold">Tallas disponibles</h1>
      <div className="flex mt-5">
        {availableSizes.map((size) => (
          <button
            key={size}
            className={clsx(
              "px-3 py-3 rounded-md mr-3 text-lg hover:bg-gray-200 transition-all duration-300",
              {
                "bg-gray-300 und": size === selectedSize,
              }
            )}
            onClick={() => onSizeChange(size)}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};
