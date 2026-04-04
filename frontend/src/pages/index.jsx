// modified index.js

//import {inter} from "next/font/google";

import Image from "next/image";
import { Geist, Geist_Mono } from "next/font/google";

//const inter = Inter({ subsets: ["latin"] });


export default function Home() {
  return (
    <>
      
      <div className="container">

        <div className="mainContainer">
           
           <div className="mainContainer_left">


           </div>

            <div className="mainContainer_right">
                <img src = "images/homemain_connection.jpg" alt = "Main Connection Image"/>
            </div>
        </div>

      </div>
    </>
  );
}
