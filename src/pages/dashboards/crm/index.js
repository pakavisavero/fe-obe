// ** MUI Imports
import Grid from "@mui/material/Grid";

// ** Icons Imports
import BriefcaseVariantOutline from "mdi-material-ui/BriefcaseVariantOutline";

// ** Custom Components Imports
import CardStatisticsCharacter from "src/@core/components/card-statistics/card-stats-with-image";
import CardStatisticsVerticalComponent from "src/@core/components/card-statistics/card-stats-vertical";

// ** Styled Component Import
import ApexChartWrapper from "src/@core/styles/libs/react-apexcharts";

import { useEffect, useState, forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "src/store/dashboard";
import themeConfig from "src/configs/themeConfig";

const CRMDashboard = () => {
  const dispatch = useDispatch();
  const { data: dashboard, loading } = useSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);

  const dataDashboard = [
    {
      id: 1,
      stats: dashboard.jml_mahasiswa,
      trend: "negative",
      title: "Total Mahasiswa",
      trendNumber: "-22%",
      chipText: "Last Week",
      chipColor: "secondary",
      src: "/images/cards/pose_m1.png",
    },
    {
      id: 2,
      stats: dashboard.jml_matkul,
      trend: "negative",
      title: "Total Mata Kuliah",
      trendNumber: "-22%",
      chipText: "Last Week",
      chipColor: "secondary",
      src: "/images/cards/pose_m18.png",
    },
    {
      id: 3,
      stats: dashboard.jml_prodi,
      trend: "negative",
      title: "Total Program Studi",
      trendNumber: "-22%",
      chipText: "Last Week",
      chipColor: "secondary",
      src: "/images/cards/pose_f9.png",
    },
  ];

  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        {dataDashboard.map((dt) => {
          return (
            <Grid
              key={dt.id}
              item
              xs={12}
              sm={6}
              md={4}
              sx={{ pt: (theme) => `${theme.spacing(12.25)} !important` }}
            >
              <CardStatisticsCharacter data={dt} />
            </Grid>
          );
        })}
      </Grid>
    </ApexChartWrapper>
  );
};

export default CRMDashboard;
