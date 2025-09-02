import TabsWrappedLabel from "@/utils/tabs";
import {
  Card,
  CardActions,
  CardContent,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

interface IFormikProps {
  handleChange: any;
  errors: any;
  touched: any;
  values: any;
  loading: boolean;
}

function BasicDetails(props: IFormikProps) {
  const { t } = useTranslation();
  const { errors, handleChange, touched, values, loading } = props;
  const [selectedLan, setSelectedLan] = useState("en");
  const [selectedStore, setSelectedStore] = useState(
    typeof window !== "undefined"
      ? window.localStorage.getItem("store") || "all"
      : ""
  );

  return (
    <Card sx={{ background: "white", marginTop: 5 }}>
      <TabsWrappedLabel
        setSelectedLan={setSelectedLan}
        selectedLan={selectedLan}
      />
      <CardContent>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={4}>
            <div className=" font-bold mt-3 text-[#333]">
              {t("BASIC_DETAILS")}
            </div>
          </Grid>
          <Grid item xs={12} sm={8}>
            <Typography variant="subtitle2" color="#333" className="mb-2">
              {t("TITLE")}
            </Typography>
            <TextField
              fullWidth
              placeholder="Title"
              InputLabelProps={{
                style: { color: "black" },
              }}
              disabled={loading}
              inputProps={{ style: { color: "black" } }}
              onChange={handleChange}
              name={`title.${selectedLan}`}
              value={values.title[selectedLan]}
              helperText={
                touched.title && touched.title
                  ? errors.title && "enter all languages titles"
                  : ""
              }
              error={
                touched.title && touched.title[selectedLan]
                  ? Boolean(errors.title && errors.title[selectedLan])
                  : false
              }
            />
            <div className="mt-4">
              <Typography variant="subtitle2" color="#333" className="mb-2">
                {t("PRICE")}
              </Typography>
              <TextField
                fullWidth
                placeholder="price"
                InputLabelProps={{
                  style: { color: "black" },
                }}
                disabled={loading}
                value={values.price[selectedStore]}
                inputProps={{ style: { color: "black" } }}
                rows={4}
                multiline
                onChange={handleChange}
                name={`price.${selectedStore}`}
                helperText={
                  touched.title && touched.title
                    ? errors.title && "enter  a price"
                    : ""
                }
                error={
                  touched.price && touched.price[selectedLan]
                    ? Boolean(
                        errors.price[selectedStore] &&
                          errors.price[selectedStore]
                      )
                    : false
                }
              />
            </div>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
}

export default BasicDetails;
