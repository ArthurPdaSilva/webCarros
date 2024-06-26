import { signOut } from "firebase/auth";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { auth } from "../../../../services/firebaseConnection";

function PanelHeader() {
  async function handleLogout() {
    await signOut(auth);
    toast.success("Deslogado com sucesso");
  }

  return (
    <div className="w-full items-center flex h-10 bg-red-500 rounded-lg text-white font-medium gap-4 px-4 mb-4">
      <Link to="/dashboard">Dashboard</Link>
      <Link to="/dashboard/new">Cadastrar Carro</Link>
      <button className="ml-auto" onClick={handleLogout}>
        Sair da conta
      </button>
    </div>
  );
}

export default PanelHeader;
