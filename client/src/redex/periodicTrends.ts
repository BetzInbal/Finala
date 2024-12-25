import {
    ActionReducerMapBuilder,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import {  IPeriodicTrendsDto, IPeriodicTrendsSafe} from "../types/safeTypes";


const initialState: IPeriodicTrendsSafe = {
    error: false,
    loading: true,
    data: [],
};

export const fetchPeriodicTrends = createAsyncThunk(
    "areaAverages/getList",
    async (_, thunkApi) => {
        try {
            const res = await fetch(
                `${base_url}/analysis/highest-casualty-regions`
            );
            if (res.status != 200) {
                thunkApi.rejectWithValue("Can't get the list, please try again");
            }
            const data = await res.json();
            return data;
        } catch (err) {
            thunkApi.rejectWithValue("Can't get the list, please try again");
        }
    }
);

const periodicTrendsSlice = createSlice({
    name: "types",
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<IPeriodicTrendsSafe>) => {
        builder
            .addCase(fetchPeriodicTrends.pending, (state) => {
                state.loading = true
                state.error = false;
                state.data = [];
            })
            .addCase(fetchPeriodicTrends.fulfilled, (state, action) => {
                state.loading = false
                state.error = false;
                state.data = action.payload as unknown as IPeriodicTrendsDto[];
            })
            .addCase(fetchPeriodicTrends.rejected, a() /* (state, action) => {
                state.loading = false
                state.error = true
                state.data = [];
            }*/);
    },
});
function a () {
    return  (state, action) => {
        state.loading = false
        state.error = true
        state.data = [];
    }
}

export default periodicTrendsSlice;
