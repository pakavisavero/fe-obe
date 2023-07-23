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
  updateMataKuliah
} from 'src/store/apps/master/mataKuliah'

import { fetchData as fetchDataProdi } from 'src/store/apps/master/prodi'
import { fetchData as fetchDataKurikulum } from 'src/store/apps/master/kurikulum'

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

  const { data: dataProdi, loading: loadingProdi } = useSelector(state => state.prodi)
  const { data: dataKurikulum, loading: loadingKurikulum } = useSelector(state => state.kurikulum)

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
    dispatch(fetchDataProdi({ is_active: true }));
    dispatch(fetchDataKurikulum({ is_active: true }));
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

  const SearchhandleFilterAutoCompleteProdi = (e) => {
    var val = e.target.value;
    if (val.length > 0) {
      dispatch(fetchDataProdi({
        ...defaultParam,
        prodi: val,
      }))

    } else {
      dispatch(fetchDataProdi({ ...defaultParam }));
    }
  }

  const fields = [
    {
      name: 'kode_mk',
      type: 'text',
      onChange: debounced,
      label: 'Kode MK',
      xs: 12,
      md: 4
    },
    {
      name: 'mata_kuliah',
      type: 'text',
      onChange: debounced,
      label: 'Mata Kuliah',
      xs: 12,
      md: 4
    },
    {
      name: 'kurikulum',
      type: 'autocomplete',
      onChange: handleFilterAutoComplete('kurikulum_id'),
      label: 'Kurikulum',
      optLabel: 'name',
      data: _.sortBy(dataKurikulum, ['name']),
      xs: 12,
      md: 4
    },
    {
      name: 'prodi',
      type: 'autocomplete',
      changeSearch: SearchhandleFilterAutoCompleteProdi,
      onChange: handleFilterAutoComplete('prodi_id'),
      label: 'Program Studi',
      optLabel: 'prodi',
      data: _.sortBy(dataProdi, ['prodi']),
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
      link: '/apps/master/mata-kuliah/edit/',
      value: value => value.id,
      valueLink: value => value.id
    },
    {
      name: 'kode_mk',
      minWidth: 200,
      headerName: 'Kode MK',
      type: 'link',
      link: '/apps/master/mata-kuliah/edit/',
      value: value => value.kode_mk ? value.kode_mk : '-',
      valueLink: value => value.id
    },
    {
      name: 'mata_kuliah',
      minWidth: 200,
      headerName: 'Mata Kuliah',
      value: value => value.mata_kuliah
    },
    {
      name: 'kurikulum',
      minWidth: 200,
      headerName: 'Kurikulum',
      value: value => value.kurikulum ? value.kurikulum.name : '-',
    },
    {
      name: 'prodi',
      minWidth: 200,
      headerName: 'Program Studi',
      value: value => value.prodi ? value.prodi.prodi : '-',
    },
  ];

  const defaultColumns = fields.map(field => DrawColumn(field));

  const dataBreadcrumbs = [
    { name: <Translations text={'Master'} /> },
    { name: 'Mata Kuliah' },
  ];

  return (
    <ListData
      defaultColumns={defaultColumns}
      nameLabel={`${t('Mata Kuliah')}`}
      storeName={'mataKuliah'}
      updateData={updateMataKuliah}
      urlData={'/apps/master/mata-kuliah/'}
      getData={fetchData}
      clearResponse={clearResponse}
      filterData={<FilterData storeName={'mataKuliah'} />}
      dataBreadcrumbs={dataBreadcrumbs}
      clearParams={removeParams}
      checkboxSelection={true}
    />
  )
}

export default Index
