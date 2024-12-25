import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IFiveAllDto, IFiveAllSafe } from "../types/safeTypes";

const initialState: IFiveAllSafe = {
    error: false,
    loading: true,
    data: [],
};

export const fetchFiveAll = createAsyncThunk(
    "fiveAll/getList",
    async (_, thunkApi) => {
        try {
            const res = await fetch(`${base_url}/analysis/five-all`);
            if (res.status !== 200) {
                return thunkApi.rejectWithValue("Can't get the list, please try again");
            }
            const data = await res.json();
            return data;
        } catch (err) {
            return thunkApi.rejectWithValue("Can't get the list, please try again");
        }
    }
);

const fiveAllSlice = createSlice({
    name: "fiveAll",
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<IFiveAllSafe>) => {
        builder
            .addCase(fetchFiveAll.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.data = [];
            })
            .addCase(fetchFiveAll.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.data = action.payload as unknown as IFiveAllDto[];
            })
            .addCase(fetchFiveAll.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.data = [];
            });
    },
});

export default fiveAllSlice;
