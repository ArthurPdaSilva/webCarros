export interface CarImageProps {
  uid: string;
  url: string;
  name: string;
}

export interface CarProps {
  id: string;
  uid: string;
  name: string;
  price: number;
  year: string;
  km: number;
  city: string;
  images: CarImageProps[];
  description?: string;
  whatsapp?: string;
  created?: string;
  owner?: string;
  model?: string;
}
