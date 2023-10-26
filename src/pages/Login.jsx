import { React, useState, useContext } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Context, Server } from "../main";
import { Navigate, Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isAuthenticated, setIsAuthenticated, setLoading, loading } =
    useContext(Context);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        `http://localhost:4000/api/v1/user/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "content-type": "application/json",
          },
          withCredentials: true,
        }
      );
      toast.success(data.message);
      setIsAuthenticated(true);
      setLoading(false);
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(error.response.data.message);
      setIsAuthenticated(false);
      setLoading(false);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }
  return (
    <>
      <div className="login">
        <section>
          <form onSubmit={submitHandler}>
            <input
              type="email"
              placeholder="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button disabled={loading} type="submit">
              Login
            </button>
            <h4>Or</h4>
            <Link to={"/register"}>Sign Up</Link>
          </form>
        </section>
      </div>
    </>
  );
};

export default Login;
