import { useState, useContext } from 'react'
import { UserContext } from '../lib/userContext'
import { useRouter } from 'next/router'
import { Transition } from '@headlessui/react'

const Layout = (props) => {
  const {children, toggleModal} = props
  const { logOut } = useContext(UserContext)
  const router = useRouter()
  const [IsProfileOpen, setIsProfileOpen] = useState(false)
  const [IsMenuOn, setIsMenuOn] = useState(false)

  return(
    <div>
      <nav className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
              <img onClick={() => router.pathname !== '/' && router.push('/')} className="cursor-pointer h-8 w-auto" src="/wf.svg" alt="Workflow logo"/>
              </div>
              <div className="block">
                { props.uid &&
                  <div className="ml-3 flex items-baseline">
                    <p onClick={() => {router.pathname !== '/tus_eventos' && router.push('/tus_eventos')}} className={`${router.pathname === '/tus_eventos' ? 'text-indigo-400' : 'text-gray-400 '} cursor-pointer px-3 py-1 rounded-md text-sm font-semibold focus:outline-none`}>Tus Eventos</p>
                    <p onClick={() => {router.pathname !== '/favoritos'   && router.push('/favoritos')}}  className={`${router.pathname === '/favoritos' ? 'text-indigo-400' : 'text-gray-400 '} cursor-pointer px-3 py-1 rounded-md text-sm font-semibold focus:outline-none`}>Favoritos</p>
                  </div>
                }
              </div>
            </div>
            <div className="hidden md:block">
              { props.uid && 
                <div className="ml-4 flex items-center md:ml-6">
                  <button className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-indigo-400 focus:outline-none focus:text-indigo-400 focus:bg-gray-700" aria-label="Notifications">
                    <svg className="h-7 w-7" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </button>
                  <div className="ml-3 relative">
                    <div>
                      <button onClick={() => setIsProfileOpen(!IsProfileOpen)}  className="max-w-xs flex hover:text-indigo-400 items-center text-sm rounded-full text-gray-400 focus:outline-none focus:text-indigo-400 " id="user-menu" aria-label="User menu" aria-haspopup="true">
                        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      </button>
                    </div>
                    <Transition show={IsProfileOpen} enter="transition ease-out duration-100" enterFrom="transform opacity-0 scale-95" enterTo="transform opacity-100 scale-100" leave="transition ease-in duration-75" leaveFrom="transform opacity-100 scale-100" leaveTo="transform opacity-0 scale-95">
                      {(ref) => (
                        <div ref={ref} className="fixed z-10 origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg">
                          <div className="py-1 rounded-md bg-white shadow-xs" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                            <div className="flex items-center block px-4 py-2 text-sm">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm leading-5 font-medium text-gray-900">Diego</div>
                                <div className="text-sm leading-5 text-gray-400">Oakland</div>
                              </div>
                            </div>
                            <p onClick={() => router.push('/profile')} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Preferencias</p>
                            <p onClick={() => logOut()}  className="cursor-pointer block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">Salir</p>
                          </div>
                        </div>
                      )}
                    </Transition>
                  </div>
                </div>
              }
            </div>
            {!props.uid &&
                <div className="md:flex items-center justify-end space-x-8 md:flex-1 lg:w-0">
                  <span className="inline-flex rounded-md shadow-sm">
                    <p onClick={() => {toggleModal()}} className="cursor-pointer whitespace-no-wrap inline-flex items-center justify-center px-3 py-1 border border-transparent text-sm leading-6 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition ease-in-out duration-150">
                      Ingresar
                    </p>
                  </span>
                </div>
              }
            { props.uid &&
              <div className="mr-2 flex md:hidden">
                <button onClick={() => setIsMenuOn(!IsMenuOn)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white">
                  <svg className={`${IsMenuOn ? 'hidden' : 'block'} h-6 w-6`} stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                  <svg className={`${!IsMenuOn ? 'hidden' : 'block'} h-6 w-6`} stroke="currentColor" fill="none" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            }
          </div>
        </div>
        { props.uid &&
          <div className={`${!IsMenuOn ? 'hidden' : 'block'} md:hidden` }>
            <div className="pt-4 pb-3 border-t border-gray-700">
              <div className="flex items-center px-5 space-x-3">
                <div className="flex-shrink-0">
                  <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </div>
                <div className="space-y-1">
                  <div className="text-base font-medium leading-none text-white">Diego</div>
                  <div className="text-sm font-medium leading-none text-gray-400">Oakland</div>
                </div>
              </div>
              <div className="mt-3 px-2 space-y-1">
                <p onClick={() => router.push('/profile')} href="#" className="cursor-pointer block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Preferencias</p>
                <p href="#"  onClick={() => logOut()} className="cursor-pointer block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Salir</p>
              </div>
            </div>
          </div>
        }
      </nav>
      <main>
      {children && children}
      </main>
    </div>
  )
}
export default Layout