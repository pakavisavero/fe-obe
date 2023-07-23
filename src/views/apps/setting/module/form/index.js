import { CardContent, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import { DrawField } from 'src/utils/field'

import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'

import { fetchData as fetchDataModuleGroup } from 'src/store/apps/setting/moduleGroup'

import _ from 'lodash'

const Index = ({ control, errors, setValue }) => {
  const dispatch = useDispatch()

  const { data: dataModuleGroup, loading: loadingModuleGroup } = useSelector(state => state.moduleGroup)

  const defaultParam = {
    is_active: true,
    is_paging: false,
  };

  useEffect(() => {
    dispatch(fetchDataModuleGroup({ is_active: true }))
  }, [dispatch])


  const handleChangeAutoComplete = (name, opt) => (event, newValue) => {
    const nameSplit = name.split('_name')
    if (newValue) {
      setValue(name, newValue)
      setValue(nameSplit[0], newValue.id)
    } else {
      setValue(name, { [opt]: '' })
      setValue(nameSplit[0], '')
    }
  }

  const fields = [
    {
      name: 'module_name',
      type: 'text',
      label: 'Module Name',
      xs: 12,
      md: 4
    },
    {
      key: 'module_group_id',
      name: 'module_group_id_name',
      type: 'autocomplete',
      label: 'Module Group',
      xs: 12,
      md: 4,
      data: _.sortBy(dataModuleGroup, ['module_name']),
      loading: loadingModuleGroup,
      optLabel: 'module_name',
      onChange: handleChangeAutoComplete('module_group_id_name', 'module_name'),
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
