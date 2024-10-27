import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { login, logout } from './store/authSlice'
import { Header, Footer } from './components'
import authService from './appwrite/authentication'
import './App.css'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout())
        }
      })
      .finally(() => setLoading(false))
  }, [dispatch])

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-blue-200"
      style={{ backgroundImage: 'linear-gradient(to right, #9aabff, #48e4dc)' }}>
      <div className="w-full block">
        <Header />
        <main className='p-0'>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) :
    <div className="min-h-screen flex justify-center items-center">
      <h1 className="text-xl font-medium">Loading...</h1>
      <div className="ml-4 animate-spin rounded-full h-8 w-8 border-t-2 border-black"></div>
    </div>
}

export default App 
