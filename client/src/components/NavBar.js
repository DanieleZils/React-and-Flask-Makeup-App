import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({user, setUser}) => {

    function handleLogoutClick() {
        fetch("/logout", { method: "DELETE" }).then((r) => {
            if (r.ok) {
              setUser(null);
            }
          });
    }

  return (
    <nav>
        <div>
        <Link to="/">Home</Link>
        </div>
        <div>
        {user ? (
            <>
            <span> Welcome, {user.username}! </span>
            <button onClick={handleLogoutClick}>Logout</button>
            </>
        ) : (
            <>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
            </>
        )}
        </div>
  </nav>
  );
};

export default Navbar;