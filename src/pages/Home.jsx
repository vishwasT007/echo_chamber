import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Home() {
  // If user is not logged in should be redirrected to root /
  const navigate = useNavigate();
  // we should know the status of user is logged in or not
  const [user, setUser] = useState(null);
  // We should also store the room code
  const [roomCode, setRoomCode] = useState("");

  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const locallyStoredUser = JSON.parse(localStorage.getItem("user"));
    if (!locallyStoredUser) {
      navigate("/");
    } else {
      setUser(locallyStoredUser);
    }
    setCheckingAuth(false);
  }, [navigate]); // By putting [navigate],
  // you're telling React, "If the navigate tool ever changes,
  // make the worker do their job again."

  // Create uuid
  function createMyShortUniqueID(length = 6) {
    if (typeof crypto?.randomUUID === "function") {
      return crypto.randomUUID().replace(/-/g, "").slice(0, length);
    }
    const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  }

  function handleCreateRoom() {
    const roomId = createMyShortUniqueID();
    navigate(`/room/${roomId}`);
  }

  function handleJoinRoom() {
    if (roomCode.trim() !== "") {
      navigate(`/room/${roomCode}`);
    }
  }

  function handleLogout() {
    signOut(auth)
      .then(() => {
        console.log("Signed Out Successfull");
        //clear any local storage related to user session
        localStorage.removeItem("user"); // If you store user info in local storage
        // Navigate to user to root
        navigate("/");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  }

  if (checkingAuth) {
    return <div>Loading Icon</div>;
  } else {
    return (
      <div className={styles.container}>
        <div className={styles.card}>
          <img
            src={user.photo || "default-avatar.png"}
            alt="Profile"
            className={styles.profileImage}
          />
          <h2 className={styles.welcomeText}>Welcome, {user.name || "User"}</h2>

          <button onClick={handleCreateRoom} className={styles.createButton}>
            Create Debate Room
          </button>

          <div className={styles.separator}>or</div>

          <input
            type="text"
            value={roomCode}
            onChange={(e) => setRoomCode(e.target.value)}
            placeholder="Enter Room Code"
            className={styles.roomCodeInput}
          />
          <button onClick={handleJoinRoom} className={styles.joinButton}>
            Join Room
          </button>

          <button onClick={handleLogout} className={styles.logoutButton}>
            Logout
          </button>
        </div>
      </div>
    );
  }
}

export default Home;
