import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "src/configs/AxiosSetting";
import qs from "qs";

export const fetchDataOption = createAsyncThunk(
  "fakultas/fetchDataOption",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("option/fakultas", {
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
  "fakultas/fetchData",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("fakultases", {
        params,
        paramsSerializer: (params) => qs.stringify(params),
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addFakultas = createAsyncThunk(
  "fakultas/addFakultas",
  async (data, { getState, dispatch, rejectWithValue }) => {
    try {
      const config = {
        method: "post",
        url: "fakultas",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      const response = await axios(config);
      dispatch(fetchData(getState().fakultas.params));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateFakultas = createAsyncThunk(
  "fakultas/updateFakultas",
  async (data, { getState, dispatch, rejectWithValue }) => {
    try {
      const config = {
        method: "put",
        url: "fakultas",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      const response = await axios(config);
      dispatch(fetchData(getState().fakultas.params));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fakultassSlice = createSlice({
  name: "fakultas",
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
    builder.addCase(addFakultas.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addFakultas.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.currentId = action.payload.data.id;
    });
    builder.addCase(addFakultas.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(updateFakultas.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateFakultas.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.currentId = action.payload.data.id;
    });
    builder.addCase(updateFakultas.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export const { clearResponse, handleParams, removeParams } =
  fakultassSlice.actions;
export default fakultassSlice.reducer;
