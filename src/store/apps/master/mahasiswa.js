import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "src/configs/AxiosSetting";
import qs from "qs";

export const fetchData = createAsyncThunk(
  "mahasiswa/fetchData",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("/mahasiswas", {
        params,
        paramsSerializer: (params) => qs.stringify(params),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addMahasiswa = createAsyncThunk(
  "mahasiswa/addMahasiswa",
  async (data, { getState, dispatch, rejectWithValue }) => {
    try {
      const config = {
        method: "post",
        url: "mahasiswa",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      const response = await axios(config);
      dispatch(fetchData(getState().mahasiswa.params));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateMahasiswa = createAsyncThunk(
  "mahasiswa/updateMahasiswa",
  async (data, { getState, dispatch, rejectWithValue }) => {
    try {
      const config = {
        method: "put",
        url: "mahasiswa",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      const response = await axios(config);
      dispatch(fetchData(getState().mahasiswa.params));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const mahasiswasSlice = createSlice({
  name: "mahasiswa",
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
      nim: "",
      full_name: "",
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
        nim: "",
        full_name: "",
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
      console.log(action);
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(addMahasiswa.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addMahasiswa.fulfilled, (state, action) => {
      if (action.payload.code !== 200) {
        state.error = action.payload.message;
      } else {
        state.loading = false;
        state.message = action.payload.message;
        state.currentId = action.payload.data.id;
      }
    });
    builder.addCase(addMahasiswa.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    builder.addCase(updateMahasiswa.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateMahasiswa.fulfilled, (state, action) => {
      if (action.payload.code !== 200) {
        state.error = action.payload.message;
      } else {
        state.loading = false;
        state.message = action.payload.message;
        state.currentId = action.payload.data.id;
      }
    });
    builder.addCase(updateMahasiswa.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export const { clearResponse, handleParams, removeParams } =
  mahasiswasSlice.actions;
export default mahasiswasSlice.reducer;
