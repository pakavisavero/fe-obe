import {
  Box,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
  Button,
  Grid,
  Card,
} from "@mui/material";

import "react-datepicker/dist/react-datepicker.css";
import React, { useEffect, useState } from "react";

import GraphicReport from "../child/graphicRaport";

function RaportCpl({ control, store, watch, data, labels }) {
  const [cplMhs, setCplMhs] = useState([]);
  const [cplTotal, setCplTotal] = useState([]);
  const [cplMin, setCplMin] = useState([]);
  const [cplMax, setCplMax] = useState([]);
  const [colors, setColor] = useState([]);

  const [loading, setLoading] = useState(true);

  function getRandomColor() {
    var letters = "ABCDEF012".split("");
    var color = "#";
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }

    return color;
  }

  const generateColor = (color) => {
    let list_colors = [];
    for (const x of Array(color).keys()) {
      const col = getRandomColor();
      list_colors.push(col);
    }

    return list_colors;
  };

  useEffect(() => {
    for (let dt of data) {
      setCplMhs((prev) => [...prev, dt[0]]);
      setCplTotal((prev) => [...prev, dt[1]]);
      setCplMin((prev) => [...prev, dt[2]]);
      setCplMax((prev) => [...prev, dt[3]]);
    }
    setColor(generateColor(4));
    setLoading(false);
  }, []);

  return (
    !loading && (
      <Grid item xs={12} sx={{ mb: 15, height: 600 }}>
        <Card sx={{ height: 600, padding: 10 }}>
          <GraphicReport
            title={`Statistik CPL ${watch("nim")} - ${watch(
              "full_name"
            )}`.toUpperCase()}
            nilai={[cplMin, cplMhs, cplTotal, cplMax]}
            labels={labels}
            colors={colors}
            legends={["Minimum", "CPL Mahasiswa", "Rerata", "Maksimum"]}
          />
        </Card>
      </Grid>
    )
  );
}

export default RaportCpl;
