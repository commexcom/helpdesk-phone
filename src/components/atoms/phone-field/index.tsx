"use client";

import * as React from "react";
import { ImageWrapper } from "../image-wrapper";
import clsx from "clsx";
import { FieldNames } from "@/components/organisms/phone-form";

interface PhoneFieldProps {
  name: FieldNames;
  value: string;
  onChange: (value: string) => void;
  validateField: (field: FieldNames) => void;
  className?: string;
}

export const PhoneField: React.FC<PhoneFieldProps> = ({
  name,
  value,
  onChange,
  validateField,
  className,
}) => {
  const formatPhoneNumber = (input: string): string => {
    const numbers = input.replace(/\D/g, ""); // Remove tudo que não for número
    if (numbers.length === 0) return ""; // Se não houver números, retorna vazio
    if (numbers.length <= 2) return `(${numbers}`;
    if (numbers.length <= 7)
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    if (numbers.length <= 11)
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
  };

  // Manipula a mudança do input aplicando a máscara
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    onChange(formatted);
  };

  return (
    <div
      className={clsx(
        className,
        "flex flex-row overflow-hidden p-2.5 w-full text-xs md:text-base text-left rounded-xl bg-slate-100"
      )}
    >
      <span className="self-stretch mr-2 text-xs md:text-base">+55</span>

      <input
        type="tel"
        placeholder="Whatsapp com DDD"
        value={value}
        onChange={handleChange}
        onBlur={() => validateField(name)}
        className="bg-transparent w-full"
      />
      <ImageWrapper
        imageUrl="/WPP-GRAY.png"
        alt="Logo whatsapp cinza"
        className="w-[1.5em]"
      />
    </div>
  );
};
