import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash, faUser } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import styles from "../styles/Post.module.css";
import { useDispatch } from "react-redux";
import { displayTweet, removeTweet } from "../reducers/tweets";

function Post(props) {
  const [newtweet, setNewtweet] = useState("");

  const dispatch = useDispatch();

  const handledisplayTweet = () => {
    dispatch(displayTweet(props));
  };

  return (
    <div className={styles.container}>
      <input
        onChange={(e) => setNewtweet(e.target.value)}
        value={newtweet}
        className={styles.inputTweet}
        type="text"
        placeholder="What's Up"
      ></input>
      <div className={styles.secondline}>
        <button
          onClick={() => handledisplayTweet()}
          className={styles.tweetBtn}
        >
          TWEET
        </button>
        <span className={styles.countWord}>{newtweet.length}/280</span>
      </div>
    </div>
  );
}

export default Post;
