import { createSlice } from "@reduxjs/toolkit";

const taskSlice = createSlice({
    name:"task",
    initialState:{
        allTask:[],
        taskRefresh:false,
        srchTaskBytitle:null,
    },
    reducers:{
        getAllTask:(state,action)=>{
            state.allTask = action.payload;
        },
        setTaskRefresh:(state)=>{
            state.taskRefresh =  !state.taskRefresh;
        },
        getTaskTitle:(state,action)=>{
            state.srchTaskBytitle = action.payload;
        },
    }
});
export const {getAllTask,setTaskRefresh,getTaskTitle} = taskSlice.actions;
export default taskSlice.reducer;