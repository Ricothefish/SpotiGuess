import React, { useState, useEffect } from "react";
import axios from "axios"


const urlServerLocal = 'http://localhost:3001'
const urlServerOnline= 'https://blindtest-spotify-v1.herokuapp.com'

const urlServer= urlServerLocal;

function UseAuth(code) {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()


    useEffect(() => {
        axios.post(`${urlServer}/login`, { code, })
            .then(res => {
                setAccessToken(res.data.accessToken)
                setRefreshToken(res.data.refreshToken)
                setExpiresIn(res.data.expiresIn)
                window.history.pushState({}, null, '/')
            })
            .catch(() => {
                window.location = '/'
            })

    }, [code])



    useEffect(() => {
        if (!refreshToken || !expiresIn) return

        const interval = setInterval(() => {
            axios.post(`${urlServer}/refresh`, { refreshToken, })
                .then(res => {
                    setAccessToken(res.data.accessToken)
                    setExpiresIn(res.data.expiresIn)

                })
                .catch(() => {
                    window.location = '/'
                })

        }, (expiresIn - 60) * 1000)

        return () => clearInterval(interval)



    }, [refreshToken, expiresIn])



    return accessToken

}

export default UseAuth