import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "src/configs/AxiosSetting";
import qs from "qs";

export const fetchDataOption = createAsyncThunk(
  "statusMahasiswa/fetchDataOption",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("option/status-mahasiswa", {
        params,
        paramsSerializer: (params) => qs.stringify(params),
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchData = createAsyncThunk(
  "statusMahasiswa/fetchData",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("status-mahasiswas", {
        params,
        paramsSerializer: (params) => qs.stringify(params),
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addStatusMahasiswa = createAsyncThunk(
  "statusMahasiswa/addStatusMahasiswa",
  async (data, { getState, dispatch, rejectWithValue }) => {
    try {
      const config = {
        method: "post",
        url: "status-mahasiswa",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      const response = await axios(config);
      dispatch(fetchData(getState().kurikulum.params));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateStatusMahasiswa = createAsyncThunk(
  "statusMahasiswa/updateStatusMahasiswa",
  async (data, { getState, dispatch, rejectWithValue }) => {
    try {
      const config = {
        method: "put",
        url: "status-mahasiswa",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      const response = await axios(config);
      dispatch(fetchData(getState().kurikulum.params));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const statusMahasiswasSlice = createSlice({
  name: "statusMahasiswa",
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
      created_at: [],
    },
  },
  reducers: {
    clearResponse: (state) => {
      state.error = null;
      state.message = null;
    },
    handleParams: (state, action) => {
      state.params[action.payload.name] = action.payload.value;
    },
    removeParams: (state, action) => {
      state.params = {
        id: null,
        created_at: [],
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDataOption.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDataOption.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.code !== 200) {
        state.error = action.payload.message;
      } else {
        state.data = action.payload.data;
        state.total = action.payload.total;
      }
    });
    builder.addCase(fetchDataOption.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      if (action.payload.code !== 200) {
        state.error = action.payload.message;
      } else {
        state.data = action.payload.data;
        state.total = action.payload.total;
      }
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(addStatusMahasiswa.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addStatusMahasiswa.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.currentId = action.payload.data.id;
    });
    builder.addCase(addStatusMahasiswa.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(updateStatusMahasiswa.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateStatusMahasiswa.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.currentId = action.payload.data.id;
    });
    builder.addCase(updateStatusMahasiswa.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export const { clearResponse, handleParams, removeParams } =
  statusMahasiswasSlice.actions;
export default statusMahasiswasSlice.reducer;
