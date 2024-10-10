import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthLayout, Profile } from '../src/components'
import { Login as LoginComponent } from '../src/components'
import { Signup as SignupComponent } from '../src/components'
import { HomePage, AddBlog, AllBlogs, BlogPage, EditBlog } from '../src/pages'
import store from './store/store.js'
import App from './App.jsx'
import './index.css'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      children: [
        {
          path: '/home',
          element: <HomePage />
        },
        {
          path: '/login',
          element: (
            <AuthLayout authentication={false}>
              <LoginComponent />
            </AuthLayout>
          )
        },
        {
          path: '/signup',
          element: (
            <AuthLayout authentication={false}>
              <SignupComponent />
            </AuthLayout>
          )
        },
        {
          path: '/all-blogs',
          element: (
            <AuthLayout authentication>
              <AllBlogs />
            </AuthLayout>
          )
        },
        {
          path: '/create-blog',
          element: (
            <AuthLayout authentication>
              <AddBlog />
            </AuthLayout>
          )
        },
        {
          path: "/edit-post/:slug",
          element: (
            <AuthLayout authentication>
              {" "}
              <EditBlog />
            </AuthLayout>
          ),
        },
        {
          path: "/profile",
          element: (
            <AuthLayout authentication>
              {" "}
              <Profile />
            </AuthLayout>
          )
        },
        {
          path: "/blog/:slug",
          element: (
            <AuthLayout>
              <BlogPage />
            </AuthLayout>
          )
        }
      ]
    }
  ]
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
