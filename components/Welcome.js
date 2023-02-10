import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, logout } from "../reducers/user";
import styles from "../styles/Header.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faXmark } from "@fortawesome/free-solid-svg-icons";
import Moment from "react-moment";
import { Modal } from "antd";
import Link from "next/link";

function Welcome() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [date, setDate] = useState("2050-11-22T23:59:59");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [signUpUsername, setSignUpUsername] = useState("");
  const [signUpForname, setSignUpForname] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signInUsername, setSignInUsername] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInForname, setSignInForname] = useState("");

  useEffect(() => {
    setDate(new Date());
  }, []);

  const handleRegister = () => {
    fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signUpUsername,
        forname: signUpForname,
        password: signUpPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({
              username: signUpUsername,
              forname: signUpForname,
              token: data.token,
            })
          );
          setSignUpUsername("");
          setSignUpForname("");
          setSignUpPassword("");
          setIsModalVisible(false);
          setIsModalVisible2(false);
          window.location.replace("/content");
        }
      });
  };

  const handleConnection = () => {
    fetch("http://localhost:3000/users/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: signInUsername,
        forname: signInForname,
        password: signInPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(
            login({
              username: signInUsername,
              forname: signInForname,
              token: data.token,
            })
          );
          setSignInUsername("");
          setSignInForname("");
          setSignInPassword("");
          setIsModalVisible(false);
          setIsModalVisible2(false);
          window.location.replace("/content");
        }
      });
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(removeAllBookmark());
  };

  const showModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const showModal2 = () => {
    setIsModalVisible2(!isModalVisible2);
  };

  const modalContent = (
    <div className={styles.registerContainer}>
      <div className={styles.registerSection}>
        <FontAwesomeIcon
          icon={faXmark}
          onClick={() => showModal()}
          className={styles.userSection}
        />
        <p>Sign-up</p>
        <input
          type="text"
          placeholder="Username"
          id="signUpUsername"
          onChange={(e) => setSignUpUsername(e.target.value)}
          value={signUpUsername}
        />
        <input
          type="text"
          placeholder="Forname"
          id="signUpForname"
          onChange={(e) => setSignUpForname(e.target.value)}
          value={signUpForname}
        />
        <input
          type="password"
          placeholder="Password"
          id="signUpPassword"
          onChange={(e) => setSignUpPassword(e.target.value)}
          value={signUpPassword}
        />
        <button id="register" onClick={() => handleRegister()}>
          Register
        </button>
      </div>
    </div>
  );

  const modalContent2 = (
    <div className={styles.registerContainer}>
      <div className={styles.registerSection}>
        <FontAwesomeIcon
          icon={faXmark}
          onClick={() => showModal2()}
          className={styles.userSection}
        />
        <p>Sign-in</p>
        <input
          type="text"
          placeholder="Username"
          id="signInUsername"
          onChange={(e) => setSignInUsername(e.target.value)}
          value={signInUsername}
        />
        <input
          type="text"
          placeholder="Forname"
          id="signInForname"
          onChange={(e) => setSignInForname(e.target.value)}
          value={signInForname}
        />
        <input
          type="password"
          placeholder="Password"
          id="signInPassword"
          onChange={(e) => setSignInPassword(e.target.value)}
          value={signInPassword}
        />
        <button id="connection" onClick={() => handleConnection()}>
          Connect
        </button>
      </div>
    </div>
  );

  return (
    <div className={styles.accueil}>
      <div className={styles.blocleft}></div>
      <div className={styles.blocright}>
        <div className={styles.blocwelcome}>
          <FontAwesomeIcon icon={faUser} className={styles.userSection} />
          <h1>See what's happening</h1>
          <h2>Join Hackatweet today.</h2>
          <div className={styles.btsignup} onClick={() => showModal()}>
            Sign up
          </div>

          <p>Already have an account?</p>
          <div className={styles.btsignin} onClick={() => showModal2()}>
            Sign in
          </div>
        </div>
      </div>

      {isModalVisible && (
        <div id="react-modals" className={styles.reactModal}>
          <Modal
            getContainer="#react-modals"
            className={styles.modal}
            visible={isModalVisible}
            closable={false}
            footer={null}
          >
            {modalContent}
          </Modal>
        </div>
      )}
      {isModalVisible2 && (
        <div id="react-modals" className={styles.reactModal}>
          <Modal
            getContainer="#react-modals"
            className={styles.modal}
            visible={isModalVisible2}
            closable={false}
            footer={null}
          >
            {modalContent2}
          </Modal>
        </div>
      )}
    </div>
  );
}

export default Welcome;
