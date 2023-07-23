import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "src/configs/AxiosSetting";
import qs from "qs";

export const fetchData = createAsyncThunk(
  "assessmentMatkul/fetchData",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("assessment-matkuls", {
        params,
        paramsSerializer: (params) => qs.stringify(params),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.assessmentMatkul.data);
    }
  }
);

export const addAssessmentMatkul = createAsyncThunk(
  "assessmentMatkul/addAssessmentMatkul",
  async (data, { getState, dispatch }) => {
    const config = {
      method: "post",
      url: "assessment-matkul",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios(config);
    dispatch(fetchData(getState().assessmentMatkul.params));

    return response.data;
  }
);

export const updateAssessmentMatkul = createAsyncThunk(
  "assessmentMatkul/updateAssessmentMatkul",
  async (data, { getState, dispatch }) => {
    const config = {
      method: "put",
      url: "assessment-matkul",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios(config);
    dispatch(fetchData(getState().assessmentMatkul.params));

    return response.data;
  }
);

export const fetchDataOption = createAsyncThunk(
  "assessmentMatkul/fetchDataOption",
  async (params, { rejectWithValue }) => {
    console.log(params);
    try {
      const response = await axios.get("assessment-matkul/option", {
        params,
        paramsSerializer: (params) => qs.stringify(params),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.assessmentMatkul.data);
    }
  }
);

export const assessmentMatkulsSlice = createSlice({
  name: "assessmentMatkul",
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
    builder.addCase(addAssessmentMatkul.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addAssessmentMatkul.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.currentId = action.payload.data.id;
    });
    builder.addCase(addAssessmentMatkul.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(updateAssessmentMatkul.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateAssessmentMatkul.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.currentId = action.payload.data.id;
    });
    builder.addCase(updateAssessmentMatkul.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export const { clearResponse, handleParams, removeParams } =
  assessmentMatkulsSlice.actions;

export default assessmentMatkulsSlice.reducer;
