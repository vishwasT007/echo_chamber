import { useNavigate } from "react-router-dom";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";
import styles from "./Login.module.css";

function Login() {
  const navigate = useNavigate();
  async function handleLogin() {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // I will save that user to Local Storage or Context
      localStorage.setItem(
        "user",
        JSON.stringify({
          name: user.displayName,
          email: user.email,
          photo: user.photoUrl,
          uid: user.uid,
        })
      );
      navigate("/home"); // Redirect after login
    } catch (error) {
      console.log("Login Failed", error);
    }
  }
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Welcome to EchoChamber</h1>
        <button className={styles.button} onClick={handleLogin}>
          Sign in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
