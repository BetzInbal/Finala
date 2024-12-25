import {
    ActionReducerMapBuilder,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import { IAreaAverageDto, IAreaAverageSafe } from "../types/safeTypes";

export const base_url = "http://localhost:3000/api" //  `${base_url}/`
const initialState: IAreaAverageSafe = {
    error: false,
    loading: true,
    data: [],
};

export const fetchAreaAverages = createAsyncThunk(
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

const areaAveragesSlice = createSlice({
    name: "types",
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<IAreaAverageSafe>) => {
        builder
            .addCase(fetchAreaAverages.pending, (state) => {
                state.loading = true
                state.error = false;
                state.data = [];
            })
            .addCase(fetchAreaAverages.fulfilled, (state, action) => {
                state.loading = false
                state.error = false;
                state.data = action.payload as unknown as IAreaAverageDto[];
            })
            .addCase(fetchAreaAverages.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.data = [];
            });
    },
});

export default areaAveragesSlice;
