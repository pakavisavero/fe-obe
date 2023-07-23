import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'src/configs/AxiosSetting'
import qs from 'qs'

export const fetchDataOption = createAsyncThunk(
  'docstatusPk/fetchDataOption',
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get('option/doc-status-pk', {
        params,
        paramsSerializer: params => qs.stringify(params)
      })

      return response.data

    } catch (error) {
      return rejectWithValue(error.response.data)

    }
  }
)

export const docStatusPksSlice = createSlice({
  name: 'docstatusPk',
  initialState: {
    data: [],
    loading: false,
    error: null,
    allData: [],
    message: null,
    currentId: null,
    total: 0,
    params: {
      id: null,
      created_at: []
    },
  },
  reducers: {
    handleParams: (state, action) => {
      state.params[action.payload.name] = action.payload.value
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchDataOption.pending, state => {
      state.loading = true
    })
    builder.addCase(fetchDataOption.fulfilled, (state, action) => {
      console.log(action.payload)

      state.loading = false
      if (action.payload.code !== 200) {
        state.error = action.payload.message
      } else {
        state.data = action.payload.data
        state.total = action.payload.total
      }
    })
    builder.addCase(fetchDataOption.rejected, (state, action) => {
      console.log(action.payload)

      state.loading = false
      state.error = action.payload.message
    })
  }
})

export default docStatusPksSlice.reducer

