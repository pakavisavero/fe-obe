// ** React Imports

// ** MUI Imports
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Drawer from '@mui/material/Drawer'
import { styled } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useEffect } from 'react'

// ** Third Party Imports
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'

// ** Icons Imports
import Close from 'mdi-material-ui/Close'

// ** Store Imports

// ** Actions Imports

const Header = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(3, 4),
  justifyContent: 'space-between',
  backgroundColor: theme.palette.background.default
}))

const SidebarMultiChild = props => {
  // ** Props
  const { name, schema, ContentForm, onCancel, onAdd, onUpdate, isModelOpen, selectedChild, watch: watchHeader } = props

  // const [df, setstate] = useState(initialState);
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: selectedChild
  })

  const {
    reset,
    control,
    handleSubmit,
    watch,
    setValue,

    formState: { errors }
  } = methods

  const onSubmit = data => {
    delete data.id
    if ('index' in data) {
      onUpdate(data.index, data)
    } else {
      onAdd(data)
    }
    onCancel()
  }

  const handleClose = () => {
    reset()
    onCancel()
  }

  useEffect(() => {
    reset(selectedChild)
  }, [selectedChild])

  return (
    <Drawer
      open={isModelOpen}
      anchor='right'
      variant='temporary'
      onClose={handleClose}
      ModalProps={{ keepMounted: true }}
      sx={{ '& .MuiDrawer-paper': { width: { xs: 300, sm: 400 } } }}
    >
      <Header>
        <Typography variant='h6'>Add {name}</Typography>
        <Close fontSize='small' onClick={handleClose} sx={{ cursor: 'pointer' }} />
      </Header>
      <Box sx={{ p: 5 }}>
        <form method={methods}>
          {<ContentForm control={control} errors={errors} watch={watch} watchHeader={watchHeader} setValue={setValue} />}

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Button size='large' variant='contained' sx={{ mr: 3 }} onClick={handleSubmit(onSubmit)}>
              Submit
            </Button>
            <Button size='large' variant='outlined' color='secondary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Drawer>
  )
}

export default SidebarMultiChild
