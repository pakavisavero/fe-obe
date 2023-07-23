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
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { DataGrid } from '@mui/x-data-grid'
import 'react-datepicker/dist/react-datepicker.css'
import { useFieldArray } from 'react-hook-form'
import Translations from 'src/layouts/components/Translations'
import SideBarChild from 'src/views/apps/SideBarMultiChild'
import TableHeader from 'src/views/apps/TableHeader'

function Mahasiswa({ control, store }) {
    const [pageSize, setPageSize] = useState(10)

    const dispatch = useDispatch()

    const toggleAddDrawer = () => {
        dispatch(openModal())
    }
    const toggleUpdateDrawer = row => () => {
        const indexData = fields.findIndex(f => f.id == row.id)
        dispatch(selectChild({ ...row, index: indexData }))
    }

    const { fields, append, remove, update } = useFieldArray({
        control,
        name: 'mahasiswa'
    })

    const handleAdd = data => {
        append(data)
        handleCloseModal()
    }

    const handleUpdate = (idx, data) => {
        update(idx, data)
        handleCloseModal()
    }

    const handleCloseModal = () => {
        dispatch(closeModal())
    }

    const handleRemove = index => () => {
        const idx = fields.findIndex(f => f.branch === index)
        remove(idx)
    }

    const defaultColumns = [
        {
            field: 'nim',
            headerName: 'NIM',
            minWidth: 300,
        },
        {
            field: 'full_name',
            headerName: 'Nama Lengkap',
            minWidth: 400,
        },
        {
            field: 'angkatan',
            headerName: 'Angkatan',
            minWidth: 300,
        },
        {
            field: 'status',
            headerName: 'Status',
            minWidth: 200,
            renderCell: ({ row }) => {
                if (row.status !== 'Aktif') {
                    return (
                        <Button style={{ maxHeight: '25px', borderRadius: '15px' }} variant="contained" color="error" size="small">
                            Tidak Aktif
                        </Button>
                    )
                } else {
                    return (
                        <Button style={{ maxHeight: '25px', borderRadius: '15px' }} variant="contained" color="info" size="small">
                            Aktif
                        </Button>
                    )
                }
            }
        },
    ]

    const columns = [
        ...defaultColumns,
    ]

    return (
        <>
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
        </>
    )
}

export default Mahasiswa
