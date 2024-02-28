import { titleFont } from "@/config/fonts";
import React from "react";

interface Props {
  title: string;
  subtitle?: string;
  className?: string;
}

export const Title = ({ title, subtitle, className }: Props) => {
  return (
    <div className={`flex flex-col items-center mt-7 mb-7 ${className}`}>
      <React.Fragment>
        <h1 className={`${titleFont.className} text-4xl font-bold`}>{title}</h1>
      </React.Fragment>
      {subtitle && <h2 className="text-xl">{subtitle}</h2>}
    </div>
  );
};
