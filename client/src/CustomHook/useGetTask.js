import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAllTask } from "../redux/taskSlice";

export const useGetTask = ()=>{
    const {user} = useSelector(store => store.user);
    const {taskRefresh} = useSelector(store => store.task);
    const dispatch = useDispatch();
    useEffect(()=>{
        try {
            axios.get(`/task/myTask/${user?._id}`).then((res)=>{
                console.log(res.data);
                dispatch(getAllTask(res.data));
            })
        } catch (error) {
            console.log(error);
        }
    },[taskRefresh]);
}