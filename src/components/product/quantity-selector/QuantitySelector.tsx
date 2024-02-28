"use client";

import React, { useState } from "react";
import { IoAddCircleOutline, IoRemoveCircleOutline } from "react-icons/io5";

interface Props {
  quantity: number;

  onQuantityChange: (quantity: number) => void;
}

export const QuantitySelector = ({ quantity, onQuantityChange }: Props) => {
  const onValueChanged = (value: number) => {
    if (quantity + value < 1) return;

    onQuantityChange(quantity + value);
  };

  return (
    <div className="flex mt-5">
      <button className="px-3 py-3 rounded-md mr-3 text-lg">
        <IoRemoveCircleOutline
          color="#3B82F6"
          size={30}
          onClick={() => onValueChanged(-1)}
        />
      </button>
      <span className="px-3 py-3 rounded-md mr-3 text-lg font-semibold">
        {quantity}
      </span>
      <button
        className="px-3 py-3 rounded-md mr-3 text-lg"
        onClick={() => onValueChanged(1)}
      >
        <IoAddCircleOutline color="#3B82F6" size={30} />
      </button>
    </div>
  );
};
