import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'src/configs/AxiosSetting'
import qs from 'qs'

export const fetchData = createAsyncThunk(
    'perkuliahan/fetchData',
    async (params, { rejectWithValue }) => {
        try {
            const response = await axios.get('perkuliahans', {
                params,
                paramsSerializer: params => qs.stringify(params)
            })
            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const uploadPerkuliahan = createAsyncThunk(
    'perkuliahan/uploadPerkuliahan',
    async (data, { getState, dispatch, rejectWithValue }) => {
        try {
            const config = {
                method: 'post',
                url: 'perkuliahan-upload',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            }
            const response = await axios(config)
            dispatch(fetchData(getState().perkuliahan.params))

            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const uploadDPNA = createAsyncThunk(
    'perkuliahan/uploadDPNA',
    async (data, { getState, dispatch, rejectWithValue }) => {
        try {
            const config = {
                method: 'post',
                url: 'dpna-upload',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            }
            const response = await axios(config)
            dispatch(fetchData(getState().perkuliahan.params))

            return response.data

        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const uploadCPMK = createAsyncThunk(
    'perkuliahan/uploadCPMK',
    async (data, { getState, dispatch, rejectWithValue }) => {
        try {
            const config = {
                method: 'post',
                url: 'cpmk-upload',
                headers: {
                    'Content-Type': 'application/json'
                },
                data: data
            }
            const response = await axios(config)
            dispatch(fetchData(getState().perkuliahan.params))

            return response.data
        } catch (error) {
            return rejectWithValue(error.response.data)
        }
    }
)

export const addPerkuliahan = createAsyncThunk('perkuliahan/addPerkuliahan', async (data, { getState, dispatch }) => {
    const config = {
        method: 'post',
        url: 'perkuliahan',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    }
    const response = await axios(config)
    dispatch(fetchData(getState().perkuliahan.params))

    return response.data
})

export const updatePerkuliahan = createAsyncThunk('perkuliahan/updatePerkuliahan', async (data, { getState, dispatch }) => {
    const config = {
        method: 'put',
        url: 'perkuliahan',
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    }
    const response = await axios(config)
    dispatch(fetchData(getState().perkuliahan.params))

    return response.data
})

export const perkuliahansSlice = createSlice({
    name: 'perkuliahan',
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
            dosen_id: null,
            dosen2_id: null,
            dosen3_id: null,
            pj_dosen_id: null,
            mata_kuliah_id: null,
            prodi_id: null,
            tahun_ajaran_id: null,
            kelas: null,
            semester: null,
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
                dosen_id: null,
                dosen2_id: null,
                dosen3_id: null,
                pj_dosen_id: null,
                mata_kuliah_id: null,
                prodi_id: null,
                tahun_ajaran_id: null,
                kelas: null,
                semester: null,
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
        builder.addCase(uploadPerkuliahan.pending, state => {
            state.loading = true
        })
        builder.addCase(uploadPerkuliahan.fulfilled, (state, action) => {
            state.loading = false
            state.message = action.payload.message
        })
        builder.addCase(uploadPerkuliahan.rejected, (state, action) => {
            console.log(action)
            state.loading = false
            state.error = action.payload.message
        })
        builder.addCase(uploadDPNA.pending, state => {
            state.loading = true
        })
        builder.addCase(uploadDPNA.fulfilled, (state, action) => {
            state.loading = false
            state.message = action.payload.message
        })
        builder.addCase(uploadDPNA.rejected, (state, action) => {
            console.log(action)
            state.loading = false
            state.error = action.payload.message
        })
        builder.addCase(uploadCPMK.pending, state => {
            state.loading = true
        })
        builder.addCase(uploadCPMK.fulfilled, (state, action) => {
            state.loading = false
            state.message = action.payload.message
        })
        builder.addCase(uploadCPMK.rejected, (state, action) => {
            console.log(action)
            state.loading = false
            state.error = action.payload.message
        })
        builder.addCase(addPerkuliahan.pending, state => {
            state.loading = true
        })
        builder.addCase(addPerkuliahan.fulfilled, (state, action) => {
            state.loading = false
            state.message = action.payload.message
            state.currentId = action.payload.data.id
        })
        builder.addCase(addPerkuliahan.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.message
        })
        builder.addCase(updatePerkuliahan.pending, state => {
            state.loading = true
        })
        builder.addCase(updatePerkuliahan.fulfilled, (state, action) => {
            state.loading = false
            state.message = action.payload.message
            state.currentId = action.payload.data.id
        })
        builder.addCase(updatePerkuliahan.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.message
        })
    }
})

export const {
    clearResponse,
    handleParams,
    removeParams,
} = perkuliahansSlice.actions
export default perkuliahansSlice.reducer
