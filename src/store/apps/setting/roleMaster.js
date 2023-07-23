import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "src/configs/AxiosSetting";
import qs from "qs";
import { getToken } from "src/utils/token";

export const fetchData = createAsyncThunk(
  "roleMaster/fetchData",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("role-masters", {
        params,
        paramsSerializer: (params) => qs.stringify(params),
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addRoleMaster = createAsyncThunk(
  "roleMaster/addRoleMaster",
  async (data, { getState, dispatch, rejectWithValue }) => {
    try {
      const config = {
        method: "post",
        url: "role-master",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      const response = await axios(config);
      dispatch(fetchData(getState().roleMaster.params));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateRoleMaster = createAsyncThunk(
  "module/updateRoleMaster",
  async (data, { getState, dispatch, rejectWithValue }) => {
    try {
      const config = {
        method: "put",
        url: "role-master",
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };
      const response = await axios(config);
      dispatch(fetchData(getState().roleMaster.params));

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const roleMastersSlice = createSlice({
  name: "roleMaster",
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
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchData.fulfilled, (state, action) => {
      const role_id = getToken('role_id');
      const data = action.payload.data
        .filter((item) => item.id !== role_id)
        .filter((item) => item.id !== 1);

      state.loading = false;
      if (action.payload.code !== 200) {
        state.error = action.payload.message;
      } else {
        state.data = data;
        state.total = action.payload.total;
      }
    });
    builder.addCase(fetchData.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(addRoleMaster.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addRoleMaster.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.currentId = action.payload.data.id;
    });
    builder.addCase(addRoleMaster.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });

    builder.addCase(updateRoleMaster.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateRoleMaster.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.currentId = action.payload.data.id;
    });
    builder.addCase(updateRoleMaster.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export const { clearResponse, handleParams, removeParams } =
  roleMastersSlice.actions;
export default roleMastersSlice.reducer;
