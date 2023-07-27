import { Grid, Typography, InputLabel } from "@mui/material";

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
  updateLinkMataKuliah,
} from "src/store/apps/master/linkMataKuliah";

import ListData from "src/views/apps/ListData";
import CardActionCollapse from "src/views/ui/cards/actions/CardActionCollapse";

import { fetchData as fetchDataMataKuliah } from "src/store/apps/master/mataKuliah";
import { useDebouncedCallback } from "use-debounce";

import { DrawColumn, DrawFilter, handleOnChangeRange } from "src/utils/field";
import _ from "lodash";
import { Modules } from "src/utils/token";

const FilterData = ({ storeName }) => {
  const dispatch = useDispatch();

  const [dates, setDates] = useState([]);
  const [startDateRange, setStartDateRange] = useState(null);
  const [endDateRange, setEndDateRange] = useState(null);

  const [datesModified, setDatesModified] = useState([]);
  const [startDateRangeModified, setStartDateRangeModified] = useState(null);
  const [endDateRangeModified, setEndDateRangeModified] = useState(null);

  useEffect(() => {
    dispatch(fetchDataMataKuliah());
  }, [dispatch]);

  const defaultParam = {
    is_active: true,
    is_paging: false,
  };

  const handleFilterAutoComplete = (name) => (event, newValue) => {
    const value = newValue ? newValue.id : null;
    dispatch(handleParams({ name, value }));
  };

  const debounced = useDebouncedCallback(
    (event) => {
      const { value, name } = event.target;
      dispatch(handleParams({ name, value }));
    },
    1000,
    { maxWait: 10000 }
  );

  const { data: dataMataKuliah, loading: loadingMataKuliah } = useSelector(
    (state) => state.mataKuliah
  );

  const fields = [
    {
      name: "mata_kuliah",
      type: "autocomplete",
      onChange: handleFilterAutoComplete("mata_kuliah_id"),
      label: "Mata Kuliah",
      optLabel: "kode_mk",
      optLabel2: "mata_kuliah",
      data: _.sortBy(dataMataKuliah, ["mata_kuliah"]),
      xs: 12,
      md: 4,
    },
    {
      name: "link",
      type: "autocomplete",
      onChange: handleFilterAutoComplete("mapping_id"),
      label: "Link To",
      optLabel: "kode_mk",
      optLabel2: "mata_kuliah",
      data: _.sortBy(dataMataKuliah, ["mata_kuliah"]),
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
      link: "/apps/master/link-mata-kuliah/edit/",
      value: (value) => value.id,
      valueLink: (value) => value.id,
    },
    {
      name: "mata_kuliah",
      minWidth: 350,
      headerName: "Mata Kuliah",
      type: "link",
      link: "/apps/master/link-mata-kuliah/edit/",
      value: (value) =>
        value.mataKuliah
          ? value.mataKuliah.kode_mk + " - " + value.mataKuliah.mata_kuliah
          : "-",
      valueLink: (value) => value.id,
    },
    {
      name: "link",
      minWidth: 350,
      headerName: "Link To",
      link: "/apps/master/link-mata-kuliah/edit/",
      value: (value) =>
        value.mapping
          ? value.mapping.kode_mk + " - " + value.mapping.mata_kuliah
          : "-",
    },
  ];

  const defaultColumns = fields.map((field) => DrawColumn(field));

  const dataBreadcrumbs = [
    { name: <Translations text={"Master"} /> },
    { name: "Link Mata Kuliah" },
  ];

  return (
    <ListData
      defaultColumns={defaultColumns}
      nameLabel={`${t("Link Mata Kuliah")}`}
      storeName={"linkMataKuliah"}
      updateData={updateLinkMataKuliah}
      urlData={"/apps/master/link-mata-kuliah/"}
      getData={fetchData}
      clearResponse={clearResponse}
      filterData={<FilterData storeName={"linkMataKuliah"} />}
      dataBreadcrumbs={dataBreadcrumbs}
      clearParams={removeParams}
      checkboxSelection={true}
      moduleName={Modules.LINK_MATA_KULIAH}
    />
  );
}

export default Index;
