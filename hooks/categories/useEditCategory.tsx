import { db } from "@/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useUploadImage from "../useUploadImage";
import { toast } from "react-toastify";

interface IAddProductsProps {
  category: string;
  image: any;
  oldImage: any;
  title: { en: string; ar: string; tr: string };
}

const useEditCategory = () => {
  const [loading, setLoading] = useState(false);

  const { uploadFile } = useUploadImage();

  const router = useRouter();
  const editProduct = async (props: IAddProductsProps) => {
    let imageData = "";
    const { image, category, oldImage, title } = props;
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

      if (image && image !== oldImage) {
        const imageUrl = await uploadFile({ file: image });
        imageData = imageUrl.image;
      } else {
        imageData = oldImage;
      }
      const productRef = doc(
        db,
        window.localStorage.getItem("store") === "gaziantep"
          ? "gaziantep"
          : "categories",
        category
      );

      await updateDoc(productRef, {
        image: imageData,
        title,
      });
      setLoading(false);

      toast("product edited successfully");
    } catch (err: any) {
      setLoading(false);
      toast("Something went wrong please contact us");
    }
    return {
      imageData,
    };
  };

  return {
    editProduct,
    loading,
  };
};

export default useEditCategory;
