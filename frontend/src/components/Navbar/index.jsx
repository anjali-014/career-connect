import React from 'react';
import styles from "./styles.module.css";

//navbar component for the application, it will be used in the layout component to be displayed on all pages of the application. It will contain the logo and the links to the different pages of the application. It will also contain a search bar and a user profile icon.
function NavBarComponent() {
  return (
    <div className={styles.Container}>
       <nav className={styles.Navbar}>

        <h2>Pro Connect</h2>

        <div className={styles.Navbar_links}>


        </div>

       
       </nav>
      
    </div>
  )
}

export default NavBarComponent;
