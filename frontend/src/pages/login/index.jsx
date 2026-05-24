import React , { useEffect } from "react";
import { useSelector } from "react-redux";
import UserLayout from "@/layout/UserLayout";
import { useRouter } from "next/router";
import styles from "./style.module.css";
import { useState } from "react";


function Login() {

  const authState = useSelector((state) => state.auth);

  const router = useRouter();

  const [userLoginMethod, setUserloginMethod] = useState(true);

  useEffect(() => {
    if (authState.loggedIn) {
      router.push("/dashboard");
    }
  }, [authState.loggedIn, router]);

  return (

    <UserLayout>
     <div className={styles.container}>

       <div className={styles.cardContainer}>

        <div className={styles.cardContainer_left}>

          <p className={styles.cardLeft_heading}> { userLoginMethod ? "Sign In" : "Sign Up" }</p>



        </div>

        <div className={styles.cardContainer_right}>

          
        </div>
      

      </div>

     </div>
    </UserLayout>

    
  )
}

export default Login;