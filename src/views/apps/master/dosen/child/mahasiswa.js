import {
    CardContent,
    Button
} from '@mui/material'

import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DataGrid } from '@mui/x-data-grid'
import { useFieldArray } from 'react-hook-form'

import 'react-datepicker/dist/react-datepicker.css'

function Mahasiswa({ control, store }) {
    const [pageSize, setPageSize] = useState(10)
    const dispatch = useDispatch()

    const { fields, append, remove, update } = useFieldArray({
        control,
        name: 'mahasiswa'
    })

    const handleCloseModal = () => {
        dispatch(closeModal())
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
