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
  updateRoleMaster,
} from "src/store/apps/setting/roleMaster";

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

  const debounced = useDebouncedCallback(
    (event) => {
      const { value, name } = event.target;
      dispatch(handleParams({ name, value }));
    },
    1000,
    { maxWait: 10000 }
  );

  const fields = [
    {
      name: "role_name",
      type: "text",
      onChange: debounced,
      label: "Role Name",
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
      link: "/apps/setting/role-master/edit/",
      value: (value) => value.id,
      valueLink: (value) => value.id,
    },
    {
      name: "role_name",
      minWidth: 200,
      headerName: "Role Name",
      type: "link",
      link: "/apps/setting/role-master/edit/",
      value: (value) => (value.role_name ? value.role_name : "-"),
      valueLink: (value) => value.id,
    },
  ];

  const defaultColumns = fields.map((field) => DrawColumn(field));

  const dataBreadcrumbs = [
    { name: <Translations text={"Setting"} /> },
    { name: "Role Master" },
  ];

  return (
    <ListData
      defaultColumns={defaultColumns}
      nameLabel={`${t("Role Master")}`}
      storeName={"roleMaster"}
      updateData={updateRoleMaster}
      urlData={"/apps/master/role-master/"}
      getData={fetchData}
      clearResponse={clearResponse}
      filterData={<FilterData storeName={"roleMaster"} />}
      dataBreadcrumbs={dataBreadcrumbs}
      clearParams={removeParams}
      checkboxSelection={true}
      isCreate={false}
      moduleName={Modules.ROLE_MASTER}
    />
  );
}

export default Index;
