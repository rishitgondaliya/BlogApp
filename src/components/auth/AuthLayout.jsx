/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function AuthLayout({ children, authentication = true }) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState()
    const isLoggedIn = useSelector(state => state.auth.status)

    useEffect(() => {
        if (authentication && isLoggedIn !== authentication) {
            navigate("/login")
        } else if (!authentication && isLoggedIn !== authentication) {
            navigate("/")
        }
        setLoader(false)
    }, [isLoggedIn, navigate, authentication])
    return loader ?
        <div className="min-h-screen flex justify-center items-center">
            <h1 className="text-xl font-medium">Loading</h1>
            <div className="ml-4 animate-spin rounded-full h-12 w-12 border-t-2 border-black"></div>
        </div> : <>{children}</>
}

export default AuthLayout