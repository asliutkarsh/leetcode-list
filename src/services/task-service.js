import { myAxiosWithAuth } from "./helper";

//create service to post task to server using myAxios

export const createTask = async (taskDetails,userId)=>{
    try {
        console.log('Creating Tasks Api Call')
        return await myAxiosWithAuth.post(
            `/users/${userId}/tasks`,
            taskDetails
        )
    } catch (e) {
        throw e;
}
}

//tasks/:taskId

//create service to get all task from server using myAxios
export const getTasksByUser = async (userId)=>{
    try {
        console.log('Getting Tasks Api Call')
        return await myAxiosWithAuth.get(
            `/users/${userId}/tasks`
        )
    } catch (e) {
        throw e;
    }
}

//create service to delete task by id from server using myAxios

export const deleteTask = async (taskId)=>{
    try {
        console.log('Deleting Tasks Api Call')
        return await myAxiosWithAuth.delete(
            `/tasks/${taskId}`
        )
    } catch (e) {
        throw e;
    }
}