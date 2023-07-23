import { TextField } from '@mui/material'
import format from 'date-fns/format'
import { forwardRef } from 'react'

const CustomInput = forwardRef((props, ref) => {
  const startDate = props.start !== null ? format(props.start, 'dd/MM/yyyy') : ''
  const endDate = props.end !== null ? ` - ${format(props.end, 'dd/MM/yyyy')}` : null
  const value = `${startDate}${endDate !== null ? endDate : ''}`
  props.start === null && props.dates.length && props.setDates ? props.setDates([]) : null
  const updatedProps = { ...props }
  delete updatedProps.setDates
  return <TextField size='small' fullWidth inputRef={ref} {...updatedProps} label={props.label || ''} value={value} />
})

const CustomInputTwo = forwardRef((props, ref) => {
  const updatedProps = { ...props }
  delete updatedProps.setDates
  return <TextField
    fullWidth
    inputRef={ref}
    {...updatedProps}
    label={props.label || ''}
    value={props.value}
  />
})

export default CustomInput
export { CustomInputTwo }
