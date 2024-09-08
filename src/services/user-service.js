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

export const requestPasswordReset = async(values) => {
    try {
        console.log("Requesting Password Reset Api Call")
        return await myAxios.post(
            "/auth/request-password-reset?username=" +values.username
        )
    } catch (e) {
        throw e;
    }
}

export const validateToken = async(token) => {
    try {
        console.log("Validating Token Api Call")
        return await myAxios.get(
            `/auth/reset-password?token=${token}`
        )
    } catch (e) {
        throw e;
    }
}

export const resetPassword = async(passwordData) => {
    try {
        console.log("Resetting Password Api Call")
        return await myAxios.post(
            "/auth/reset-password?token=" + passwordData.token,
            {"newPassword": passwordData.newPassword}
        )
    } catch (e) {
        throw e;
    }
}