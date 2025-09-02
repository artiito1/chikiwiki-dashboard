import { db } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { v4 as uuidv4 } from "uuid";
import useUploadImage from "../useUploadImage";
import { toast } from "react-toastify";

interface IAddProductsProps {
  title: {
    ar: string;
    en: string;
    tr: string;
  };
  category: string;
  price: {
    kaya: number;
    all: number;
  };
  image: any;
}

const useAddProduct = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    message: "",
    status: "",
  });

  const { uploadFile } = useUploadImage();

  const addProducts = async ({
    title,
    price,
    image,
    category,
  }: IAddProductsProps) => {
    try {
      setLoading(true);
      const docRef = doc(
        db,
        window.localStorage.getItem("store") === "gaziantep"
          ? "gaziantep"
          : "categories",
        category
      );
      const docSnap: any = await getDoc(docRef);
      let imageData = "";

      if (image) {
        const imageUrl = await uploadFile({ file: image });
        imageData = imageUrl.image;
      }
      const productRef = doc(
        db,
        window.localStorage.getItem("store") === "gaziantep"
          ? "gaziantep"
          : "categories",
        category
      );
      await updateDoc(productRef, {
        products: [
          ...docSnap?.data().products,
          {
            title,
            price,
            id: uuidv4(),
            image: imageData,
          },
        ],
      });
      setLoading(false);
      setMessage({
        message: "Product added successfully",
        status: "success",
      });
      toast("product added successfully");
    } catch (err: any) {
      setMessage({
        message: err.message,
        status: "error",
      });
      setMessage({
        message: "Something went wrong",
        status: "error",
      });
      toast("there is a problem pleas contact us");
      setLoading(false);
    }
  };

  return {
    addProducts,
    loading,
    setMessage,
    message,
  };
};

export default useAddProduct;
