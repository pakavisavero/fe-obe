import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "src/configs/AxiosSetting";
import qs from "qs";

export const fetchDataOption = createAsyncThunk(
  "tahunAjaran/fetchDataOption",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("option/tahun-ajaran", {
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
  "tahunAjaran/fetchData",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("tahun-ajarans", {
        params,
        paramsSerializer: (params) => qs.stringify(params),
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addTahunAjaran = createAsyncThunk(
  "tahunAjaran/addTahunAjaran",
  async (data, { getState, dispatch, rejectWithValue }) => {
    try {
      const config = {
        method: "post",
        url: "tahun-ajaran",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      const response = await axios(config);
      dispatch(fetchData(getState().tahunAjaran.params));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTahunAjaran = createAsyncThunk(
  "tahunAjaran/updateTahunAjaran",
  async (data, { getState, dispatch, rejectWithValue }) => {
    try {
      const config = {
        method: "put",
        url: "tahun-ajaran",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      const response = await axios(config);
      dispatch(fetchData(getState().tahunAjaran.params));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const tahunAjaransSlice = createSlice({
  name: "tahunAjaran",
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
    builder.addCase(addTahunAjaran.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addTahunAjaran.fulfilled, (state, action) => {
      if (action.payload.code !== 200) {
        state.error = action.payload.message;
      } else {
        state.loading = false;
        state.message = action.payload.message;
        state.currentId = action.payload.data.id;
      }
    });
    builder.addCase(addTahunAjaran.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(updateTahunAjaran.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTahunAjaran.fulfilled, (state, action) => {
      if (action.payload.code !== 200) {
        state.error = action.payload.message;
      } else {
        state.loading = false;
        state.message = action.payload.message;
        state.currentId = action.payload.data.id;
      }
    });
    builder.addCase(updateTahunAjaran.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export const { clearResponse, handleParams, removeParams } =
  tahunAjaransSlice.actions;
export default tahunAjaransSlice.reducer;
