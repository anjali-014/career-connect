// modified index.js

//import {inter} from "next/font/google";

import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";


//const inter = Inter({ subsets: ["latin"] });


export default function Home() {

  const router = useRouter();

  return (
    <>
      
      <div className={styles.container}>

        <div className={styles.mainContainer}>
           
           <div className={styles.mainContainer_left}>
              
              <p> Connect with friends without exaggeration</p>

              <p> A true social media platform, with stories no blufs !</p>

              <div  onClick={() => {
                router.push("/login");
              }} 
              
              className="buttonJoin">

                <p> Join Now</p>
              </div>

           </div>

            <div className={styles.mainContainer_right}>
                <img src = "images/homemain_connection.jpg" alt = "Main Connection Image"/>
            </div>
        </div>

      </div>
    </>
  );
}
