import {
  CardContent,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Button,
  Divider,
} from '@mui/material'

import { Controller } from 'react-hook-form'
import { DrawField } from 'src/utils/field'

import { useDispatch, useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react'

import _ from 'lodash'
import Evaluasi from '../child/evaluasi'

const EvaluasiTab = ({ watch, store, control, errors, isEdit, setValue }) => {
  return (
    <Evaluasi control={control} store={store} watch={watch} />
  )
}

export default EvaluasiTab
