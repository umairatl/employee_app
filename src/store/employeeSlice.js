import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  employeeId: '',
  employeeItem: {},
  countTotalEmployee: '',
  countTotalPage: '',
  countItemInList: '',
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setEmployeeId: (state, action) => {
      state.employeeId = action.payload.employeeId;
    },
    setEmployeeItem: (state, action) => {
      state.employeeItem = action.payload.employeeItem;
    },
    setEmployeeDataCounts: (state, action) => {
      state.countTotalEmployee = action.payload.countTotalEmployee;
      state.countTotalPage = action.payload.countTotalPage;
      state.countItemInList = action.payload.countItemInList;
    },
  },
});

export const {setEmployeeId, setEmployeeItem, setEmployeeDataCounts} =
  employeeSlice.actions;
export default employeeSlice.reducer;
