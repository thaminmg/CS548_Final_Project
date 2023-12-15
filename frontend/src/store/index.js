import crmReducer from './modules/crm'
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    crm: crmReducer
  }
})