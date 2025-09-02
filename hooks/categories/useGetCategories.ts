import { db } from "@/firebase";
import { collection, query, getDocs, setDoc, doc } from "firebase/firestore";
import { useState } from "react";

export interface ICategoryProps {
  title: {
    en: string;
    ar: string;
    tr: string;
  };
  id: string;
  image: string;
  proLength: number;
  products: number[];
}

const useGetAllCategories = () => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<ICategoryProps[]>([]);
  const [message, setMessage] = useState({
    message: "",
    status: "",
  });
  const categoriesPicker: any = [];

  const getCategories = async () => {
    try {
      setLoading(true);
      const q = query(
        collection(
          db,
          window.localStorage.getItem("store") === "gaziantep"
            ? "gaziantep"
            : "categories"
        )
      );

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        categoriesPicker.push({
          ...doc.data(),
          id: doc.id,
        });
      });
      setCategories(categoriesPicker);
      setLoading(false);
    } catch (err: any) {
      setMessage({
        message: err.message,
        status: "error",
      });
      setLoading(false);
    }
  };

  const deleteCategory = (name: string) => {
    setCategories(categories.filter((cat) => cat.id !== name));
  };

  return {
    getCategories,
    loading,
    setMessage,
    message,
    categories,
    deleteCategory,
    setCategories,
  };
};

export default useGetAllCategories;
