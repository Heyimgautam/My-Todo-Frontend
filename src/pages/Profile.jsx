import React, { useContext } from "react";
import { Context } from "../main";
import Loader from "../components/Loader";
const profile = () => {
  const { user, loading } = useContext(Context);
  return loading ? (
    <Loader />
  ) : (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );

  // <>
  // <h1>{user.name}</h1>
  // <p>{user.email}</p>
  // </>
};

export default profile;
