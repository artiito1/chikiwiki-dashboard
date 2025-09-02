import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Slide,
  Tabs,
  TextField,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { Dispatch, SetStateAction, useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import DialogUploadImage from "./dialog-upload-image";
import DialogPickImage from "./dialog-upload-image";
import useEditProduct from "@/hooks/products/useEditProduct";
import SnackBar from "@/utils/snack-bar";
import TabsWrappedLabel from "@/utils/tabs";

const DisplayingErrorMessagesSchema = Yup.object().shape({
  title: Yup.object({
    en: Yup.string().required("English title is required").min(3).max(40),
    ar: Yup.string().required("Arabic title is required").min(3).max(40),
    tr: Yup.string().required("Turkish title is required").min(3).max(40),
  }),
  price: Yup.object({
    kaya: Yup.number(),
    all: Yup.number(),
  }),
  category: Yup.string().required("title is required"),
});

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function EditProductDialog({
  open,
  setOpen,
  prod,
  products,
  item,
  id,
  setProducts,
  prodIndex,
  itemIndex,
  setRowItem,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  prod: {
    title: string;
    price: string;
    image: string;
    category: string;
  };
  id: string;
  item: any;
  products: any;
  setProducts: any;
  itemIndex: number;
  setRowItem: any;
  prodIndex: number;
}) {
  const { t } = useTranslation();
  const [selectedLan, setSelectedLan] = useState<any>("en");
  const { editProduct, loading, message, setMessage } = useEditProduct();
  const [selectedStore, setSelectedStore] = useState(
    typeof window !== "undefined"
      ? window.localStorage.getItem("store") || "all"
      : ""
  );
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const categories = [];

  return (
    <div>
      {" "}
      <SnackBar message={message} setErrorMessage={setMessage} />
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          maxWidth="sm"
          fullWidth
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description">
          <DialogTitle>{"Edit Product"}</DialogTitle>
          <Formik
            initialValues={{
              title: prod.title,
              price: prod.price,
              image: prod.image,
              category: item.title.en,
            }}
            onSubmit={async (values, { resetForm }) => {
              try {
                const { imageData } = await editProduct({
                  title: values.title,
                  price: values.price,
                  image: values.image,
                  category: item.id,
                  oldImage: prod.image,
                  id,
                });
                setRowItem({
                  title: values.title,
                  price: values.price,
                  image: imageData,
                  category: values.category,
                });
                setOpen(false);
              } catch {}
            }}
            validationSchema={DisplayingErrorMessagesSchema}>
            {({
              values,
              handleChange,
              errors,
              handleSubmit,
              touched,
              setFieldValue,
            }: any) => (
              <div>
                <DialogContent className="flex gap-3 flex-col">
                  <TabsWrappedLabel
                    selectedLan={selectedLan}
                    setSelectedLan={setSelectedLan}
                  />
                  <TextField
                    fullWidth
                    placeholder="Title"
                    InputLabelProps={{
                      style: { color: "black" },
                    }}
                    inputProps={{ style: { color: "black" } }}
                    onChange={handleChange}
                    name={`title.${selectedLan}`}
                    disabled={loading}
                    value={values.title[selectedLan]}
                    helperText={
                      touched.title && touched.title
                        ? errors.title && "enter all languages titles"
                        : ""
                    }
                    error={
                      touched.title && touched?.title[selectedLan]
                        ? Boolean(errors.title && errors.title[selectedLan])
                        : false
                    }
                  />
                  <TextField
                    fullWidth
                    placeholder="Description"
                    InputLabelProps={{
                      style: { color: "black" },
                    }}
                    disabled={loading}
                    inputProps={{ style: { color: "black" } }}
                    onChange={handleChange}
                    name={`price.${selectedStore}`}
                    value={values.price[selectedStore as any]}
                    // helperText={
                    //   touched.price[selectedStore] &&
                    //   touched.price[selectedStore]
                    //     ? errors.price[selectedStore] && "enter price"
                    //     : ""
                    // }
                    // error={
                    //   touched.price[selectedStore] &&
                    //   touched?.price[selectedStore]
                    //     ? Boolean(errors.price && errors.price[selectedStore])
                    //     : false
                    // }
                  />
                  <DialogPickImage
                    setFieldValue={setFieldValue}
                    image={values.image}
                  />
                  <DialogActions>
                    <Button onClick={handleClose} disabled={loading}>
                      {t("CANCEL")}
                    </Button>
                    <Button onClick={() => handleSubmit()} disabled={loading}>
                      {!loading ? t("UPDATE") : <CircularProgress />}
                    </Button>
                  </DialogActions>
                </DialogContent>
              </div>
            )}
          </Formik>
        </Dialog>
      </div>
    </div>
  );
}

export default EditProductDialog;
