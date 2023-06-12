import React, { useEffect, useState, createContext, useContext } from 'react'
import {getProfile, login as performLogin} from '../services/user-service'
import jwtDecode from 'jwt-decode'

const AuthContext = createContext({})

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({
        id: 0,
        name: "",
        username: "",
        totalPoints: 0,
        dailyPoints: 0    })

    useEffect(() => {
        setUserFromLocal()
    }, [])

    useEffect(() => {
        // console.log(user);
    }, [user]);


    /**
     * set the user in the state from the local storage
     * used in App.jsx component
     */
    const setUserFromLocal = () => {
        let token = localStorage.getItem('token')
        let user = JSON.parse(localStorage.getItem('user'))
        if (token != null) {
            setUser(user)
        }
    }


    /**
     * fetch the user data from the server and set the user in the state
     * used in App.jsx component
     * @returns {Promise<unknown>}
     */
    const fetchUserData = async () => {
        return new Promise((resolve, reject) => {
                getProfile().then((res) => {
                        const user = JSON.stringify(res?.data)
                        localStorage.setItem('user', user)
                        setUser(res?.data);
                        resolve(res)
                    }
                ).catch((err) => {
                        reject(err)
                    }
                )
        })
    }


    /**
     * login the user and set the token in the local storage
     * set the user in the state
     * used in Login.jsx component
     * @param usernameAndPassword  username : string, password: string
     * @returns {Promise<unknown>} token: string, user: object
     */
    const login = async (usernameAndPassword) => {
        return new Promise((resolve, reject) => {
            performLogin(usernameAndPassword)
                .then((res) => {
                    const token = res?.data?.token
                    const user = JSON.stringify(res?.data?.user)
                    localStorage.setItem('token', token)
                    localStorage.setItem('user', user)
                    setUser(res?.data?.user);
                    resolve(res);
                })
                .catch((err) => {
                    reject(err)
                })
        })
    }

    /**
     * remove the token from local storage and set the user in the state to null
     * used in App.jsx component
     */
    const logOut = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUser(null)
    }

    /**
     *  if the token is expired then remove the token from local storage and set the user in the state to null
     *   else set the user in the state
     *  used in App.jsx component
     * @returns {boolean}
     */
    const isCustomerAuthenticated = () => {
        const token = localStorage.getItem('token')
        if (!token) {
            return false
        }

        const { exp: expiration } = jwtDecode(token)
        if (Date.now() > expiration * 1000) {
            logOut()
            return false
        }
        return true
    }


    return (
    <AuthContext.Provider
      value={{
        user,
          login,
          logOut,
          isCustomerAuthenticated,
          fetchUserData,
          setUserFromLocal
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

export default UserProvider
