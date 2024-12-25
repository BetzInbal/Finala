import {
    ActionReducerMapBuilder,
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";
import { ITypeDto, ITypeSafe } from "../types/safeTypes";

export const base_url = "http://localhost:3000/api" //  `${base_url}/`
const initialState: ITypeSafe = {
    error: false,
    loading: true,
    data: [],
};

export const fetchTypes = createAsyncThunk(
    "Types/getList",
    async (_, thunkApi) => {
        try {
            const res = await fetch(
                `${base_url}/analysis/deadliest-attack-types`
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

const TypesSlice = createSlice({
    name: "types",
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<ITypeSafe>) => {
        builder
            .addCase(fetchTypes.pending, (state) => {
                state.loading = true
                state.error = false;
                state.data = [];
            })
            .addCase(fetchTypes.fulfilled, (state, action) => {
                state.loading = false
                state.error = false;
                state.data = action.payload as unknown as ITypeDto[];
            })
            .addCase(fetchTypes.rejected, (state, action) => {
                state.loading = false
                state.error = true
                state.data = [];
            });
    },
});

export default TypesSlice;
