// ** React Imports
import { useState, forwardRef } from 'react'

// ** MUI Imports
import Card from '@mui/material/Card'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

// ** Icon Imports
import ChevronUp from 'mdi-material-ui/ChevronUp'
import ChevronDown from 'mdi-material-ui/ChevronDown'

const CardActionCollapse = forwardRef((props, ref) => {
  // ** Props
  const { title, children, disabled } = props
  const [collapsed, setCollapsed] = useState(false)
  return (
    <Card ref={ref}>
      <CardHeader
        title={title}
        action={
          <IconButton
            size='small'
            aria-label='collapse'
            sx={{ color: 'text.secondary' }}
            onClick={() => setCollapsed(!collapsed)}
            disabled={disabled}
          >
            {!collapsed ? <ChevronDown fontSize='small' /> : <ChevronUp fontSize='small' />}
          </IconButton>
        }
      />
      <Collapse in={collapsed}>
        <CardContent>{children}</CardContent>
      </Collapse>
    </Card>
  )
})

export default CardActionCollapse
