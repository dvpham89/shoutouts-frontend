import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { signInWithGoogle } from "../firebaseConfig";
import ShoutOut, { User } from "../models/ShoutOut";
import {
  deleteShoutOut,
  getAllShoutOuts,
  postNewShoutOut,
  upvoteShoutout,
} from "../services/shoutOutService";
import "./Main.css";
import ShoutOutComponent from "./ShoutOut";
import ShoutOutForm from "./ShoutOutForm";
import TopFive from "./TopFive";

const Main = () => {
  const { user } = useContext(AuthContext);

  const [shoutOuts, setShoutOuts] = useState<ShoutOut[]>();
  useEffect(() => {
    getAllShoutOuts().then((res) => {
      setShoutOuts(res);
    });
  }, []);

  const addShoutOut = (so: ShoutOut): void => {
    postNewShoutOut(so).then(() => {
      getAllShoutOuts().then((response) => setShoutOuts(response));
    });
  };

  const deleteHandler = (id: string): void => {
    deleteShoutOut(id).then(() => {
      getAllShoutOuts().then((response) => setShoutOuts(response));
    });
  };

  const upvoteHandler = (user: User, id: string): void => {
    upvoteShoutout(user, id).then(() => {
      getAllShoutOuts().then((res) => setShoutOuts(res));
    });
  };

  return (
    <div className="Main">
      <TopFive />
      <h2>All Shout Outs</h2>
      <ul>
        {shoutOuts?.map((item) => (
          <ShoutOutComponent
            key={item._id}
            shoutOut={item}
            deleteHandler={deleteHandler}
            upvoteHandler={upvoteHandler}
          />
        ))}
      </ul>
      {user ? (
        <ShoutOutForm addShoutOut={addShoutOut} toUser="" />
      ) : (
        <>
          <p>Sign in to leave a shoutout</p>
          <button className="sign-in" onClick={signInWithGoogle}>
            Sign In with Google
          </button>
        </>
      )}
    </div>
  );
};

export default Main;
