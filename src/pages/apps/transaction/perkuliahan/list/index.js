import { Grid, Stack, Box } from "@mui/material";

import Link from "next/link";
import { useEffect, useState, forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Translations from "src/layouts/components/Translations";

import {
  clearResponse,
  fetchData,
  handleParams,
  removeParams,
  updatePerkuliahan,
  uploadPerkuliahan,
} from "src/store/apps/transaction/perkuliahan";

import { fetchDataOption as fetchDataProdi } from "src/store/apps/master/prodi";
import { fetchDataOption as fetchDataMataKuliah } from "src/store/apps/master/mataKuliah";
import { fetchDataOption as fetchDataDosen } from "src/store/apps/setting/user";
import { fetchDataOption as fetchDataTahunAjaran } from "src/store/apps/master/tahunAjaran";
import { fetchDataOption as fetchDataDocStatusPk } from "src/store/apps/master/docstatusPk";

import ListData from "src/views/apps/ListData";
import CardActionCollapse from "src/views/ui/cards/actions/CardActionCollapse";

import { useDebouncedCallback } from "use-debounce";

import {
  DrawColumn,
  DrawFilter,
  handleOnChangeRange,
  getColorPK,
} from "src/utils/field";
import _ from "lodash";

const FilterData = ({ storeName }) => {
  const store = useSelector((state) => state[storeName]);
  const { params } = store;

  const { data: dataProdi, loading: loadingProdi } = useSelector(
    (state) => state.prodi
  );
  const { data: dataDosen, loading: loadingDosen } = useSelector(
    (state) => state.user
  );
  const { data: dataMataKuliah, loading: loadingMataKuliah } = useSelector(
    (state) => state.mataKuliah
  );
  const { data: dataTahunAjaran, loading: loadingTahunAjaran } = useSelector(
    (state) => state.tahunAjaran
  );
  const { data: dataDocStatusPk, loading: loadingDocStatusPk } = useSelector(
    (state) => state.docstatusPk
  );

  const dispatch = useDispatch();

  const [dates, setDates] = useState([]);
  const [startDateRange, setStartDateRange] = useState(null);
  const [endDateRange, setEndDateRange] = useState(null);

  const [datesModified, setDatesModified] = useState([]);
  const [startDateRangeModified, setStartDateRangeModified] = useState(null);
  const [endDateRangeModified, setEndDateRangeModified] = useState(null);

  const defaultParam = {
    is_active: true,
    is_paging: false,
  };

  useEffect(() => {
    dispatch(fetchDataProdi({ is_active: true }));
    dispatch(fetchDataMataKuliah({ is_active: true }));
    dispatch(fetchDataDosen({ is_active: true }));
    dispatch(fetchDataTahunAjaran({ is_active: true }));
    dispatch(fetchDataDocStatusPk());
  }, [dispatch]);

  const debounced = useDebouncedCallback(
    (event) => {
      const { value, name } = event.target;
      dispatch(handleParams({ name, value }));
    },
    1000,
    { maxWait: 10000 }
  );

  const handleFilterAutoComplete = (name) => (event, newValue) => {
    const value = newValue ? newValue.id : null;
    dispatch(handleParams({ name, value }));
  };

  const SearchhandleFilterAutoComplete = (opt, func) => (e) => {
    var val = e.target.value;
    if (val.length > 0) {
      dispatch(
        func({
          ...defaultParam,
          [opt]: val,
        })
      );
    } else {
      dispatch(func({ ...defaultParam }));
    }
  };

  const fields = [
    {
      name: "doc_status_id",
      type: "autocomplete",
      onChange: handleFilterAutoComplete("doc_status_id"),
      label: "Next Step",
      optLabel: "status",
      data: _.sortBy(dataDocStatusPk, ["id"]),
      xs: 12,
      md: 4,
    },
    {
      name: "dosen_id",
      type: "autocomplete",
      changeSearch: SearchhandleFilterAutoComplete("dosen_id", fetchDataDosen),
      onChange: handleFilterAutoComplete("dosen_id"),
      label: "Dosen I",
      optLabel: "full_name",
      data: _.sortBy(dataDosen, ["full_name"]),
      xs: 12,
      md: 4,
    },
    {
      name: "dosen2_id",
      type: "autocomplete",
      changeSearch: SearchhandleFilterAutoComplete("full_name", fetchDataDosen),
      onChange: handleFilterAutoComplete("dosen2_id"),
      label: "Dosen II",
      optLabel: "full_name",
      data: _.sortBy(dataDosen, ["full_name"]),
      xs: 12,
      md: 4,
    },
    {
      name: "dosen3_id",
      type: "autocomplete",
      changeSearch: SearchhandleFilterAutoComplete("full_name", fetchDataDosen),
      onChange: handleFilterAutoComplete("dosen3_id"),
      label: "Dosen III",
      optLabel: "full_name",
      data: _.sortBy(dataDosen, ["full_name"]),
      xs: 12,
      md: 4,
    },
    {
      name: "pj_dosen_id",
      type: "autocomplete",
      changeSearch: SearchhandleFilterAutoComplete("full_name", fetchDataDosen),
      onChange: handleFilterAutoComplete("pj_dosen_id"),
      label: "PJ Dosen",
      optLabel: "full_name",
      data: _.sortBy(dataDosen, ["full_name"]),
      xs: 12,
      md: 4,
    },
    {
      name: "mata_kuliah_id",
      type: "autocomplete",
      changeSearch: SearchhandleFilterAutoComplete(
        "mata_kuliah",
        fetchDataMataKuliah
      ),
      onChange: handleFilterAutoComplete("mata_kuliah_id"),
      label: "Mata Kuliah",
      optLabel: "kode_mk",
      optLabel2: "mata_kuliah",
      data: _.sortBy(dataMataKuliah, ["mata_kuliah"]),
      xs: 12,
      md: 4,
    },
    {
      name: "kelas",
      type: "text",
      onChange: debounced,
      label: "Kelas",
      xs: 12,
      md: 4,
    },
    {
      name: "semester",
      type: "select",
      onChange: debounced,
      label: "Semester",
      xs: 12,
      md: 4,
      opt: [
        {
          value: "Gasal",
          label: "Gasal",
        },
        {
          value: "Genap",
          label: "Genap",
        },
      ],
    },
    {
      name: "tahun_ajaran_id",
      type: "autocomplete",
      changeSearch: SearchhandleFilterAutoComplete(
        "tahun_ajaran",
        fetchDataTahunAjaran
      ),
      onChange: handleFilterAutoComplete("tahun_ajaran_id"),
      label: "Tahun Ajaran",
      optLabel: "tahun_ajaran",
      data: _.sortBy(dataTahunAjaran, ["tahun_ajaran"]),
      xs: 12,
      md: 4,
    },
    {
      name: "prodi",
      type: "autocomplete",
      changeSearch: SearchhandleFilterAutoComplete("prodi_id", fetchDataProdi),
      onChange: handleFilterAutoComplete("prodi_id"),
      label: "Program Studi",
      optLabel: "prodi",
      data: _.sortBy(dataProdi, ["prodi"]),
      xs: 12,
      md: 4,
    },
    {
      name: "created_at",
      type: "date",
      label: "Date Created",
      xs: 12,
      md: 4,
      dates: dates,
      endDateRange: endDateRange,
      startDateRange: startDateRange,
      onChange: handleOnChangeRange(
        setStartDateRange,
        setEndDateRange,
        setDates,
        dispatch,
        handleParams,
        "created_at"
      ),
    },
    {
      name: "modified_at",
      type: "date",
      label: "Date Modified",
      xs: 12,
      md: 4,
      dates: datesModified,
      endDateRange: endDateRangeModified,
      startDateRange: startDateRangeModified,
      onChange: handleOnChangeRange(
        setStartDateRangeModified,
        setEndDateRangeModified,
        setDatesModified,
        dispatch,
        handleParams,
        "modified_at"
      ),
    },
  ];

  return (
    <CardActionCollapse title={<Translations text={"Filters"} />}>
      <Grid container spacing={2}>
        {fields.map((field, key) => DrawFilter(field, key))}
      </Grid>
    </CardActionCollapse>
  );
};

function Index() {
  const { t } = useTranslation();

  const fields = [
    {
      minWidth: 80,
      headerName: "Series",
      name: "id",
      type: "link",
      hide: true,
      link: "/apps/transaction/perkuliahan/edit/",
      value: (value) => value.id,
      valueLink: (value) => value.id,
    },
    {
      name: "mata_kuliah",
      minWidth: 250,
      headerName: "Mata Kuliah",
      type: "link",
      link: "/apps/transaction/perkuliahan/edit/",
      value: (value) =>
        value.mataKuliah.mata_kuliah ? value.mataKuliah.mata_kuliah : "-",
      valueLink: (value) => value.id,
    },
    {
      name: "docstatus",
      minWidth: 250,
      headerName: "Next Step",
      type: "custom",
      renderCell: ({ row }) => (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Box
            sx={{
              width: "15px",
              height: "15px",
              backgroundColor: getColorPK(row.docstatus.id),
              borderRadius: "50%",
            }}
          ></Box>
          <Box>{row.docstatus.status}</Box>
        </Stack>
      ),
    },
    {
      name: "dosen1_id",
      minWidth: 250,
      headerName: "Dosen I",
      value: (value) => (value.dosen1 ? value.dosen1.full_name : "-"),
    },
    {
      name: "dosen2_id",
      minWidth: 250,
      headerName: "Dosen II",
      value: (value) => (value.dosen2 ? value.dosen2.full_name : "-"),
    },
    {
      name: "dosen3_id",
      minWidth: 250,
      headerName: "Dosen III",
      value: (value) => (value.dosen3 ? value.dosen3.full_name : "-"),
    },
    {
      name: "pj_dosen_id",
      minWidth: 250,
      headerName: "PJ Dosen",
      value: (value) => (value.pjDosen ? value.pjDosen.full_name : "-"),
    },
    {
      name: "prodi",
      minWidth: 200,
      headerName: "Program Studi",
      value: (value) => (value.prodi ? value.prodi.prodi : "-"),
    },
    {
      name: "kelas",
      minWidth: 100,
      headerName: "Kelas",
      value: (value) => (value.kelas ? value.kelas : "-"),
    },
    {
      name: "semester",
      minWidth: 100,
      headerName: "Semester",
      value: (value) => (value.semester ? value.semester : "-"),
    },
    {
      name: "tahun_ajaran",
      minWidth: 100,
      headerName: "Tahun Ajaran",
      value: (value) =>
        value.tahunAjaran.tahun_ajaran ? value.tahunAjaran.tahun_ajaran : "-",
    },
  ];

  const defaultColumns = fields.map((field) => DrawColumn(field));

  const dataBreadcrumbs = [
    { name: <Translations text={"Transaction"} /> },
    { name: "Perkuliahan" },
  ];

  return (
    <ListData
      defaultColumns={defaultColumns}
      nameLabel={`${t("Perkuliahan")}`}
      storeName={"perkuliahan"}
      updateData={updatePerkuliahan}
      urlData={"/apps/transaction/perkuliahan/"}
      getData={fetchData}
      filterData={<FilterData storeName={"perkuliahan"} />}
      dataBreadcrumbs={dataBreadcrumbs}
      clearResponse={clearResponse}
      clearParams={removeParams}
      checkboxSelection={true}
      importFunction={uploadPerkuliahan}
      exportName={"kbm-aktif"}
      isImport
      isExport
      isDeactivate
    />
  );
}

export default Index;
