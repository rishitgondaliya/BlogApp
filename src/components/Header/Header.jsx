import { Container, Logo } from '../index';
import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import conf from '../../conf/conf';

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);

  const profileImageID = userData?.prefs?.profilePicture;

  const baseURL = `https://cloud.appwrite.io/v1/storage/buckets/${conf.appwriteProfileImageBucketID}/files/`;
  const profileImageURL = profileImageID
    ? `${baseURL}${profileImageID}/view?project=${conf.appwriteProjectID}&mode=admin`
    : null;
    
  const navItems = [
    {
      name: 'SIGN IN',
      slug: '/login',
      active: !authStatus,
    },
    {
      name: 'ALL BLOGS',
      slug: '/all-blogs',
      active: authStatus,
    },
    {
      name: 'CREATE YOUR BLOG',
      slug: '/create-blog',
      active: authStatus,
    },
    {
      name: (
        profileImageURL ? (
          <img
            src={profileImageURL}
            alt="Profile"
            className="size-9 rounded-full object-cover"
          />
        ) : (
          <FontAwesomeIcon icon={faUser} className="text-xl" />
        )
      ),
      slug: '/profile',
      active: authStatus,
    },
  ];

  return (
    <header className="flex items-center shadow sticky z-50 top-0 w-full h-20 bg-[#fcd0d0]">
      <Container>
        <nav className='flex items-center'>
          <div className="mr-4 items-center">
            <Link to='/'>
              <div className="flex">
                <Logo width='70px' />
                <h2 className="text-xl ml-4 my-auto text-center" style={{fontFamily: "Pacifico"}}>Blogify</h2>
              </div>
            </Link>
          </div>
          <ul className="ml-auto flex items-center">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.slug}>
                  <NavLink
                    to={item.slug}
                    className={({ isActive }) =>
                      `inline-block text-base px-6 py-2 duration-200 hover:bg-[#ffada9] focus:outline-none rounded-full
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
  );
}

export default Header;