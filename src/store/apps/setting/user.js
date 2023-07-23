import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "src/configs/AxiosSetting";
import qs from "qs";

export const fetchDataOption = createAsyncThunk(
  "user/fetchDataOption",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("option/user", {
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
  "user/fetchData",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("users", {
        params,
        paramsSerializer: (params) => qs.stringify(params),
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addUser = createAsyncThunk(
  "user/addUser",
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
      dispatch(fetchData(getState().user.params));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/updateUser",
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
      dispatch(fetchData(getState().user.params));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (data, { getState, dispatch, rejectWithValue }) => {
    try {
      const config = {
        method: "put",
        url: "update-password",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      const response = await axios(config);
      dispatch(fetchData(getState().user.params));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const usersSlice = createSlice({
  name: "user",
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
        is_active: true,
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
    builder.addCase(addUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.currentId = action.payload.data.id;
    });
    builder.addCase(addUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.currentId = action.payload.data.id;
    });
    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(updatePassword.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updatePassword.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.currentId = action.payload.data.id;
    });
    builder.addCase(updatePassword.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export const { clearResponse, handleParams, removeParams } = usersSlice.actions;
export default usersSlice.reducer;
