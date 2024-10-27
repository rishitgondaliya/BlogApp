import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthLayout } from '../src/components'
import { LoginPage as LoginComponent } from '../src/pages'
import { HomePage, AddBlog, AllBlogs, BlogPage, EditBlog, SignupPage, Profile } from '../src/pages'
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
          path: '/',
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
              <SignupPage />
            </AuthLayout>
          )
        },
        {
          path: '/all-blogs',
          element: (
            <AuthLayout authentication>
              {" "}
              <AllBlogs />
            </AuthLayout>
          )
        },
        {
          path: '/create-blog',
          element: (
            <AuthLayout authentication>
              {" "}
              <AddBlog />
            </AuthLayout>
          )
        },
        {
          path: "/edit-blog/:id",
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
          path: "/blog/:id",
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
