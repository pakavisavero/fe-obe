import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "src/configs/AxiosSetting";
import qs from "qs";

export const fetchData = createAsyncThunk(
  "siklusProdi/fetchData",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("siklus-prodis", {
        params,
        paramsSerializer: (params) => qs.stringify(params),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addSiklusProdi = createAsyncThunk(
  "siklusProdi/addSiklusProdi",
  async (data, { getState, dispatch }) => {
    const config = {
      method: "post",
      url: "siklus-prodi",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios(config);
    dispatch(fetchData(getState().siklusProdi.params));

    return response.data;
  }
);

export const updateSiklusProdi = createAsyncThunk(
  "siklusProdi/updateSiklusProdi",
  async (data, { getState, dispatch }) => {
    const config = {
      method: "put",
      url: "siklus-prodi",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios(config);
    dispatch(fetchData(getState().siklusProdi.params));

    return response.data;
  }
);

export const siklusProdisSlice = createSlice({
  name: "siklusProdi",
  initialState: {
    data: [],
    loading: false,
    error: null,
    allData: [],
    message: null,
    currentId: null,
    total: 0,
    params: {},
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
      state.params = {};
    },
  },
  extraReducers: (builder) => {
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
    builder.addCase(addSiklusProdi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addSiklusProdi.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.currentId = action.payload.data.id;
    });
    builder.addCase(addSiklusProdi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(updateSiklusProdi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateSiklusProdi.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.currentId = action.payload.data.id;
    });
    builder.addCase(updateSiklusProdi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export const { clearResponse, handleParams, removeParams } =
  siklusProdisSlice.actions;

export default siklusProdisSlice.reducer;
