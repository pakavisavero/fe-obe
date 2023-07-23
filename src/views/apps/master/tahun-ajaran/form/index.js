import {
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField
} from '@mui/material'

import { Controller } from 'react-hook-form'
import { DrawField } from 'src/utils/field'

import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'

import _ from 'lodash'

const Index = ({ control, errors }) => {
  const fields = [
    {
      name: 'tahun_ajaran',
      type: 'text',
      label: 'Tahun Ajaran',
      xs: 12,
      md: 4
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
