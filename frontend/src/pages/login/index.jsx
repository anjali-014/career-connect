import React , { useEffect } from "react";
import { useSelector } from "react-redux";
import UserLayout from "@/layout/UserLayout";
import NavBarComponent from "@/components/Navbar";
import { useRouter } from "next/router";
import styles from "/style.module.css";

function Login() {

  const authState = useSelector((state) => state.auth);

  const router = useRouter();

  const isLoginMethod = authState(false);

  useEffect(() => {
    if (authState.loggedIn) {
      router.push("/dashboard");
    }
  }, [authState.loggedIn, router]);

  return (

    <UserLayout>
      <div className={styles.cardContainer}>
        <div className={styles.cardContainer_left}>

          <p> { isLoginMethod ? "Sign In" : "Sign Up" }</p>



        </div>

        <div className={styles.cardContainer_right}>

          
        </div>
      

      </div>

    </UserLayout>

    
    {/* // <div>
    //   <NavBarComponent />

    //   <h1>Login Component</h1>
    // </div> */}
  );
}

export default Login;