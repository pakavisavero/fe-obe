import {
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Divider,
  Box,
  Typography,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";

// ** Icons Imports
import ChevronDown from "mdi-material-ui/ChevronDown";
import PresentasePK from "../child/presentasePk";
import GraphicKelulusan from "../child/graphicKelulusan";

import { array } from "yup/lib/locale";
import { label } from "aws-amplify";

const StatistikTab = ({ watch, control, errors, isEdit }) => {
  const [loading, setLoading] = useState(true);

  const labelNilai = ["A", "B", "C", "D", "E"];
  const labelKet = ["Lulus", "Remidi CPMK", "Tidak Lulus"];
  const labelPk = ["Minimum", "Median", "Rata-Rata", "Maksimum"];
  const labelCpmk = [];

  var mahasiswa = watch("mahasiswa");
  var lulusCpmk = [];
  var remidiCpmk = [];

  const [persebaran, setPersebaran] = useState([]);
  const [valueLulusCPMK, setValueLulusCPMK] = useState([]);
  const [valueRemidiCPMK, setValueRemidiCPMK] = useState([]);
  const [valueLabelCPMK, setValueLabelCPMK] = useState([]);

  const mappingNilai = (nilai) =>
    mahasiswa.filter(
      (item) => item.raport.nilai_pokok.nilai_akhir_huruf === nilai
    );

  const mappingLulus = (ket) =>
    mahasiswa.filter((item) => item.raport.nilai_pokok.keterangan === ket);

  const getAllNilai = () =>
    mahasiswa.map((item) =>
      parseFloat(item.raport.nilai_pokok.nilai_akhir).toFixed(2)
    );

  const getMean = (arr) => {
    var total = 0;
    for (let i = 0; i < arr.length; i++) {
      var value = parseFloat(arr[i].replace(",", "."));
      total += value;
    }
    return (total / arr.length).toFixed(2);
  };

  const getMedian = (arr) => {
    const { length } = arr;
    arr = arr.map((item) => parseFloat(item));
    arr.sort((a, b) => a - b);
    if (length % 2 === 0) {
      return (arr[length / 2 - 1] + arr[length / 2]) / 2;
    }
    return arr[(length - 1) / 2].toFixed(2);
  };

  const nilaiMin = Math.min(...getAllNilai());
  const nilaiMax = Math.max(...getAllNilai());
  const nilaiRerata = getMean(getAllNilai());
  const nilaiMedian = getMedian(getAllNilai());

  const addCPMK = (listCPMK, name) => {
    let existCPMK = false;
    listCPMK.filter((cp) => {
      if (cp.name == name) existCPMK = true;
    });
    if (!existCPMK) {
      listCPMK.push({ name: name, amount: 1 });
    } else {
      listCPMK.filter((cp) => {
        if (cp.name == name) {
          cp.amount += 1;
        }
      });
    }
  };

  function getCPMK() {
    mahasiswa.map((item) => {
      var cpmk = item.raport.cpmkMhs;
      for (const cp of cpmk) {
        var name = cp.cpmk.name;
        var value = parseFloat(cp.value).toFixed(2);

        if (!labelCpmk.includes(name)) labelCpmk.push(name);
        if (value < 60) {
          addCPMK(remidiCpmk, name);
        } else {
          addCPMK(lulusCpmk, name);
        }
      }
    });
  }

  const getPersebaranNilai = () => {
    var data = mahasiswa.map((item) => ({
      y: parseFloat(item.raport.nilai_pokok.nilai_uts).toFixed(2),
      x: parseFloat(item.raport.nilai_pokok.nilai_uas).toFixed(2),
    }));

    return [...new Set(data)];
  };

  const graphics = [
    <GraphicKelulusan
      title="Statistik Perkuliahan"
      type="bar"
      nilai={[nilaiMin, nilaiMedian, nilaiRerata, nilaiMax]}
      labels={labelPk}
      color={4}
    />,
    <GraphicKelulusan
      title="Nilai Mahasiswa"
      type="doughnut"
      nilai={labelNilai.map((lab) => mappingNilai(lab).length)}
      labels={labelNilai.map((lab) => "Nilai " + lab)}
      color={5}
    />,
    <GraphicKelulusan
      title="Statistik Kelulusan"
      type="pie"
      nilai={labelKet.map((lab) => mappingLulus(lab).length)}
      labels={labelKet}
      color={3}
    />,
    <GraphicKelulusan
      title="Statistik CPMK"
      type="bar-multiple"
      nilai={valueLulusCPMK}
      nilai2={valueRemidiCPMK}
      labels={valueLabelCPMK}
      colorBar={["#B7F0AF", "#EE7F94"]}
    />,
    <GraphicKelulusan
      title="Persebaran UTS & UAS"
      type="scatter"
      nilai={persebaran}
    />,
  ];

  useEffect(() => {
    getCPMK();
    setValueLulusCPMK(lulusCpmk.map((lulus) => lulus.amount));
    setValueRemidiCPMK(remidiCpmk.map((remidi) => remidi.amount));
    setValueLabelCPMK(labelCpmk);

    const scatter = getPersebaranNilai();
    setPersebaran(scatter);

    setLoading(false);
  }, []);

  return (
    !loading && (
      <>
        <CardContent sx={{ marginTop: "20px" }}>
          <PresentasePK data={watch("presentase")} />
        </CardContent>

        <Divider sx={{ marginBottom: "15px" }} />

        <Grid
          container
          spacing={2}
          sx={{ marginY: "30px", marginLeft: "10px" }}
        >
          {graphics.map((graph) => (
            <Grid item xs={4} sx={{ mb: 15, height: 380 }}>
              {graph}
            </Grid>
          ))}
        </Grid>
      </>
    )
  );
};

export default StatistikTab;
