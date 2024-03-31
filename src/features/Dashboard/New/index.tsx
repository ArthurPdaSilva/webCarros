import { zodResolver } from "@hookform/resolvers/zod";
import { addDoc, collection } from "firebase/firestore";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Input from "../../../components/Input";
import useAuth from "../../../hooks/useAuth";
import { db } from "../../../services/firebaseConnection";
import FileInput from "./FileInput";
import PhoneInput from "./PhoneInput";
import { FormData, schema } from "./schema";
import { ImageItemProps } from "./types";

function New() {
  const { user } = useAuth();
  const [images, setImages] = useState<ImageItemProps[]>([]);

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
    if (images.length < 2) {
      toast.error("Envie pelo menos 2 imagens desse carro");
      return;
    }

    const carListImages = images.map((image) => ({
      uid: image.uid,
      url: image.url,
      name: image.name,
    }));

    addDoc(collection(db, "cars"), {
      name: data.name.toUpperCase(),
      model: data.model,
      year: data.year,
      km: data.km,
      price: data.price,
      city: data.city,
      whatsapp: data.whatsapp,
      description: data.description,
      owner: user?.name,
      uid: user?.uid,
      images: carListImages,
      created: new Date(),
    })
      .then(() => {
        reset();
        setImages([]);
        toast.success("Carro cadastrado com sucesso");
      })
      .catch(() => {
        toast.error("Falha ao criar um carro");
      });
  }

  return (
    <>
      <div className="w-full bg-white p-3 rounded-lg flex flex-col sm:flex-row items-center gap-2">
        <FileInput images={images} setImages={setImages} />
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
                step="any"
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
              placeholder="Ex: 44.550"
              type="number"
              step="any"
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
