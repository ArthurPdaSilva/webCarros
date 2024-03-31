import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa6";
import { useNavigate, useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Container from "../../components/Container";
import { db } from "../../services/firebaseConnection";
import { CarProps } from "../../types";

export interface CarDetailProps extends CarProps {
  description: string;
  whatsapp: string;
  created: string;
  owner: string;
  model: string;
}

function CarDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState<CarDetailProps>();
  const [sliderPerView, setSliderPerView] = useState<number>(2);

  useEffect(() => {
    async function loadCar() {
      if (!id) return;
      const docRef = doc(db, "cars", id);
      getDoc(docRef)
        .then((doc) => {
          if (!doc.exists()) {
            navigate("/");
          } else if (doc.exists()) {
            const {
              name,
              price,
              year,
              km,
              city,
              images,
              description,
              whatsapp,
              owner,
              model,
              created,
            } = doc.data();

            setCar({
              id: doc.id,
              uid: doc.id,
              name,
              price,
              year,
              km,
              city,
              model,
              description,
              owner,
              created,
              whatsapp,
              images,
            });
          }
        })
        .catch((error) => {
          console.log("Falha ao carregar o elemento", error);
        });
    }

    loadCar();
  }, [id, navigate]);

  useEffect(() => {
    function handleResize() {
      const width = window.innerWidth;
      if (width < 720) setSliderPerView(1);
      else setSliderPerView(2);
      return;
    }

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Container>
      {car && (
        <>
          <Swiper
            modules={[Navigation, Pagination]}
            slidesPerView={sliderPerView}
            pagination={{ clickable: true }}
            navigation
          >
            {car?.images.map((image) => (
              <SwiperSlide key={image.uid}>
                <img
                  src={image.url}
                  alt={car?.name}
                  className="w-full h-96 object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
          <main className="w-full bg-white rounded-lg  p-6 my-4">
            <div className="flex flex-col sm:flex-row mb-4 items-center justify-between">
              <h1 className="font-bold text-3xl text-black">{car.name}</h1>
              <p className="font-bold text-3xl text-black">R$ {car.price}</p>
            </div>
            <p>{car.model}</p>
            <div className="flex w-full gap-4 my-4">
              <div className="flex flex-col gap-4">
                <div>
                  <p>Cidade</p>
                  <strong>{car.city}</strong>
                </div>
                <div>
                  <p>Ano</p>
                  <strong>{car.year}</strong>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div>
                  <p>KM</p>
                  <strong>{car.km}</strong>
                </div>
              </div>
            </div>
            <strong>Descrição:</strong>
            <p className="mb-4">{car.description}</p>
            <strong>Telefone / Whatsapp</strong>
            <a
              className="bg-green-500 w-full text-white flex items-center justify-center gap-2 my-6 h-11 text-xl rounded-lg font-medium cursor-pointer"
              href={`https://api.whatsapp.com/send?phone=${car.whatsapp}&text=Olá vi esse ${car.name} no site web carros e fiquei interessado!`}
              target="_blank"
            >
              Conversar com o vendedor
              <FaWhatsapp size={26} color="#fff" />
            </a>
          </main>
        </>
      )}
    </Container>
  );
}

export default CarDetail;
