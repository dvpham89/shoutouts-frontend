import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  deleteShoutOut,
  getAllShoutOutsToUser,
  postNewShoutOut,
  upvoteShoutout,
} from "../services/shoutOutService";
import "./ToUserRoute.css";
import ShoutOutListItem from "./ShoutOut";
import ShoutOut, { User } from "../models/ShoutOut";
import ShoutOutForm from "./ShoutOutForm";
import AuthContext from "../context/AuthContext";

const ToUserRoute = () => {
  const { user } = useContext(AuthContext);
  const to: string = useParams().to!;
  const [usersShoutOuts, setUsersShoutOuts] = useState<ShoutOut[]>();

  useEffect(() => {
    getAllShoutOutsToUser(to).then((res) => {
      setUsersShoutOuts(res);
    });
  }, [to]);

  const addShoutOut = (so: ShoutOut): void => {
    postNewShoutOut(so).then(() => {
      getAllShoutOutsToUser(to).then((res) => {
        setUsersShoutOuts(res);
      });
    });
  };

  const deleteHandler = (id: string): void => {
    deleteShoutOut(id).then(() => {
      getAllShoutOutsToUser(to).then((res) => {
        setUsersShoutOuts(res);
      });
    });
  };

  const upvoteHandler = (user: User, id: string): void => {
    upvoteShoutout(user, id).then(() => {
      getAllShoutOutsToUser(to).then((res) => {
        setUsersShoutOuts(res);
      });
    });
  };

  return (
    <div className="ToUserRoute">
      <h2>All ShoutOuts to: {to}</h2>
      <ul>
        {usersShoutOuts?.map((item) => (
          <ShoutOutListItem
            key={item._id}
            shoutOut={item}
            deleteHandler={deleteHandler}
            upvoteHandler={upvoteHandler}
          />
        ))}
      </ul>
      {user ? (
        <ShoutOutForm addShoutOut={addShoutOut} toUser={to} />
      ) : (
        <p>Please sign in to add a shoutout</p>
      )}
    </div>
  );
};

export default ToUserRoute;
