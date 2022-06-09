import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { signInWithGoogle, signOut } from "../firebaseConfig";
import "./Header.css";
import GCSO from "../assets/gc-so.gif";

const Header = () => {
  const { user } = useContext(AuthContext);

  return (
    <header className="Header">
      {/* <pre>{JSON.stringify(user, null, 2)}</pre> */}
      {user ? (
        <div className="sign-out">
          <p>{user.displayName}</p>
          <img src={user.photoURL!} alt="" />
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <button className="sign-in" onClick={signInWithGoogle}>
          Sign In with Google
        </button>
      )}
      <h1>
        <Link to="/">
          <img src={GCSO} alt="" className="gc-so" />
        </Link>
      </h1>
      <p>
        <Link to="/me">See my shout outs!</Link>
      </p>
    </header>
  );
};

export default Header;
