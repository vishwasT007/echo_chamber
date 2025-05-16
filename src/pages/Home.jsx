import { useEffect } from "react";
import styles from "./Home.module.css";

function Home() {
  useEffect(() => {
    const locallyStoredUser = JSON.parse(localStorage.getItem("user"));
    if (!locallyStoredUser) {
    }
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <img src={user.photo} alt="Profile" className={styles.profileImage} />
        <h2 className={styles.welcomeText}>Welcome, {user.name}</h2>

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

export default Home;
