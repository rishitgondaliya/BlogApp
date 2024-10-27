import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login as authLogin } from '../../store/authSlice'
import { Button, Input, Logo } from '../index'
import authService from '../../appwrite/authentication'

function Signup() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit } = useForm()
    const [error, setError] = useState("")

    const createAccount = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData) {
                const userData = await authService.getCurrentUser()
                if (userData) dispatch(authLogin(userData))
                navigate("/all-blogs")
            }
        } catch (error) {
            setError(error.message)
        }
    }
    return (
        <div className="flex items-center justify-center">
            <div className={`mx-auto w-full max-w-lg bg-[#d1d0fc] rounded-xl p-10 border border-black/10`}
            // style={{background: 'linear-gradient(to right, #2193b0, #E684AE)'}}
            >
                {/* #ff6e7f #bfe9ff */}
                <div className="mb-2 flex justify-center">
                    <span className="inline-block w-full max-w-[120px]">
                        <Logo width="100%" />
                    </span>
                </div>
                <h2 className="text-center text-xl font-semibold leading-tight">Sign up to create a <span className='font-light' style={{fontFamily: "Pacifico"}}>Blogify</span> account</h2>
                <p className="mt-2 text-center text-base text-black/60">
                    Already have an account?&nbsp;
                    <Link
                        to="/login"
                        className="font-medium text-blue-600 transition-all duration-200 hover:underline underline-offset-2"
                    >
                        Sign In
                    </Link>
                </p>
                {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
                
                <form onSubmit={handleSubmit(createAccount)} className='mt-4'>
                    <div className='space-y-2'>
                        <Input
                            label="Full Name "
                            placeholder="Enter your full name"
                            {...register("name", {
                                required: true,
                            })}
                        />
                        <Input
                            label="Email "
                            placeholder="Enter your email"
                            type="email"
                            {...register("email", {
                                required: true,
                                validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })}
                        />
                        <Input
                            label="Password "
                            type="password"
                            placeholder="Enter your password"
                            {...register("password", {
                                required: true,
                            })}
                        />
                        <div className="flex justify-center pt-4">
                            <Button
                                type="submit"
                                size="large"
                                paddingX={2}
                                paddingY={1}
                                fontSize='1rem'
                                bgColor='#b1b1fa'
                            >
                                CREATE ACCOUNT
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Signup