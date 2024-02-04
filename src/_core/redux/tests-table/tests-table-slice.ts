import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TestDetailsType } from '../../components/custom-table/CustomTable.type'

export type InitialState = {
    value: TestDetailsType[]
}

const initialState: InitialState = {
    value: [],
}

export const testsTableSlice = createSlice({
    name: 'testsTable',
    initialState,
    reducers: {
        updateTestsTable: (state, action: PayloadAction<TestDetailsType[]>) => {
            state.value = action.payload
        },
    },
})

export const { updateTestsTable } = testsTableSlice.actions
export default testsTableSlice.reducer
