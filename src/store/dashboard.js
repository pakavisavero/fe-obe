import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'src/configs/AxiosSetting'
import qs from 'qs'

export const fetchData = createAsyncThunk(
  'dashboard/fetchData',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get('dashboards', {
        params,
        paramsSerializer: params => qs.stringify(params)
      })

      return response.data

    } catch (error) {
      return rejectWithValue(error.response.data)

    }
  }
)

export const dashboardsSlice = createSlice({
  name: 'dashboard',
  initialState: {
    data: {},
    loading: false,
    error: null,
    allData: [],
    message: null,
    currentId: null,
    total: 0,
  },
  reducers: {
    handleParams: (state, action) => {
      state.params[action.payload.name] = action.payload.value
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchData.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false
      if (action.payload.code !== 200) {
        state.error = action.payload.message
      } else {
        state.data = action.payload.data
        state.total = action.payload.total
      }
    })
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false
      state.error = action.payload.message
    })
  }
})

export default dashboardsSlice.reducer

