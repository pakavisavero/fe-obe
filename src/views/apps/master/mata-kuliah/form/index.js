import { CardContent, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import { DrawField } from 'src/utils/field'

import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'

import { fetchData as fetchDataKurikulum } from 'src/store/apps/master/kurikulum'
import { fetchData as fetchDataProdi } from 'src/store/apps/master/prodi'

import _ from 'lodash'

const Index = ({ control, errors }) => {
  const dispatch = useDispatch()

  const { data: dataKurikulum, loading: loadingKurikulum } = useSelector(state => state.kurikulum)
  const { data: dataProdi, loading: loadingProdi } = useSelector(state => state.prodi)

  const defaultParam = {
    is_active: true,
    is_paging: false,
  };

  useEffect(() => {
    dispatch(fetchDataKurikulum({ is_active: true }))
    dispatch(fetchDataProdi({ is_active: true }))
  }, [dispatch])


  const handleChangeAutoComplete = (name, opt) => (event, newValue) => {
    const nameSplit = name.split('_name')
    if (newValue) {
      setValueData(name, newValue)
      setValueData(nameSplit[0], newValue.id)
    } else {
      setValueData(name, { [opt]: '' })
      setValueData(nameSplit[0], '')
    }
  }

  const SearchhandleFilterAutoCompleteFakultas = (e) => {
    var val = e.target.value;
    if (val.length > 0) {
      dispatch(fetchDataFakultas({
        ...defaultParam,
        fakultas_name: val,
      }))

    } else {
      dispatch(fetchDataFakultas({ ...defaultParam }));
    }
  }

  const fields = [
    {
      name: 'kode_mk',
      type: 'text',
      label: 'Kode MK',
      xs: 12,
      md: 4
    },
    {
      name: 'mata_kuliah',
      type: 'text',
      label: 'Mata Kuliah',
      xs: 12,
      md: 4
    },
    {
      key: 'kurikulum_id',
      name: 'kurikulum_id_name',
      type: 'autocomplete',
      label: 'Kurikulum',
      xs: 12,
      md: 4,
      data: _.sortBy(dataKurikulum, ['name']),
      loading: loadingKurikulum,
      optLabel: 'name',
      onChange: handleChangeAutoComplete('kurikulum_id_name', 'name'),
    },
    {
      key: 'prodi_id',
      name: 'prodi_id_name',
      type: 'autocomplete',
      label: 'Program Studi',
      xs: 12,
      md: 4,
      data: _.sortBy(dataProdi, ['prodi']),
      loading: loadingProdi,
      optLabel: 'prodi',
      onChange: handleChangeAutoComplete('prodi_id_name', 'prodi'),
    },
    {
      name: 'is_active',
      type: 'select',
      label: 'Status',
      xs: 12,
      md: 4,
      opt: [
        {
          value: true,
          label: 'Active'
        },
        {
          value: false,
          label: 'Inactive'
        }
      ]
    }
  ]

  return (
    <CardContent>
      <Grid container spacing={3}>
        {fields.map((field, key) => DrawField(field, errors, control, key))}
      </Grid>
    </CardContent>
  )
}

export default Index
