// ** React Imports
import { yupResolver } from '@hookform/resolvers/yup'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'

import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm, useFieldArray, FormProvider } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import Breadcrumbs from './Breadcrumbs'
import AddActions from './master/AddActions'
import SidebarChild from './SideBarChild'

const FormDataWithChild = ({
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
  withBack = true,
  withSave = true,
  withDocStatus = false,
}) => {
  const router = useRouter()
  const [back, setBack] = useState(true)
  const dispatch = useDispatch()

  const store = useSelector(state => state[storeName])
  const { currentId, loading, message, error, docstatus = 0, case_status_id = 0 } = store

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
    getValues,
    formState: { errors, isDirty }
  } = methods

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

  return (
    <>
      <Grid container spacing={6} component={'form'} methods={methods} onSubmit={handleSubmit(defaultSubmit)}>
        <Grid item xs={12}>
          <Breadcrumbs data={dataBreadcrumbs} withDocStatus={withDocStatus} value={defaultValues} />
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
                setValue={setValue}
                isEdit={isEdit}
                watch={watch}
                store={store}
                getValues={getValues}
                data={defaultValues}
                saveForm={handleSubmit(defaultSubmit)}
                isDirty={isDirty}
              />
            }
          </Card>
        </Grid>
      </Grid>
    </>
  )
}
export default FormDataWithChild
