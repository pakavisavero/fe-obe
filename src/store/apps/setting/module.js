import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'src/configs/AxiosSetting'
import qs from 'qs'

export const fetchData = createAsyncThunk(
    'module/fetchData',
    async (params, { rejectWithValue }) => {
        try {
            const response = await axios.get('modules', {
                params,
                paramsSerializer: params => qs.stringify(params)
            })

            return response.data

        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    })


export const addModule = createAsyncThunk(
    'module/addModule',
    async (data, { getState, dispatch, rejectWithValue }) => {
        try {
            const config = {
                method: 'post',
                url: 'module',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            }
            const response = await axios(config)
            dispatch(fetchData(getState().module.params))

            return response.data

        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateModule = createAsyncThunk(
    'module/updateModule',
    async (data, { getState, dispatch, rejectWithValue }) => {
        try {
            const config = {
                method: 'put',
                url: 'module',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            }
            const response = await axios(config)
            dispatch(fetchData(getState().module.params))

            return response.data

        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const modulesSlice = createSlice({
    name: 'module',
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
            is_active: true,
            created_at: []
        },
    },
    reducers: {
        clearResponse: state => {
            state.error = null
            state.message = null
        },
        handleParams: (state, action) => {
            state.params[action.payload.name] = action.payload.value
        },
        removeParams: (state, action) => {
            state.params = {
                id: null,
                is_active: true,
                created_at: []
            }
        }
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
        builder.addCase(addModule.pending, state => {
            state.loading = true
        })
        builder.addCase(addModule.fulfilled, (state, action) => {
            state.loading = false
            state.message = action.payload.message
            state.currentId = action.payload.data.id
        })
        builder.addCase(addModule.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.message
        })

        builder.addCase(updateModule.pending, state => {
            state.loading = true
        })
        builder.addCase(updateModule.fulfilled, (state, action) => {
            state.loading = false
            state.message = action.payload.message
            state.currentId = action.payload.data.id
        })
        builder.addCase(updateModule.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.message
        })
    }
})

export const {
    clearResponse,
    handleParams,
    removeParams,
} = modulesSlice.actions
export default modulesSlice.reducer
