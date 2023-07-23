// ** React Imports

// ** MUI Imports
import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import isString from 'lodash/isString'

// ** Third Party Imports
import { useDropzone } from 'react-dropzone'
import RejectionFiles from './RejectionFiles'

// import ImageCustom from './ImageCustom'

// Styled component for the upload image inside the dropzone area
const Img = styled('img')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    marginRight: theme.spacing(15.75)
  },
  [theme.breakpoints.down('md')]: {
    marginBottom: theme.spacing(4)
  },
  [theme.breakpoints.down('sm')]: {
    width: 160
  }
}))

// Styled component for the heading inside the dropzone area
const HeadingTypography = styled(Typography)(({ theme }) => ({
  marginBottom: theme.spacing(5),
  [theme.breakpoints.down('sm')]: {
    marginBottom: theme.spacing(4)
  }
}))

const FileUploaderSingleCustom = ({ error = false, file, helperText, sx, ...other }) => {
  // ** State

  // ** Hook
  const { acceptedFiles, getRootProps, getInputProps, fileRejections } = useDropzone({
    multiple: false,
    ...other
  })

  const handleLinkClick = event => {
    event.preventDefault()
  }

  // const img = files.map(file => (
  //   <img key={file.name} alt={file.name} className='single-file-image' src={URL.createObjectURL(file)} />
  // ))

  return (
    <Box {...getRootProps({ className: 'dropzone' })}>
      <input {...getInputProps()} />
      <Box sx={{ display: 'flex', flexDirection: ['column', 'column', 'row'], alignItems: 'center' }}>
        <Img alt='Upload img' src='/images/misc/upload.png' />
        <Box sx={{ display: 'flex', flexDirection: 'column', textAlign: ['center', 'center', 'inherit'] }}>
          <HeadingTypography variant='h5'>Drop files here or click to upload.</HeadingTypography>
          <Typography color='textSecondary'>
            Drop files here or click{' '}
            <Link href='/' onClick={handleLinkClick}>
              browse
            </Link>{' '}
            thorough your machine
          </Typography>
        </Box>
      </Box>
      {file && (
        <>
          {!isString(file) && (
            <Box>
              <center>
                File {file.name.substring(file.name.lastIndexOf('.') + 1)} not suported for preview <br />({file.name})
              </center>
            </Box>
          )}
        </>
      )}

      {fileRejections.length > 0 && <RejectionFiles fileRejections={fileRejections} />}
      {helperText && helperText}
      {/* {files.length ? img : null} */}
    </Box>
  )
}

export default FileUploaderSingleCustom
