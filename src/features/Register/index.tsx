import { zodResolver } from "@hookform/resolvers/zod";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../assets/logo.svg";
import Input from "../../components/Input";
import useAuth from "../../hooks/useAuth";
import { auth } from "../../services/firebaseConnection";
import { FormData, schema } from "./schema";

function Register() {
  const { handleInfoUser } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  async function onSubmit(data: FormData) {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(async (userData) => {
        await updateProfile(userData.user, {
          displayName: data.name,
        });

        handleInfoUser({
          uid: userData.user.uid,
          name: data.name,
          email: data.email,
        });

        console.log("Usuário criado com sucesso!", userData);
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        console.error("Erro ao criar usuário", error);
      });
  }

  return (
    <div className="w-full min-h-screen flex justify-center items-center flex-col gap-4">
      <Link to="/" className="mb-6 max-w-sm w-full">
        <img src={logoImg} className="w-full" alt="Logo" />
      </Link>
      <form
        className="bg-white max-w-xl w-full rounded-lg p-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-3">
          <Input
            name="name"
            placeholder="Digite seu nome completo"
            type="text"
            register={register}
            error={errors.name?.message}
          />
        </div>

        <div className="mb-3">
          <Input
            name="email"
            placeholder="Digite seu e-mail"
            type="email"
            register={register}
            error={errors.email?.message}
          />
        </div>

        <div className="mb-3">
          <Input
            name="password"
            placeholder="Digite sua senha"
            type="password"
            register={register}
            error={errors.password?.message}
          />
        </div>

        <button
          type="submit"
          className="bg-zinc-900 w-full rounded-md text-white h-10 font-medium"
        >
          Cadastrar
        </button>
      </form>
      <Link to="/login">Já possui uma conta? Faça o login!</Link>
    </div>
  );
}

export default Register;
