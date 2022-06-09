import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import ShoutOutModel, { User } from "../models/ShoutOut";
import "./ShoutOut.css";

interface Props {
  shoutOut: ShoutOutModel;
  deleteHandler: (id: string) => void;
  upvoteHandler: (user: User, id: string) => void;
}

const ShoutOut = ({ shoutOut, deleteHandler, upvoteHandler }: Props) => {
  const { user } = useContext(AuthContext);
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
          <button>downvote</button>
          <p>{shoutOut.likes ? shoutOut.likes.length : "0"} likes</p>
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
          <p>{shoutOut.likes ? shoutOut.likes.length : "0"} likes</p>
          <p>Please log in to upvote / downvote</p>
        </div>
      )}
    </li>
  );
};

export default ShoutOut;
