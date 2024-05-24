import { createSlice, configureStore } from '@reduxjs/toolkit'

const yearwiseSalarySlice = createSlice({
  name: 'yearwiseSalary',
  initialState: {
    2020:[], 2021:[], 2022:[], 2023:[], 2024:[]
  },
  reducers: {
    setYearlySalary(state, action) {
        console.log("state",state[2020])
        const {  data } = action.payload
        state[data.work_year].push(data)
        }
  }
})

export const { setYearlySalary } = yearwiseSalarySlice.actions

const store = configureStore({
  reducer:yearwiseSalarySlice.reducer
})



export default store