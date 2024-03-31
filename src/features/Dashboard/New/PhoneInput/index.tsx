/* eslint-disable @typescript-eslint/no-explicit-any */
import { UseFormRegister } from "react-hook-form";

interface InputProps {
  error?: string;
  register: UseFormRegister<any>;
}

function PhoneInput({ error, register }: InputProps) {
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputPhoneNumber = event.target.value.replace(/\D/g, "");

    const formattedPhoneNumber = inputPhoneNumber.replace(
      /^(\d{2})(\d{4,5})(\d{4})$/,
      "($1) $2-$3"
    );

    event.target.value = formattedPhoneNumber;
  }

  return (
    <div>
      <input
        id="whatapp"
        type="text"
        maxLength={15}
        placeholder="Ex: (99) 99999-9999"
        className="w-full border-2 rounded-md h-11 px-2"
        {...register("whatsapp", { required: "Campo obrigatório" })}
        onChange={handleChange}
      />
      {error && <p className="my-1 text-red-500">{error}</p>}
    </div>
  );
}

export default PhoneInput;
