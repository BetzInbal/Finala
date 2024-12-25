import { ActionReducerMapBuilder, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AttackOrganizationSafe, IDedlyOrgDto } from "../types/safeTypes";

const initialState: AttackOrganizationSafe = {
    error: false,
    loading: true,
    data: [],
};
export const base_url = "http://localhost:3000/api" //  `${base_url}/`

export const fetchAttackOrganization = createAsyncThunk(
    "attackOrganization/getList",
    async (_, thunkApi) => {
        try {
            const res = await fetch(`${base_url}//relationships/deadliest-regions/`);
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

const attackOrganizationSlice = createSlice({
    name: "attackOrganization",
    initialState,
    reducers: {},
    extraReducers: (builder: ActionReducerMapBuilder<AttackOrganizationSafe>) => {
        builder
            .addCase(fetchAttackOrganization.pending, (state) => {
                state.loading = true;
                state.error = false;
                state.data = [];
            })
            .addCase(fetchAttackOrganization.fulfilled, (state, action) => {
                state.loading = false;
                state.error = false;
                state.data = action.payload as unknown as IDedlyOrgDto[];
            })
            .addCase(fetchAttackOrganization.rejected, (state, action) => {
                state.loading = false;
                state.error = true;
                state.data = [];
            });
    },
});

export default attackOrganizationSlice;
