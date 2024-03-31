import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { deleteObject, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi";
import Divider from "../../components/Divider";
import useAuth from "../../hooks/useAuth";
import { db, storage } from "../../services/firebaseConnection";
import { CarProps } from "../../types";

function Dashboard() {
  const { user } = useAuth();
  const [cars, setCars] = useState<CarProps[]>([]);

  useEffect(() => {
    function loadCars() {
      if (!user) return;
      const carsRef = collection(db, "cars");
      const queryRef = query(carsRef, where("uid", "==", user.uid));

      getDocs(queryRef).then((snapshot) => {
        const carsList: CarProps[] = [];
        snapshot.forEach((doc) => {
          const { name, price, year, km, city, images } = doc.data();

          carsList.push({
            id: doc.id,
            uid: doc.id,
            name,
            price,
            year,
            km,
            city,
            images,
          });
        });

        setCars(carsList);
      });
    }

    loadCars();
  }, [user]);

  async function handleDeleteCar(car: CarProps) {
    if (!user) return;
    const docRef = doc(db, "cars", car.id);
    await deleteDoc(docRef);
    car.images.map(async (image) => {
      const imagePath = `images/${user.uid}/${image.uid}`;
      const imageRef = ref(storage, imagePath);
      try {
        await deleteObject(imageRef);
      } catch (error) {
        console.error("Erro ao deletar imagem", error);
      }
    });

    setCars(cars.filter((cars) => cars.id !== car.id));
  }

  return (
    <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {cars.map((car) => (
        <section className="w-full bg-white rounded-lg relative">
          <button
            className="absolute bg-white w-12 h-12 rounded-full flex items-center justify-center right-2 top-2"
            onClick={() => handleDeleteCar(car)}
          >
            <FiTrash size={26} color="#000" />
          </button>
          <img
            src={car.images[0].url}
            alt={car.images[0].name}
            className="w-full rounded-lg mb-2 max-h-70"
          />
          <p className="font-bold mt-1 px-2 mb-2">{car.name}</p>
          <div className="flex flex-col px-2">
            <span className="text-zinc-700">
              Ano {car.year} | {car.km} km
            </span>
            <strong className="text-black font-bold mt-4">
              R$ {car.price}
            </strong>
          </div>

          <Divider />
          <div className="px-2 pb-2">
            <span className="text-zinc-700">{car.city}</span>
          </div>
        </section>
      ))}
    </main>
  );
}

export default Dashboard;
