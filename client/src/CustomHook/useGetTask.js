import axios from "axios"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { getAllTask } from "../redux/taskSlice";

export const useGetTask = () => {
    const { taskRefresh } = useSelector(store => store.task);
    const dispatch = useDispatch();
    useEffect(() => {
            try {
                axios.get(`/task/myTask`).then((res) => {
                    console.log(res.data);
                    dispatch(getAllTask(res.data));
                })
            } catch (error) {
                console.log(error);
            }
    }, [taskRefresh]);
}