"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaUser, FaBars, FaTimes, FaShoppingCart } from 'react-icons/fa';
import * as Menubar from '@radix-ui/react-menubar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { reset, setToken, setUserId } from '@/store/cartSlice';
import { useRouter } from 'next/navigation';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const cart = useSelector((state: RootState) => state.cart.items)
  const token= useSelector((state: RootState) => state.cart.token)
  const dispatch = useDispatch()

  const handleLogout = () => {
    sessionStorage.removeItem('authToken');
    sessionStorage.removeItem('userId');
    dispatch(reset())
    router.push('/');
  };

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold text-primary-default">
                PharmEasy
              </Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {token==null ? (
              <Link href="/login" className="text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                Login
              </Link>
            ) : (
              <Menubar.Root>
                <Menubar.Menu>
                  <Menubar.Trigger className="flex items-center text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium focus:outline-none">
                    <FaUser className="w-5 h-5" />
                  </Menubar.Trigger>
                  <Menubar.Content className="bg-white border border-gray-200 rounded-md shadow-lg">
                    <Menubar.Item>
                      <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                        Profile
                      </Link>
                    </Menubar.Item>
                    <Menubar.Item>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </Menubar.Item>
                  </Menubar.Content>
                </Menubar.Menu>
              </Menubar.Root>
            )}
           <Link href={token!=null ? "/cart" : "/login"} className="flex items-center text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium relative">
      <FaShoppingCart className="w-5 h-5" />
      {cart.length > 0 && (
        <span className="ml-2 bg-primary-default text-white text-xs font-semibold px-2 py-1 rounded-full absolute top-0 right-50 transform translate-x-1/2 -translate-y-1/2">
          {cart.length}
        </span>
      )}
      <span className="ml-2">Cart</span>
    </Link>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="bg-primary-default inline-flex items-center justify-center p-2 rounded-md text-white hover:text-gray-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <FaBars className="block h-6 w-6" />
              ) : (
                <FaTimes className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {token==null ? (
              <Link href="/login" className="text-gray-900 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">
                Login
              </Link>
            ) : (
              <Menubar.Root>
                <Menubar.Menu>
                  <Menubar.Trigger className="flex items-center text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium focus:outline-none">
                    <FaUser className="w-5 h-5" />
                  </Menubar.Trigger>
                  <Menubar.Content className="bg-white border border-gray-200 rounded-md shadow-lg">
                    <Menubar.Item>
                      <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                        Profile
                      </Link>
                    </Menubar.Item>
                    <Menubar.Item>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </Menubar.Item>
                  </Menubar.Content>
                </Menubar.Menu>
              </Menubar.Root>
            )}
           
            <Link href={token!=null? "/cart" : "/login"} className="flex items-center text-gray-900 hover:text-gray-700 px-3 py-2 rounded-md text-sm font-medium relative">
      <FaShoppingCart className="w-5 h-5" />
      {cart.length > 0 && (
        <span className="ml-2 bg-primary-default text-white text-xs font-semibold px-2 py-1 rounded-full absolute top-0 right-50 transform translate-x-1/2 -translate-y-1/2">
          {cart.length}
        </span>
      )}
      <span className="ml-2">Cart</span>
    </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
