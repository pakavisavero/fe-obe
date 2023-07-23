import {
    Box,
    CardContent,
    IconButton,
    Tooltip,
    Typography,
    Button
} from '@mui/material'

import DeleteOutline from 'mdi-material-ui/DeleteOutline'
import EyeOutline from 'mdi-material-ui/EyeOutline'
import 'react-datepicker/dist/react-datepicker.css'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DataGrid } from '@mui/x-data-grid'
import { useFieldArray } from 'react-hook-form'

import Translations from 'src/layouts/components/Translations'
import SideBarChild from 'src/views/apps/SideBarMultiChild'
import TableHeader from 'src/views/apps/TableHeader'

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function Evaluasi({ control, store, watch }) {
    const [pageSize, setPageSize] = useState(10)
    const [openDialog, setOpenDialog] = useState(false)

    const dispatch = useDispatch()

    const { fields, append, remove, update } = useFieldArray({
        control,
        name: 'evaluasi'
    })

    const outLongText = text => {
        if (text.length < 1) {
            return '-'
        }
        return text.length > 60 ? text.slice(0, 50 - 1) + ' ...' : text
    }

    const toInteger = text => {
        return parseFloat(text).toFixed(2)
    }

    const getColorMemenuhi = param => {
        return param ? 'green' : 'red'
    }

    const defaultColumns = [
        {
            field: 'cpmk',
            headerName: 'CPMK',
            minWidth: 130,
            renderCell: ({ row }) => (
                <Typography variant='body2'>{`${row.cpmk.name || '-'}`}</Typography>
            )
        },
        {
            field: 'rerata',
            headerName: 'Rerata',
            minWidth: 130,
            renderCell: ({ row }) => (
                <Typography variant='body2'>{toInteger(row.rerata)}</Typography>
            )
        },
        {
            field: 'ambang',
            headerName: 'Ambang',
            minWidth: 130,
            renderCell: ({ row }) => (
                <Typography variant='body2'>{toInteger(row.ambang)}</Typography>
            )
        },
        {
            field: 'memenuhi',
            headerName: 'Memenuhi',
            minWidth: 130,
            renderCell: ({ row }) => (
                <Typography
                    variant='body2'
                    sx={{
                        color: getColorMemenuhi(row.memenuhi),
                        fontWeight: 'bold'
                    }}>
                    {row.memenuhi ? 'IYA' : 'TIDAK'}
                </Typography>
            )
        },
        {
            field: 'analisis',
            headerName: 'Analisis',
            minWidth: 400,
            renderCell: ({ row }) => (
                <Typography variant='body2'>{outLongText(row.analsis)}</Typography>
            )
        },
        {
            field: 'rencana',
            headerName: 'Rencana',
            minWidth: 400,
            renderCell: ({ row }) => (
                <Typography variant='body2'>{outLongText(row.rencana)}</Typography>
            )
        },
    ]

    const columns = [
        ...defaultColumns,
    ]

    return (
        <CardContent>
            <DataGrid
                autoHeight
                pagination
                rows={fields}
                columns={columns}
                disableSelectionOnClick
                pageSize={Number(pageSize)}
                rowsPerPageOptions={[10, 25, 50, 100]}
                onSelectionModelChange={rows => setSelectedRows(rows)}
                onPageSizeChange={newPageSize => setPageSize(newPageSize)}
            />
        </CardContent>
    )
}

export default Evaluasi
