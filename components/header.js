import React, {useMemo} from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useUser } from '../lib/useUser'

const LINKS = [
  {
    href: '/login',
    label: 'Login'
  }, {
    href: '/artists',
    label: 'Artists'
  }, {
    href: '/profile',
    label: 'Account'
  }, {
    href: 'api/logout',
    label: 'Logout'
  }
]

const Header = () => {
  const user = useUser()
  const router = useRouter()

  const currentPage = useMemo(() => {
    console.log(router.pathname)
    const [{ label: page = '' }] = LINKS.filter(({href}) => router.pathname === href)
    return page
  }, [router.pathname])

  return (
    <header>
      <div className="p-4">
        <div className="group relative">
          <button className="w-full border border-black drop-shadow text-black px-4 h-10 flex justify-between items-center">
            <p>{currentPage}</p>
            <img
              src="/selectArrow.svg"
              alt="select arrow"
              className="justify-self-end"
            />
          </button>
          <nav
            tabIndex="0"
            className="z-50 border border-black bg-white invisible w-full absolute left-0 top-full transition-all opacity-0 group-focus-within:visible group-focus-within:opacity-100 group-focus-within:translate-y-1">
            <ul className="py-1">
              <li>
                <Link href="/artists" className="block px-4 py-2 hover:bg-gray">
                  Artists
                </Link>
              </li>
              {user ? (
                <>
                  <li>
                    <Link href="/profile" passHref className="block px-4 py-2 hover:bg-gray">
                      
                        Profile
                      
                    </Link>
                  </li>
                  <li>
                    <a
                      href="/api/logout"
                      className="block px-4 py-2 hover:bg-gray">
                      Logout
                    </a>
                  </li>
                </>
              ) : (
                <li>
                  <Link href="/login" passHref className="block px-4 py-2 hover:bg-gray">
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header
