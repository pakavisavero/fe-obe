import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'src/configs/AxiosSetting'
import qs from 'qs'

export const fetchData = createAsyncThunk(
    'moduleGroup/fetchData',
    async (params, { rejectWithValue }) => {
        try {
            const response = await axios.get('module-groups', {
                params,
                paramsSerializer: params => qs.stringify(params)
            })

            return response.data

        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const addModuleGroup = createAsyncThunk(
    'moduleGroup/addModuleGroup',
    async (data, { getState, dispatch, rejectWithValue }) => {
        try {
            const config = {
                method: 'post',
                url: 'module-group',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            }
            const response = await axios(config)
            dispatch(fetchData(getState().moduleGroup.params))

            return response.data

        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const updateModuleGroup = createAsyncThunk(
    'moduleGroup/updateModuleGroup',
    async (data, { getState, dispatch, rejectWithValue }) => {
        try {
            const config = {
                method: 'put',
                url: 'module-group',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            }
            const response = await axios(config)
            dispatch(fetchData(getState().moduleGroup.params))

            return response.data

        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const moduleGroupsSlice = createSlice({
    name: 'moduleGroup',
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
        builder.addCase(addModuleGroup.pending, state => {
            state.loading = true
        })
        builder.addCase(addModuleGroup.fulfilled, (state, action) => {
            state.loading = false
            state.message = action.payload.message
            state.currentId = action.payload.data.id
        })
        builder.addCase(addModuleGroup.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.message
        })

        builder.addCase(updateModuleGroup.pending, state => {
            state.loading = true
        })
        builder.addCase(updateModuleGroup.fulfilled, (state, action) => {
            state.loading = false
            state.message = action.payload.message
            state.currentId = action.payload.data.id
        })
        builder.addCase(updateModuleGroup.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.message
        })
    }
})

export const {
    clearResponse,
    handleParams,
    removeParams,
} = moduleGroupsSlice.actions
export default moduleGroupsSlice.reducer
