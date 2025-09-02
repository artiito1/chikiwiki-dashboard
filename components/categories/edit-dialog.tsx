import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  Slide,
  TextField,
} from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React, { useState } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import SnackBar from "@/utils/snack-bar";
import DialogPickImage from "../products/dialog-upload-image";
import { ICategoryProps } from "@/hooks/categories/useGetCategories";
import TabsWrappedLabel from "@/utils/tabs";

const DisplayingErrorMessagesSchema = Yup.object().shape({
  title: Yup.string().required("title is required").min(3).max(40),
  desc: Yup.string().required("title is required").min(3).max(40),
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

function EditCategoryDialog({
  children,
  image,
  loading,
  onEdit,
  category,
}: {
  image: string;
  children: any;
  loading: boolean;
  onEdit: (
    cat: string,
    newImage: any,
    oldImage: string,
    title: { en: string; ar: string; tr: string }
  ) => void;
  category: ICategoryProps;
}) {
  const { t } = useTranslation();
  const [selectedLan, setSelectedLan] = useState<"en" | "tr" | "ar">("en");

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div onClick={() => handleClickOpen()}>{children}</div>
      <div>
        <Dialog
          open={open}
          TransitionComponent={Transition}
          maxWidth="sm"
          fullWidth
          keepMounted
          onClose={handleClose}
          aria-describedby="alert-dialog-slide-description">
          <DialogTitle>{"Edit Category"}</DialogTitle>
          <Formik
            initialValues={{
              image: image,
              title: {
                en: category.title.en,
                ar: category.title.ar,
                tr: category.title.tr,
              },
            }}
            onSubmit={async (values, { resetForm }) => {
              try {
                onEdit(category.id, values.image, image, values.title);
              } catch {}
            }}>
            {({
              values,
              handleSubmit,
              touched,
              setFieldValue,
              handleChange,
            }) => (
              <DialogContent className="flex gap-3 flex-col">
                <TabsWrappedLabel
                  selectedLan={selectedLan}
                  setSelectedLan={setSelectedLan}
                />
                <TextField
                  fullWidth
                  placeholder="Title"
                  sx={{
                    "& .MuiInputBase-root": {
                      color: "#333",
                    },
                  }}
                  onChange={handleChange}
                  type="text"
                  required
                  value={values.title[selectedLan]}
                  name={`title.${selectedLan}`}
                />
                <DialogPickImage
                  setFieldValue={setFieldValue}
                  image={values.image}
                />
                <DialogActions>
                  <Button onClick={handleClose} disabled={loading}>
                    {t("CANCEL")}
                  </Button>
                  <Button
                    type="submit"
                    disabled={loading}
                    onClick={() => handleSubmit()}>
                    {!loading ? t("UPDATE") : <CircularProgress />}
                  </Button>
                </DialogActions>
              </DialogContent>
            )}
          </Formik>
        </Dialog>
      </div>
    </div>
  );
}

export default EditCategoryDialog;
