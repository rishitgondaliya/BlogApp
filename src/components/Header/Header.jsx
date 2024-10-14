import { Container, Logo } from '../index'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)

  const navItems = [
    {
      name: 'HOME',
      slug: "/",
      active: true
    },
    {
      name: "LOGIN",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "SIGN UP",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "ALL BLOGS",
      slug: "/all-blogs",
      active: authStatus,
    },
    {
      name: "CREATE YOUR BLOG",
      slug: "/create-blog",
      active: authStatus,
    },
    {
      name: "PROFILE",
      slug: "/profile",
      active: authStatus,
    }
  ]

  return (
    <header className="flex items-center shadow sticky z-50 top-0 w-full h-20 bg-[#FCCDCD]">
      <Container>
        <nav className='flex'>
          <div className="mr-4">
            <Link to='/'>
              <div className="flex">
                <Logo width='40px' />
                <h2 className="text-xl ml-4 my-auto text-center font-mono">Blogify</h2>
              </div>
            </Link>
          </div>
          <ul className="ml-auto flex">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <NavLink
                    to={item.slug}
                    className={({ isActive }) =>
                      `inline-block text-base px-6 py-2 duration-200 hover:bg-[#f9928d] focus:outline-none rounded-full
                      ${isActive ? 'underline underline-offset-4' : ''}`
                    }
                  >
                    {item.name}
                  </NavLink>
                </li>
              ) : null
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header