// ** Next Import
// ** MUI Imports
import { Box } from '@mui/material'
import Button from '@mui/material/Button'
import axios from 'axios'
import { getCookie } from 'cookies-next'
import ExportVariant from 'mdi-material-ui/ExportVariant'
import Import from 'mdi-material-ui/Import'
import Refresh from 'mdi-material-ui/Refresh'
import Link from 'next/link'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import ImportDialog from './ImportDialogCPMK'

const TableHeader = props => {
  // ** Props
  const {
    url,
    name,
    actionRefresh,
    dinamic = false,
    updateOnly = false,
    isImport = false,
    checkboxMaster = false,
    params,
    storeName,
    templateFile,
    importFunction
  } = props

  const [open, setOpen] = useState(false)

  const handleClose = () => setOpen(false)
  const handleOpen = () => setOpen(true)

  const dispatch = useDispatch()

  const callbackImport = dataFile => {
    if (dataFile.length > 1) {
      console.log(dataFile)
      const dataRequest = { data: dataFile }
      dispatch(importFunction(dataRequest))
    } else {
      toast.error('File empty')
    }
  }

  const handleDownload = async () => {
    const token = getCookie('token')

    const config = {
      method: 'post',
      url: `${process.env.NEXT_PUBLIC_API_URL_EXPORT}api/v1/report/`,
      headers: {
        'Content-Type': 'application/json',
        token
      },
      responseType: 'blob',
      data: { ...params, rpt_file: storeName }
    }

    try {
      const response = await axios(config)
      const href = URL.createObjectURL(response.data)

      // create "a" HTML element with href to file & click
      const link = document.createElement('a')
      link.href = href
      link.setAttribute('download', 'file.xlsx') //or any other extension
      document.body.appendChild(link)
      link.click()

      // clean up "a" element & remove ObjectURL
      document.body.removeChild(link)
      URL.revokeObjectURL(href)
    } catch (error) {
      const aw = await error.response.data.text()
      toast.error(JSON.parse(aw).message ?? 'Error: ')
    }
  }

  return (
    <>
      <ImportDialog callback={callbackImport} templateFile={templateFile} openDialog={open} handleClose={handleClose} />
      <Box
        sx={{
          p: 5,
          pb: 3,
          width: '100%',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <Button
            sx={{ mr: 4, fontSize: 12 }}
            color='secondary'
            variant='outlined'
            startIcon={<ExportVariant fontSize='small' />}
            onClick={handleDownload}
          >
            Export
          </Button>
          {dinamic && isImport && (
            <>
              <Button
                sx={{ mr: 4, fontSize: 12 }}
                color='secondary'
                variant='outlined'
                startIcon={<Import fontSize='small' />}
                onClick={handleOpen}
              >
                Import
              </Button>
              {/* <Select
                size='small'
                displayEmpty
                defaultValue=''
                sx={{ mr: 4 }}
                disabled={selectedRows && selectedRows.length === 0}
                renderValue={selected => (selected.length === 0 ? 'Actions' : selected)}
              >
                <MenuItem value='' disabled>
                  Actions
                </MenuItem>
                <MenuItem value='Delete'>Delete</MenuItem>
                <MenuItem value='Edit'>Edit</MenuItem>
                <MenuItem value='Send'>Send</MenuItem>
              </Select> */}
            </>
          )}

          {/* {checkboxMaster && (
            <>
              <Button
                sx={{ mr: 4, fontSize: 12 }}
                color='secondary'
                variant='outlined'
                startIcon={<Import fontSize='small' />}
                onClick={handleOpen}
              >
                Import
              </Button>
            </>
          )} */}
        </Box>

        <Box sx={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <Button
            sx={{ mr: 4, fontSize: 12 }}
            color='secondary'
            variant='outlined'
            startIcon={<Refresh fontSize='small' />}
            onClick={actionRefresh}
          >
            Refresh
          </Button>

          {dinamic && !updateOnly && (
            <Link href={url} passHref>
              <Button
                sx={{
                  fontSize: 12,
                  backgroundColor: 'rgb(236,236,236)',
                  color: 'black',
                  outlineColor: 'black'
                }}
              >
                Create {name}
              </Button>
            </Link>
          )}

          {/* {checkboxMaster && (
            <>
              <Link href={url} passHref>
                <Button
                  sx={{
                    fontSize: 12,
                    backgroundColor: 'rgb(236,236,236)',
                    color: 'black',
                    outlineColor: 'black'
                  }}
                >
                  Create {name}
                </Button>
              </Link>
            </>
          )} */}
        </Box>
      </Box>
    </>
  )
}

export default TableHeader
