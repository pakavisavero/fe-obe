// ** React Imports
import { yupResolver } from '@hookform/resolvers/yup'

// ** MUI Imports
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { fetchData } from 'src/store/apps/user'
import Breadcrumbs from './Breadcrumbs'
import AddActions from './master/AddActions'

const FormData = ({
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
  withDocStatus = false
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
  const {
    reset,
    setError,
    control,
    handleSubmit,
    setValue,
    watch,
    clearErrors,
    formState: { errors },
    register,
    getValues
  } = useForm({
    resolver: yupResolver(yupSchema),
    defaultValues
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
    // router.replace(router.asPath)
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

  const ActionSaveNew = async e => {
    e.preventDefault()
    handleSubmit(defaultSubmit)()
    reset()
  }

  useEffect(() => {
    reset(defaultValues)
  }, [defaultValues])

  useEffect(() => {
    if (currentId && !back) {
      router.replace(URL_NEXT)
    }
  }, [currentId, back])

  useEffect(() => {
    if (message) toast.success(message)
    if (error) toast.error(error)
    if (clearResponse) dispatch(clearResponse())
  }, [message, error, currentId, back])

  useEffect(() => {
    if (message && id && updatePage) {
      router.replace(router.asPath)
    }
  }, [message, id, updatePage])

  return (
    <Grid container spacing={6} component={'form'} onSubmit={handleSubmit(defaultSubmit)}>
      <Grid item xs={12}>
        <Breadcrumbs data={dataBreadcrumbs} withDocStatus={withDocStatus} value={watch('docstatus')} />
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
              watch={watch}
              setError={setError}
              clearErrors={clearErrors}
              isEdit={isEdit}
              register={register}
              getValues={getValues}
            />
          }
        </Card>
      </Grid>
    </Grid>
  )
}
export default FormData
