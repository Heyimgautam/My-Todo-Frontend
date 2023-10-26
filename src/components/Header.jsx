import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context, Server } from "../main";
import toast from "react-hot-toast";
import axios from "axios";

const Header = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);
  const logoutHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.get(`http://localhost:4000/api/v1/user/logout`, {
        withCredentials: true,
      });
      toast.success("Logged out successfully! Come back soon");
      setIsAuthenticated(false);
      setLoading(false);
    } catch (error) {
      toast.error(error.response.data.error);
      setIsAuthenticated(true);
      setLoading(false);
    }
  };
  //if(!isAuthenticated) return (<Navigate to={'/login'}/>)
  return (
    <>
      <nav className="header">
        <div>
          <h2>My Todo App</h2>
        </div>
        <article>
          <Link to={"/"}>Home</Link>

          <Link to={"/profile"}>Profile</Link>
          <Link to={"/register"}>Sign Up</Link>

          {isAuthenticated ? (
            <button disabled={loading} onClick={logoutHandler} className="btn">
              Logout
            </button>
          ) : (
            <Link to={"/login"}>Login</Link>
          )}
        </article>
      </nav>
    </>
  );
};

export default Header;
