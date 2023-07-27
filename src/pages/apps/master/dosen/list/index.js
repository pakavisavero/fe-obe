import {
  Autocomplete,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";

import { useEffect, useState, forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import Translations from "src/layouts/components/Translations";

import {
  clearResponse,
  fetchData,
  handleParams,
  removeParams,
  updateDosen,
} from "src/store/apps/master/dosen";

import { fetchData as fetchDataProdi } from "src/store/apps/master/prodi";

import ListData from "src/views/apps/ListData";
import CardActionCollapse from "src/views/ui/cards/actions/CardActionCollapse";

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
      name: "nip",
      type: "text",
      onChange: debounced,
      label: "NIP",
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
      link: "/apps/master/dosen/edit/",
      value: (value) => value.id,
      valueLink: (value) => value.id,
    },
    {
      name: "nip",
      minWidth: 200,
      headerName: "NIP",
      type: "link",
      link: "/apps/master/dosen/edit/",
      value: (value) => (value.nip ? value.nip : "-"),
      valueLink: (value) => value.id,
    },
    {
      name: "full_name",
      minWidth: 200,
      headerName: "Nama Lengkap",
      value: (value) => value.full_name,
    },
    {
      name: "prodi",
      minWidth: 200,
      headerName: "Program Studi",
      value: (value) => value.prodi.prodi,
    },
  ];

  const defaultColumns = fields.map((field) => DrawColumn(field));

  const dataBreadcrumbs = [
    { name: <Translations text={"Master"} /> },
    { name: "Dosen" },
  ];

  return (
    <ListData
      defaultColumns={defaultColumns}
      nameLabel={`${t("Dosen")}`}
      storeName={"dosen"}
      updateData={updateDosen}
      urlData={"/apps/master/dosen/"}
      getData={fetchData}
      clearResponse={clearResponse}
      filterData={<FilterData storeName={"dosen"} />}
      dataBreadcrumbs={dataBreadcrumbs}
      clearParams={removeParams}
      checkboxSelection={true}
      exportName={"dosen"}
      isExport
      isCreate={false}
      moduleName={Modules.DOSEN}
    />
  );
}

export default Index;
