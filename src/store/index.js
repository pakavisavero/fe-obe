// ** Toolkit imports
import { configureStore } from '@reduxjs/toolkit'

// ** Reducers
import chat from 'src/store/apps/chat'
import user from 'src/store/apps/user'
import email from 'src/store/apps/email'
import invoice from 'src/store/apps/invoice'
import calendar from 'src/store/apps/calendar'
import permissions from 'src/store/apps/permissions'
import dashboard from 'src/store/dashboard'

import masterReducer from 'src/store/masterReducer'
import settingReducer from 'src/store/settingReducer'
import transactionReducer from 'src/store/transactionReducer'

export const store = configureStore({
  reducer: {
    user,
    chat,
    email,
    invoice,
    calendar,
    permissions,
    dashboard,
    ...masterReducer,
    ...settingReducer,
    ...transactionReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})
