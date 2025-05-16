import { useNavigate, useParams } from "react-router-dom";
import styles from "./DebateRoom.module.css";
import { useEffect, useState } from "react";
function DebateRoom() {
  const { roomId } = useParams();
  const navigate = useNavigate();
  const [opponentJoined, setOpponentJoined] = useState(false);
  const [user, setUser] = useState(null);
  const [micOn, setMicOn] = useState(false);
  const [camOn, setCamOn] = useState(false);

  useEffect(() => {
    const locallyStoredUser = JSON.parse(localStorage.getItem("user"));
    if (!locallyStoredUser) {
      navigate("/");
    } else {
      setUser(locallyStoredUser);
    }

    //Todo Will setup socket connection later
    // let me fake some delay that opponent is joined
    const timer = setTimeout(() => {
      setOpponentJoined(true);
    }, 300);
    return () => clearTimeout(timer);
  }, [navigate]);

  function toggleMicOnOff() {
    setMicOn((previousState) => !previousState);
  }

  function toggleCamOnOff() {
    setCamOn((previousState) => !previousState);
  }
  return (
    <div className={styles.debateRoomContainer}>
      <div className={styles.header}>
        <h2 className={styles.roomCode}>
          Room Code: <span className={styles.roomCodeSpace}>{roomId}</span>
        </h2>
        <button
          onClick={() => navigate("/home")}
          className={styles.leaveButton}
        >
          Leave Room
        </button>
      </div>

      {!opponentJoined ? (
        <div className={styles.waitingMessage}>
          Waiting for opponent to join...
        </div>
      ) : (
        <div className={styles.debateContent}>
          <div className={styles.videoSection}>
            <div className={styles.videoBox}>
              <p className={styles.videoTitle}>{user?.name} (You)</p>
              {camOn ? (
                <Webcam audio={micOn} className={styles.webcamContainer} />
              ) : (
                <div className={styles.cameraOffPlaceholder}>Camera Off</div>
              )}
            </div>

            <div className={styles.videoBox}>
              <p className={styles.videoTitle}>Opponent</p>
              <div className={styles.cameraOffPlaceholder}>
                Waiting for video...
              </div>
            </div>
          </div>

          <div className={styles.controlsChatSection}>
            <h3 className={styles.controlsTitle}>Controls</h3>
            <div className={styles.controlsButtons}>
              <button
                onClick={toggleMicOnOff}
                className={`${styles.controlButton} ${
                  micOn ? styles.micOn : styles.micOff
                }`}
              >
                {micOn ? "Mute" : "Unmute"}
              </button>
              <button
                onClick={toggleCamOnOff}
                className={`${styles.controlButton} ${
                  camOn ? styles.camOn : styles.camOff
                }`}
              >
                {camOn ? "Camera Off" : "Camera On"}
              </button>
            </div>

            <div className={styles.comingSoon}>
              💬 Audience Chat & Poll Coming Soon...
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DebateRoom;
