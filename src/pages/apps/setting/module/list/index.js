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
  MenuItem
} from '@mui/material'

import Link from 'next/link'
import { useEffect, useState, forwardRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import Translations from 'src/layouts/components/Translations'

import {
  clearResponse,
  fetchData,
  handleParams,
  removeParams,
  updateModule
} from 'src/store/apps/setting/module'

import { fetchData as fetchDataModuleGroup } from 'src/store/apps/setting/moduleGroup'

import ListData from 'src/views/apps/ListData'
import CardActionCollapse from 'src/views/ui/cards/actions/CardActionCollapse'
import { useDebounce } from 'use-debounce'

import DatePickerWrapper from 'src/@core/styles/libs/react-datepicker'
import DatePicker from 'react-datepicker'
import format from 'date-fns/format'
import { useDebouncedCallback } from 'use-debounce'

import { DrawColumn, DrawFilter, handleOnChangeRange } from 'src/utils/field'
import _ from 'lodash'


const FilterData = ({ storeName }) => {
  const store = useSelector(state => state[storeName])
  const { params } = store;

  const { data: dataModuleGroup, loading: loadingModuleGroup } = useSelector(state => state.moduleGroup)

  const dispatch = useDispatch()

  const [dates, setDates] = useState([])
  const [startDateRange, setStartDateRange] = useState(null)
  const [endDateRange, setEndDateRange] = useState(null)

  const [datesModified, setDatesModified] = useState([])
  const [startDateRangeModified, setStartDateRangeModified] = useState(null)
  const [endDateRangeModified, setEndDateRangeModified] = useState(null)

  const defaultParam = {
    is_active: true,
    is_paging: false,
  }

  useEffect(() => {
    dispatch(fetchDataModuleGroup({ is_active: true }));
  }, [dispatch])


  const debounced = useDebouncedCallback(
    event => {
      const { value, name } = event.target
      dispatch(handleParams({ name, value }))
    },
    1000,
    { maxWait: 10000 }
  )

  const handleFilterAutoComplete = name => (event, newValue) => {
    const value = newValue ? newValue.id : null
    dispatch(handleParams({ name, value }))
  }

  const fields = [
    {
      name: 'module_name',
      type: 'text',
      onChange: debounced,
      label: 'Module Name',
      xs: 12,
      md: 4
    },
    {
      name: 'module_group',
      type: 'autocomplete',
      onChange: handleFilterAutoComplete('module_group_id'),
      label: 'Module Group',
      optLabel: 'module_name',
      data: _.sortBy(dataModuleGroup, ['module_name']),
      xs: 12,
      md: 4
    },
    {
      name: 'created_at',
      type: 'date',
      label: 'Date Created',
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
        'created_at')
    },
    {
      name: 'modified_at',
      type: 'date',
      label: 'Date Modified',
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
        'modified_at'
      )
    }
  ];

  return (
    <CardActionCollapse title={<Translations text={'Filters'} />}>
      <Grid container spacing={2}>
        {fields.map((field, key) => DrawFilter(field, key))}
      </Grid>
    </CardActionCollapse>
  )
}

function Index() {
  const { t } = useTranslation()

  const fields = [
    {
      minWidth: 80,
      headerName: 'Series',
      name: 'id',
      type: 'link',
      hide: true,
      link: '/apps/setting/module/edit/',
      value: value => value.id,
      valueLink: value => value.id
    },
    {
      name: 'module_name',
      minWidth: 200,
      headerName: 'Module Name',
      type: 'link',
      link: '/apps/setting/module/edit/',
      value: value => value.module_name ? value.module_name : '-',
      valueLink: value => value.id
    },
    {
      name: 'module_group',
      minWidth: 200,
      headerName: 'Module Group',
      value: value => value.moduleGroup ? value.moduleGroup.module_name : '-'
    },
  ];

  const defaultColumns = fields.map(field => DrawColumn(field));

  const dataBreadcrumbs = [
    { name: <Translations text={'Setting'} /> },
    { name: 'Module' },
  ];

  return (
    <ListData
      defaultColumns={defaultColumns}
      nameLabel={`${t('Module')}`}
      storeName={'module'}
      updateData={updateModule}
      urlData={'/apps/setting/module/'}
      getData={fetchData}
      clearResponse={clearResponse}
      filterData={<FilterData storeName={'module'} />}
      dataBreadcrumbs={dataBreadcrumbs}
      clearParams={removeParams}
      checkboxSelection={true}
    />
  )
}

export default Index
