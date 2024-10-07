import { Container, Logo, LogoutBtn } from "../index"
import { Link, useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  // const navigate = useNavigate()
  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Blogs",
      slug: "/all-blogs",
      active: authStatus,
    },
    {
      name: "Add New Blog",
      slug: "/add-blog",
      active: authStatus,
    },
  ]

  return (
    <header className="py-3 shadow-sm bg-transparent">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to='/'>
              <Logo width="80px" />
            </Link>
          </div>
          <ul className="flex space-x-4 ml-auto">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <Link to={item.slug} className="text-lg text-gray-600 hover:text-gray-300">{item.name}</Link>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header