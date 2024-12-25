import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AttackYearSafe, IOrgByYearsDto } from "../types/safeTypes";

const initialState: AttackYearSafe = {
    error: false,
    loading: true,
    data: [],
};

export const base_url = "http://localhost:3000/api" //  `${base_url}/`

export const fetchAttackYear = createAsyncThunk(
    "attackYear/getList",
    async (_, thunkApi) => {
        try {
            const res = await fetch(`${base_url}//relationships/groups-by-year`);
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

const attackYearSlice = createSlice({
    name: "attackYear",
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<AttackYearSafe>) => {
        builder
            .addCase(fetchAttackYear.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.data = [];
            })
            .addCase(fetchAttackYear.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.data = action.payload as unknown as IOrgByYearsDto[];
            })
            .addCase(fetchAttackYear.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.data = [];
            });
    },
});

export default attackYearSlice;
