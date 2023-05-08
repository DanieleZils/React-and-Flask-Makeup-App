import React, {useContext} from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import logo from '../assets/logoblack.png';
import {AiOutlineShoppingCart} from 'react-icons/ai';


const categories = [
  { name: "Face", path: "/face" },
  { name: "Lip", path: "/lip" },
  { name: "Eye", path: "/eye" },
  { name: "Products", path: "/products" },
];

const Navbar = () => {

  const { user, setUser } = useContext(UserContext);

  function handleLogoutClick() {
      fetch("/logout", { method: "DELETE" }).then(() => {
        setUser(null);
        localStorage.removeItem("user"); // Remove user from localStorage
      });
  }

  // w-full h-30 bg-white border-b-[1px] border-b-gray-800"
  return (
   <div className='glassy-bg'>
    <nav className="w-full h-50 ">
      <div className="h-full flex items-center justify-between px-8">
        <div className="mx-4 w-52 ">
          <Link to="/">
            <img src={logo} alt="logo"  />
          </Link>
        </div>
        <ul className="flex items-center gap-8">
          <li>
            <Link
              to="/"
              className="text-xl text-black font-bold hover:text-red-900 cursor-pointer duration-300 py-7 px-3 inline-block"
            >
              Home
            </Link>
          </li>
          <li className="relative group">
            <Link
              to="/products"
              className="text-xl text-black font-bold hover:text-red-900 cursor-pointer duration-300"
            >
              Products
            </Link>
            <div className="absolute left-0 mt-2 space-y-2 text-black text-xl my-auto rounded-md p-3 hidden bg-opacity-90 z-10">
              {categories.map((category) => (
              <div className="hover:text-red-900" key={category.name}>
                <Link to={category.path}>
                    {category.name}
                </Link>
              </div>
                ))}
            </div>
          </li>
          {user ? (
            <>
              <li>
                <span className='text-xl'>Welcome, {user.username}!</span>
              </li>
              <li>
                <button onClick={handleLogoutClick}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="relative group">
                <Link
                  to="/login"
                  className="text-xl text-black font-bold hover:text-red-900 cursor-pointer duration-300"
                >
                  Login
                </Link>
                <div className="absolute left-0 mt-2 space-y-2 text-black text-xl my-auto rounded-md p-3 hidden group-hover:block bg-opacity-90">
                  <Link to="/signup">Signup</Link>
                </div>
              </li>
            </>
          )}
          <li className="relative group">
            <Link to="/cart" className="mx-4">
              <AiOutlineShoppingCart className='text-2xl'/>
            </Link>
            {user && (
              <div className="absolute left-0 mt-2 space-y-2 bg-white text-black border border-gray-200 rounded-md p-2 hidden group-hover:block">
                <Link to="/past-orders">Order History</Link>
              </div>
            )}
          </li>
        </ul>
      </div>
    </nav>
  </div>
  );
};

export default Navbar;