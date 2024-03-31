import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../../services/firebaseConnection";

interface CarImageProps {
  uid: string;
  url: string;
  name: string;
}

interface CarProps {
  id: string;
  uid: string;
  name: string;
  price: number;
  year: string;
  km: number;
  city: string;
  images: CarImageProps[];
}

function Home() {
  const [cars, setCars] = useState<CarProps[]>([]);
  const [loadImages, setLoadImages] = useState<string[]>([]);

  useEffect(() => {
    function loadCars() {
      const carsRef = collection(db, "cars");
      const queryRef = query(carsRef, orderBy("created", "desc"));

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
  }, [cars]);

  function handleImageLoad(id: string) {
    setLoadImages([...loadImages, id]);
  }

  return (
    <>
      <section className="bg-white p-4 rounded-lg w-full max-w-3xl mx-auto flex justify-center items-center gap-2">
        <input
          className="w-full border-2 rounded-lg h-9 px-3 outline-none"
          type="text"
          placeholder="Digite o nome do carro"
        />
        <button className="bg-red-500 h-9 px-8 rounded-lg text-white font-medium text-lg">
          Buscar
        </button>
      </section>
      <h1 className="font-bold text-center mt-6 text-2xl mb-4">
        Carros novos e usados em todo o Brasil
      </h1>
      <main className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cars.map((car) => (
          <Link key={car.id} to={`/car/${car.id}`}>
            <section key={car.id} className="w-full bg-white rounded-lg ">
              <div
                className="w-full h-72 rounded-lg bg-slate-200 "
                style={{
                  display: loadImages.includes(car.id) ? "none" : "block",
                }}
              ></div>
              <img
                className="w-full rounded-lg mb-2 max-h-72 hover:scale-105 transition-all "
                alt={car.images[0].name}
                src={car.images[0].url}
                onLoad={() => handleImageLoad(car.id)}
                style={{
                  display: loadImages.includes(car.id) ? "block" : "none",
                }}
              />
              <p className="font-bold mt-1 mb-2 px-2">{car.name}</p>
              <div className="flex flex-col px-2">
                <span className="text-zinc-700 mb-6 ">
                  Ano {car.year} | {car.km} km
                </span>
                <strong className="text-black font-medium text-xl">
                  R$ {car.price}
                </strong>
              </div>
              <div className="w-full h-px bg-slate-200 my-2"></div>
              <div className="px-2 pb-2">
                <span className="text-zinc-700">{car.city}</span>
              </div>
            </section>
          </Link>
        ))}
      </main>
    </>
  );
}

export default Home;
