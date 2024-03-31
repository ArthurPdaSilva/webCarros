import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FiUpload } from "react-icons/fi";
import Input from "../../../components/Input";
import PhoneInput from "./PhoneInput";
import { FormData, schema } from "./schema";

function New() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: "onChange",
  });

  function onSubmit(data: FormData) {
    console.log(data);
  }

  return (
    <>
      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2">
        <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32 md:w-48">
          <div className="absolute cursor-pointer">
            <FiUpload size={30} color="#000" />
          </div>
          <div className="cursor-pointer">
            <input
              type="file"
              accept="image/*"
              className="opacity-0 cursor-pointer"
            />
          </div>
        </button>
      </div>
      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2 mt-2">
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <p className="mb-2 font-medium">Nome do Carro</p>
            <Input
              name="name"
              register={register}
              placeholder="Ex: Onix 1.0"
              type="text"
              error={errors.name?.message}
            />
          </div>
          <div className="mb-3">
            <p className="mb-2 font-medium">Modelo do Carro</p>
            <Input
              name="model"
              register={register}
              placeholder="Ex: 1.0 Flex Plux "
              type="text"
              error={errors.model?.message}
            />
          </div>

          <div className="flex w-full mb-3 flex-row items-center gap-4">
            <div className="w-full">
              <p className="mb-2 font-medium">Ano</p>
              <Input
                name="year"
                register={register}
                placeholder="Ex: 2021"
                type="number"
                rules={{ valueAsNumber: true }}
                error={errors.year?.message}
              />
            </div>
            <div className="w-full">
              <p className="mb-2 font-medium">KM rodados</p>
              <Input
                name="km"
                register={register}
                placeholder="Ex: 23.900"
                type="number"
                rules={{ valueAsNumber: true }}
                error={errors.km?.message}
              />
            </div>
          </div>
          <div className="flex w-full mb-3 flex-row items-center gap-4">
            <div className="w-full">
              <p className="mb-2 font-medium">Telefone / Whatsapp</p>
              <PhoneInput
                register={register}
                error={errors.whatsapp?.message}
              />
            </div>
            <div className="w-full">
              <p className="mb-2 font-medium">Cidade </p>
              <Input
                name="city"
                register={register}
                placeholder="Ex: Serra Branca"
                type="text"
                error={errors.city?.message}
              />
            </div>
          </div>

          <div className="mb-3">
            <p className="mb-2 font-medium">Preço</p>
            <Input
              name="price"
              register={register}
              placeholder="Ex: Onix 1.0"
              type="number"
              rules={{ valueAsNumber: true }}
              error={errors.price?.message}
            />
          </div>
          <div className="mb-3">
            <p className="mb-2 font-medium">Descrição</p>
            <textarea
              className="border-2 w-full rounded-md h-24 px-2 resize-none"
              {...register("description")}
              name="description"
              placeholder="Digite a descrição do carro"
              id="description"
            />
            {errors.description && (
              <span className="mb-1 text-red-500 ">
                {errors.description.message}
              </span>
            )}
          </div>
          <button className="w-full rounded-md bg-zinc-900 text-white font-medium h-10">
            Cadastrar
          </button>
        </form>
      </div>
    </>
  );
}

export default New;
