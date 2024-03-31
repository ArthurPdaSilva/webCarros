/* eslint-disable @typescript-eslint/no-explicit-any */
import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
  name: string;
  placeholder: string;
  type: "text" | "number" | "email" | "password";
  error?: string;
  rules?: RegisterOptions;
  register: UseFormRegister<any>;
  step?: string;
}

function Input({
  name,
  placeholder,
  type,
  error,
  step,
  rules,
  register,
}: InputProps) {
  return (
    <div>
      <input
        id={name}
        type={type}
        step={step}
        placeholder={placeholder}
        className="w-full border-2 rounded-md h-11 px-2"
        {...register(name, rules)}
      />
      {error && <p className="my-1 text-red-500">{error}</p>}
    </div>
  );
}

export default Input;
