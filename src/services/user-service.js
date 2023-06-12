import { BASE_URL, myAxios, myAxiosWithAuth } from "./helper";

export const getProfile = async () => {
    try {
        console.log("Getting Profile Api Call")
        return await myAxiosWithAuth.get(`${BASE_URL}/users/current-user`)
    } catch (e) {
        throw e;
    }
}

export const signUp = async(user) => {
    try {
        console.log("Signing Up Api Call")
        return await myAxios.post(
            "/auth/register",
            user
        )
    } catch (e) {
        throw e;
    }

}


export const login = async(usernameAndPassword) => {
    try {
        console.log("Logging In Api Call")
        return await 
        myAxios.post(
            "/auth/login",usernameAndPassword
        )
        } catch (e) {
            throw e;
    }
}
