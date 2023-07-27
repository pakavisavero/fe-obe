import {
  Autocomplete,
  CircularProgress,
  FormControl,
  Grid,
  styled,
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

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
  updateMahasiswa,
} from "src/store/apps/master/mahasiswa";

import { fetchData as fetchDataProdi } from "src/store/apps/master/prodi";
import { fetchData as fetchDataStatusMhs } from "src/store/apps/master/statusMahasiswa";

import ListData from "src/views/apps/ListData";
import CardActionCollapse from "src/views/ui/cards/actions/CardActionCollapse";
import { useDebounce } from "use-debounce";

import DatePickerWrapper from "src/@core/styles/libs/react-datepicker";
import DatePicker from "react-datepicker";
import format from "date-fns/format";
import { useDebouncedCallback } from "use-debounce";

import { DrawColumn, DrawFilter, handleOnChangeRange } from "src/utils/field";
import _ from "lodash";
import { Modules } from "src/utils/token";

const FilterData = ({ storeName }) => {
  const store = useSelector((state) => state[storeName]);
  const { params } = store;

  const { data: dataProdi, loading: loadingProdi } = useSelector(
    (state) => state.prodi
  );
  const { data: dataStatusMhs, loading: loadingStatusMhs } = useSelector(
    (state) => state.statusMahasiswa
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
    dispatch(fetchDataStatusMhs({ is_active: true }));
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

  const SearchhandleFilterAutoCompleteProdi = (e) => {
    var val = e.target.value;
    if (val.length > 0) {
      dispatch(
        fetchDataProdi({
          ...defaultParam,
          prodi: val,
        })
      );
    } else {
      dispatch(fetchDataProdi({ ...defaultParam }));
    }
  };

  const fields = [
    {
      name: "nim",
      type: "text",
      onChange: debounced,
      label: "NIM",
      xs: 12,
      md: 4,
    },
    {
      name: "full_name",
      type: "text",
      onChange: debounced,
      label: "Nama Lengkap",
      xs: 12,
      md: 4,
    },
    {
      name: "prodi",
      type: "autocomplete",
      changeSearch: SearchhandleFilterAutoCompleteProdi,
      onChange: handleFilterAutoComplete("prodi_id"),
      label: "Program Studi",
      optLabel: "prodi",
      data: _.sortBy(dataProdi, ["prodi"]),
      xs: 12,
      md: 4,
    },
    {
      name: "status",
      type: "autocomplete",
      onChange: handleFilterAutoComplete("status_mhs_id"),
      label: "Status",
      optLabel: "status",
      data: _.sortBy(dataStatusMhs, ["status"]),
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
      link: "/apps/master/mahasiswa/edit/",
      value: (value) => value.id,
      valueLink: (value) => value.id,
    },
    {
      name: "nim",
      minWidth: 200,
      headerName: "NIM",
      type: "link",
      link: "/apps/master/mahasiswa/edit/",
      value: (value) => (value.nim ? value.nim : "-"),
      valueLink: (value) => value.id,
    },
    {
      name: "full_name",
      minWidth: 200,
      headerName: "Nama",
      value: (value) => value.full_name,
    },
    {
      name: "doswal",
      minWidth: 200,
      headerName: "Dosen Wali",
      value: (value) => (value.doswal ? value.doswal.full_name : "-"),
    },
    {
      name: "prodi",
      minWidth: 200,
      headerName: "Program Studi",
      value: (value) => (value.prodi ? value.prodi.prodi : "-"),
    },
    {
      name: "status",
      minWidth: 200,
      headerName: "Status",
      value: (value) => (value.status ? value.status.status : "-"),
    },
  ];

  const defaultColumns = fields.map((field) => DrawColumn(field));

  const dataBreadcrumbs = [
    { name: <Translations text={"Master"} /> },
    { name: "Mahasiswa" },
  ];

  return (
    <ListData
      defaultColumns={defaultColumns}
      nameLabel={`${t("Mahasiswa")}`}
      storeName={"mahasiswa"}
      updateData={updateMahasiswa}
      urlData={"/apps/master/mahasiswa/"}
      getData={fetchData}
      clearResponse={clearResponse}
      filterData={<FilterData storeName={"mahasiswa"} />}
      dataBreadcrumbs={dataBreadcrumbs}
      clearParams={removeParams}
      checkboxSelection={true}
      exportName={"mahasiswa"}
      isExport
      moduleName={Modules.MAHASISWA}
    />
  );
}

export default Index;
