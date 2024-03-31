import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from "firebase/storage";
import { ChangeEvent } from "react";
import { FiTrash, FiUpload } from "react-icons/fi";
import { v4 as uuidV4 } from "uuid";
import useAuth from "../../../../hooks/useAuth";
import { storage } from "../../../../services/firebaseConnection";
import { ImageItemProps } from "../types";

interface FileInputProps {
  images: ImageItemProps[];
  setImages: (images: ImageItemProps[]) => void;
}

function FileInput({ images, setImages }: FileInputProps) {
  const { user } = useAuth();

  async function handleFile(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.files) {
      const image = event.target.files[0];

      if (image.type !== "image/jpeg" && image.type !== "image/png") {
        alert("Envie uma imagem no formato PNG ou JPEG");
        return;
      }
      await handleUpload(image);
    }
  }

  async function handleUpload(image: File) {
    if (!user?.uid) return;
    const currentUid = user.uid;
    const uidIamge = uuidV4();
    const uploadRef = ref(storage, `images/${currentUid}/${uidIamge}`);
    uploadBytes(uploadRef, image).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        const imageItem: ImageItemProps = {
          uid: uidIamge,
          name: image.name,
          url,
          previewUrl: URL.createObjectURL(image),
        };
        setImages([...images, imageItem]);
      });
    });
  }

  async function handleDeleteImage(image: ImageItemProps) {
    const imagePath = `images/${user?.uid}/${image.uid}`;
    const imageRef = ref(storage, imagePath);
    try {
      await deleteObject(imageRef);
      const newImages = images.filter((img) => img.uid !== image.uid);
      setImages(newImages);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <button className="border-2 w-48 rounded-lg flex items-center justify-center cursor-pointer border-gray-600 h-32 md:w-48">
        <div className="absolute cursor-pointer ">
          <FiUpload size={30} color="#000" />
        </div>
        <div className="cursor-pointer">
          <input
            type="file"
            accept="image/*"
            className="opacity-0 cursor-pointer"
            onChange={handleFile}
          />
        </div>
      </button>
      {images &&
        images.map((image: ImageItemProps) => (
          <div
            key={image.uid}
            className="w-full h-32 flex items-center justify-center relative"
          >
            <button
              className="absolute"
              onClick={() => handleDeleteImage(image)}
            >
              <FiTrash size={28} color="#fff" />
            </button>
            <img
              src={image.previewUrl}
              alt={image.name}
              className="w-full h-32 object-cover rounded-lg"
            />
          </div>
        ))}
    </>
  );
}

export default FileInput;
