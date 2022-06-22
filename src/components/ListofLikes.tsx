import { User } from "../models/ShoutOut";
import "./ListOfLikes.css";

interface Props {
  likes: User[] | undefined;
}

const ListOfLikes = ({ likes }: Props) => {
  return (
    <ul className="ListOfLikes">
      {likes ? (
        likes.map((like) => (
          <li>
            <p>{like.displayName}</p>
          </li>
        ))
      ) : (
        <li>
          <p>{`No Likes :-(`}</p>
        </li>
      )}
    </ul>
  );
};

export default ListOfLikes;
