import React , { useEffect } from "react";
import { useSelector } from "react-redux";
import UserLayout from "@/layout/UserLayout";
import { useRouter } from "next/router";
import styles from "./style.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";


function Login() {

  const authState = useSelector((state) => state.auth);

  const router = useRouter();

  const dispatch = useDispatch();

  const [userLoginMethod, setUserloginMethod] = useState(false);

  // const [email, setEmailAddress] = useState("");
  // const [password, setPassword] = useState("");
  // const [username, setUsername] = useState("");
  // const [name, setName] = useState("");

  useEffect(() => {
    if (authState.loggedIn) {
      router.push("/dashboard");
    }
  }, [authState.loggedIn, router]);

  const handleRegister = () => {
     console.log("Registering user...");
     dispatch(loginUser({}));
  }

  return (

    <UserLayout>
     <div className={styles.container}>

       <div className={styles.cardContainer}>

        <div className={styles.cardContainer_left}>

          <p className={styles.cardLeft_heading}> { userLoginMethod ? "Sign In" : "Sign Up" }</p>

          <div className={styles.inputContainers}>

            <div className={styles.inputRow}>

 
          <input type="text" placeholder="Username" className={styles.inputField} />
           <input type="text" placeholder="Name" className={styles.inputField} />

            </div>

             <input type="password" placeholder="Password" className={styles.inputField} />

              <input type="email" placeholder="Email" className={styles.inputField} />

              <div onClick={() => {
                if(userLoginMethod) {
                  // Handle sign in logic
                } else {
                  // Handle sign up logic
                  handleRegister();
                }
              }}
                  className={styles.buttonWithOutline}>
                <p>{ userLoginMethod ? "Sign In" : "Sign Up" }</p>
              </div>

          </div>

        </div>

        <div className={styles.cardContainer_right}>

          
        </div>
      

      </div>

     </div>
    </UserLayout>

    
  )
}

export default Login;