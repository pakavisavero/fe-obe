import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "src/configs/AxiosSetting";
import qs from "qs";

export const fetchData = createAsyncThunk(
  "assessmentProdi/fetchData",
  async (params, { rejectWithValue }) => {
    try {
      const response = await axios.get("assessment-prodis", {
        params,
        paramsSerializer: (params) => qs.stringify(params),
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.assessmentProdi.data);
    }
  }
);

export const addAssessmentProdi = createAsyncThunk(
  "assessmentProdi/addAssessmentProdi",
  async (data, { getState, dispatch }) => {
    const config = {
      method: "post",
      url: "assessment-prodi",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios(config);
    dispatch(fetchData(getState().assessmentProdi.params));

    return response.data;
  }
);

export const updateAssessmentProdi = createAsyncThunk(
  "assessmentProdi/updateAssessmentProdi",
  async (data, { getState, dispatch }) => {
    const config = {
      method: "put",
      url: "assessment-prodi",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axios(config);
    dispatch(fetchData(getState().assessmentProdi.params));

    return response.data;
  }
);


export const assessmentProdisSlice = createSlice({
  name: "assessmentProdi",
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
    builder.addCase(addAssessmentProdi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addAssessmentProdi.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.currentId = action.payload.data.id;
    });
    builder.addCase(addAssessmentProdi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
    builder.addCase(updateAssessmentProdi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateAssessmentProdi.fulfilled, (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.currentId = action.payload.data.id;
    });
    builder.addCase(updateAssessmentProdi.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    });
  },
});

export const { clearResponse, handleParams, removeParams } =
  assessmentProdisSlice.actions;

export default assessmentProdisSlice.reducer;
