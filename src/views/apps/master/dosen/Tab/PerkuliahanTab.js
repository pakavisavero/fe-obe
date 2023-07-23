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
import Perkuliahan from '../child/perkuliahan'

const PerkuliahanTab = ({ watch, store, control, errors, isEdit, setValue }) => {
    return (
        <Perkuliahan control={control} store={store} />
    )
}

export default PerkuliahanTab
