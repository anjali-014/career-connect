import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserLayout from "@/layout/UserLayout";
import { useRouter } from "next/router";
import styles from "./style.module.css";
import { registerUser, loginUser } from "@/config/redux/action/authAction";
import { emptyMessage } from "@/config/redux/reducer/authReducer/index";

function Login() {
  const authState = useSelector((state) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();

  // false = Sign Up mode, true = Sign In mode
  const [userLoginMethod, setUserloginMethod] = useState(false);

  const [email, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    if (authState.loggedIn) {
      router.push("/dashboard");
    }
  }, [authState.loggedIn, router]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      router.push("/dashboard");
    }
  }, []);

  useEffect(() => {
    dispatch(emptyMessage())
  }, [userLoginMethod]);


  const handleRegister = () => {
    console.log("Registering user...");
    dispatch(registerUser({ name, email, password, username }));
  };

  const handleLogin = () => {
    console.log("Logging in user...");
    dispatch(loginUser({ email, password }));
  };

  return (
    <UserLayout>
      <div className={styles.container}>
        <div className={styles.cardContainer}>
          <div className={styles.cardContainer_left}>

            {/* Single heading — toggles between Sign In / Sign Up */}
            <p className={styles.cardLeft_heading}>
              {userLoginMethod ? "Sign In" : "Sign Up"}
            </p>

            {/* Status message */}
            {authState.message && (
              <p style={{ color: authState.isError ? "red" : "green", textAlign: "center", marginBottom: "0.5rem" }}>
                {typeof authState.message === "object"
                  ? authState.message.message
                  : authState.message}
              </p>
            )}

            <div className={styles.inputContainer}>

              {/* Sign Up only fields */}
              {!userLoginMethod && (
                <div className={styles.inputRow}>
                  <input
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="Username"
                    className={styles.inputField}
                    value={username}
                  />
                  <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    placeholder="Full Name"
                    className={styles.inputField}
                    value={name}
                  />
                </div>
              )}

              <input
                onChange={(e) => setEmailAddress(e.target.value)}
                type="email"
                placeholder="Email"
                className={styles.inputField}
                value={email}
              />

              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                placeholder="Password"
                className={styles.inputField}
                value={password}
              />

              {/* Submit button */}
              <div
                onClick={() => {
                  if (!authState.isLoading) {
                    userLoginMethod ? handleLogin() : handleRegister();
                  }
                }}
                className={styles.buttonWithOutline}
                style={{ opacity: authState.isLoading ? 0.6 : 1, cursor: authState.isLoading ? "not-allowed" : "pointer" }}
              >
                <p>
                  {authState.isLoading
                    ? "Please wait..."
                    : userLoginMethod
                    ? "Sign In"
                    : "Sign Up"}
                </p>
              </div>

              {/* Toggle between Sign In and Sign Up */}
              <p
                onClick={() => setUserloginMethod(!userLoginMethod)}
                style={{ marginTop: "1rem", cursor: "pointer", color: "#0a66c2", textAlign: "center", fontSize: "0.9rem" }}
              >
                {userLoginMethod
                  ? "Don't have an account? Sign Up"
                  : "Already have an account? Sign In"}
              </p>

            </div>
          </div>

          <div className={styles.cardContainer_right}>
            <div>
              {userLoginMethod ? (
                <p>Don't have an account?</p>
              ) : (
                <p>Already Have an Account?</p>
              )}
             
             <div onClick={() => {
                 setUserloginMethod(!userLoginMethod);
                }}
                className={styles.buttonWithOutline}
                style={{ color: "black", margin: "1rem 0", opacity: authState.isLoading ? 0.6 : 1, cursor: authState.isLoading ? "not-allowed" : "pointer" }}>
                  <p>
                  {authState.isLoading
                    ? "Please wait..."
                    : userLoginMethod
                    ? "Sign Up"
                    : "Sign In"}
                </p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
}

export default Login;
