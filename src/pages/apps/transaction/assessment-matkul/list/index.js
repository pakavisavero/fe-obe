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
  Stack,
  Box,
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
  updateAssessmentMatkul,
} from "src/store/apps/transaction/assessmentMatkul";

import ListData from "src/views/apps/ListData";
import CardActionCollapse from "src/views/ui/cards/actions/CardActionCollapse";
import { useDebounce } from "use-debounce";

import DatePickerWrapper from "src/@core/styles/libs/react-datepicker";
import DatePicker from "react-datepicker";
import format from "date-fns/format";
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

  useEffect(() => {}, [dispatch]);

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
      name: "name",
      type: "text",
      onChange: debounced,
      label: "Nama Assessment",
      xs: 12,
      md: 4,
    },
    // {
    //   name: "description",
    //   type: "text",
    //   onChange: debounced,
    //   label: "Description",
    //   xs: 12,
    //   md: 4,
    // },
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
  const fields = [
    {
      minWidth: 80,
      headerName: "Series",
      name: "id",
      type: "link",
      hide: true,
      link: "/apps/master/assessment-matkul/edit/",
      value: (value) => value.id,
      valueLink: (value) => value.id,
    },
    {
      name: "name",
      minWidth: 200,
      headerName: "Nama Assessment",
      type: "link",
      link: "/apps/transaction/assessment-matkul/edit/",
      value: (value) => (value.name ? value.name : "-"),
      valueLink: (value) => value.id,
    },
    // {
    //   name: "description",
    //   minWidth: 200,
    //   headerName: "Deskripsi",
    //   value: (value) => (value.description ? value.description : "-"),
    // },
  ];

  const defaultColumns = fields.map((field) => DrawColumn(field));

  const dataBreadcrumbs = [
    { name: <Translations text={"Transaction"} /> },
    { name: "Assessment Matkul" },
  ];

  return (
    <ListData
      defaultColumns={defaultColumns}
      nameLabel={"Assessment Matkul"}
      storeName={"assessmentMatkul"}
      updateData={updateAssessmentMatkul}
      urlData={"/apps/transaction/assessment-matkul/"}
      getData={fetchData}
      filterData={<FilterData storeName={"assessmentMatkul"} />}
      dataBreadcrumbs={dataBreadcrumbs}
      clearResponse={clearResponse}
      clearParams={removeParams}
      checkboxSelection={true}
      isExport
    />
  );
}

export default Index;
