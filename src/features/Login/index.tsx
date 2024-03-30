import { zodResolver } from "@hookform/resolvers/zod";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import logoImg from "../../assets/logo.svg";
import Input from "../../components/Input";
import { auth } from "../../services/firebaseConnection";
import { FormData, schema } from "./schema";

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  function onSubmit(data: FormData) {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(() => {
        console.log("Usuário logado com sucesso!");
        navigate("/dashboard", { replace: true });
      })
      .catch((error) => {
        console.error("Erro ao fazer login", error);
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
          Acessar
        </button>
      </form>

      <Link to="/register">Ainda não possui uma conta? Cadastre-se</Link>
    </div>
  );
}

export default Login;
