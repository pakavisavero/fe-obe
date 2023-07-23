import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "src/configs/AxiosSetting";
import qs from "qs";

export const fetchData = createAsyncThunk(
  "dosen/fetchData",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("/dosens", {
        params,
        paramsSerializer: (params) => qs.stringify(params),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addDosen = createAsyncThunk(
  "dosen/addDosen",
  async (data, { getState, dispatch, rejectWithValue }) => {
    try {
      const config = {
        method: "post",
        url: "user",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      const response = await axios(config);
      dispatch(fetchData(getState().dosen.params));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateDosen = createAsyncThunk(
  "dosen/updateDosen",
  async (data, { getState, dispatch, rejectWithValue }) => {
    try {
      const config = {
        method: "put",
        url: "user",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      const response = await axios(config);
      dispatch(fetchData(getState().dosen.params));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const dosensSlice = createSlice({
  name: "dosen",
  initialState: {
    data: [],
    loading: false,
    error: null,
    allData: [],
    message: null,
    currentId: null,
    total: 0,
    params: {
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
        created_at: [],
      };
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
    builder.addCase(addDosen.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addDosen.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.currentId = action.payload.data.id;
    });
    builder.addCase(addDosen.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(updateDosen.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateDosen.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.currentId = action.payload.data.id;
    });
    builder.addCase(updateDosen.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export const { clearResponse, handleParams, removeParams } =
  dosensSlice.actions;
export default dosensSlice.reducer;
