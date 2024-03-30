/* eslint-disable @typescript-eslint/no-explicit-any */
import { RegisterOptions, UseFormRegister } from "react-hook-form";

interface InputProps {
  name: string;
  placeholder: string;
  type: string;
  error?: string;
  rules?: RegisterOptions;
  register: UseFormRegister<any>;
}

function Input({
  name,
  placeholder,
  type,
  error,
  rules,
  register,
}: InputProps) {
  return (
    <div>
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className="w-full border-2 rounded-md h-11 px-2"
        {...register(name, rules)}
      />
      {error && <p className="my-1 text-red-500">{error}</p>}
    </div>
  );
}

export default Input;
