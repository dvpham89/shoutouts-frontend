import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ShoutOutModel, { User } from "../models/ShoutOut";
import ListOfLikes from "./ListofLikes";
import "./ShoutOut.css";

interface Props {
  shoutOut: ShoutOutModel;
  deleteHandler: (id: string) => void;
  upvoteHandler: (user: User, id: string) => void;
  downvoteHandler: (user: User, id: string) => void;
}

const ShoutOut = ({
  shoutOut,
  deleteHandler,
  upvoteHandler,
  downvoteHandler,
}: Props) => {
  const { user } = useContext(AuthContext);
  const didUserLike = (): boolean => {
    if (shoutOut.likes && user?.uid) {
      return shoutOut.likes.some((so) => so.uid === user.uid);
    } else {
      return false;
    }
  };

  return (
    <li className="ShoutOut">
      <button
        className="delete-btn"
        onClick={() => deleteHandler(shoutOut?._id!)}
      >
        x
      </button>
      <p className="to-container">
        Shout out to <Link to={`/user/${shoutOut.to}`}>{shoutOut.to}</Link>
      </p>
      <div className="from-container">
        <p>- from </p>
        {shoutOut.photoURL && (
          <img
            src={shoutOut.photoURL}
            alt={shoutOut.from}
            className="from-img"
          />
        )}
        <p> {shoutOut.from}</p>
      </div>
      <p>{shoutOut.text}</p>
      {shoutOut.image && (
        <img src={shoutOut.image} alt={shoutOut.text} className="so-img" />
      )}
      {user ? (
        <div className="votes-container">
          {didUserLike() ? (
            <button
              onClick={() =>
                downvoteHandler(
                  {
                    displayName: user.displayName || "anonymous",
                    uid: user.uid,
                  },
                  shoutOut._id!
                )
              }
            >
              downvote
            </button>
          ) : (
            <button
              onClick={() =>
                upvoteHandler(
                  {
                    displayName: user.displayName || "anonymous",
                    uid: user.uid,
                  },
                  shoutOut._id!
                )
              }
            >
              upvote
            </button>
          )}
          <p className="likes-paragraph">
            {shoutOut.likes ? shoutOut.likes.length : "0"} likes
          </p>
          <ListOfLikes likes={shoutOut.likes} />
          <button
            onClick={() =>
              upvoteHandler(
                { displayName: user.displayName || "anonymous", uid: user.uid },
                shoutOut._id!
              )
            }
          >
            upvote
          </button>
        </div>
      ) : (
        <div>
          <p className="likes-paragraph">
            {shoutOut.likes ? shoutOut.likes.length : "0"} likes
          </p>
          <ListOfLikes likes={shoutOut.likes} />
          <p>Please log in to upvote / downvote</p>
        </div>
      )}
    </li>
  );
};

export default ShoutOut;
