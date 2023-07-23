// ** React Imports
import { yupResolver } from '@hookform/resolvers/yup'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm, useFieldArray, FormProvider } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import Breadcrumbs from './Breadcrumbs'
import AddActions from './master/AddActions'
import SidebarChild from './SideBarChild'

const FormDataWithMultiChild = ({
  children,
  urlData,
  yupSchema,
  updateFunc,
  saveFunc,
  clearResponse,
  defaultValues,
  ContentForm,
  storeName,
  isEdit = false,
  dataBreadcrumbs,
  nameChild,
  yupSchemaChild,
  titleChild,
  ContentFormChild,
  handleCloseModal,
  withBack = true,
  withSave = true
}) => {
  const router = useRouter()
  const [back, setBack] = useState(true)
  const [updatePage, setUpdatePage] = useState(false)
  const { id } = router.query
  const dispatch = useDispatch()

  const store = useSelector(state => state[storeName])
  const { currentId, loading, message, error } = store

  const URL_PREV = `${urlData}list/`
  const URL_NEXT = `${urlData}edit/${currentId}/`

  // ** Hook

  const methods = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues
  })

  const {
    reset,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = methods

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: nameChild
  })

  const defaultSubmit = async data => {
    if (isEdit) {
      dispatch(updateFunc(data))
    } else {
      dispatch(saveFunc(data))
    }
  }

  const defaultSubmitBack = async data => {
    if (isEdit) {
      dispatch(updateFunc(data))
    } else {
      dispatch(saveFunc(data))
    }
    router.replace(URL_PREV)
  }

  const defaultSubmitRedirect = async data => {
    if (isEdit) {
      dispatch(updateFunc(data))
    } else {
      dispatch(saveFunc(data))
    }
    setBack(false)
    setUpdatePage(true)
  }

  const actionSaveback = () => {
    handleSubmit(defaultSubmitBack)()
  }
  const ActionSave = async () => {
    handleSubmit(defaultSubmitRedirect)()
  }

  const ActionBack = () => {
    router.replace(URL_PREV)
  }

  const ActionSaveNew = async () => {
    handleSubmit(defaultSubmit)()
    reset()
    router.replace(`${urlData}add/`)
  }

  useEffect(() => {
    if (currentId && !back) {
      router.replace(URL_NEXT)
    }
  }, [back, currentId, dispatch])

  useEffect(() => {
    if (message) toast.success(message)
    if (error) toast.error(error)
    if (clearResponse) dispatch(clearResponse())
  }, [message, error])

  const handleAdd = data => {
    append(data)
    handleCloseModal()
  }

  const handleUpdate = (idx, data) => {
    update(idx, data)
    handleCloseModal()
  }

  useEffect(() => {
    if (message && id && updatePage) {
      router.replace(router.asPath)
    }
  }, [message, id, updatePage])

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues])

  return (
    <>
      <Grid container spacing={6} component={'FormProvider'} onSubmit={handleSubmit(onSubmit)} methods={methods}>
        <Grid item xl={9} md={8} xs={12}>
          <Breadcrumbs data={dataBreadcrumbs} />
        </Grid>
        <Grid item xs={12}>
          <AddActions
            loading={loading}
            actionSaveback={actionSaveback}
            ActionSave={ActionSave}
            ActionBack={ActionBack}
            ActionSaveNew={ActionSaveNew}
            withBack={withBack}
            withSave={withSave}
          />
        </Grid>
        <Grid item xs={12}>
          <Card>
            {
              <ContentForm
                control={control}
                errors={errors}
                setValueData={setValue}
                fields={fields}
                remove={remove}
                setValue={setValue}
                append={append}
                isEdit={isEdit}
                watch={watch}
              />
            }
          </Card>
        </Grid>
      </Grid>

      {children}
    </>
  )
}
export default FormDataWithMultiChild
