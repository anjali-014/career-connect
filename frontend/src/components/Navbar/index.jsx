"use client";

import React from "react";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";

// navbar component for the application

function NavBarComponent() {

  const router = useRouter();

  return (
    <div className={styles.container}>
      <nav className={styles.navbar}>
        <h2 onClick={() => router.push("/")}>
          Pro Connect
        </h2>

        <div className={styles.navbarOptionsContainer}>
          <div
            onClick={() => {
              router.push("/login");
            }}
            className={styles.buttonJoin}
          >
            <p>Be a part</p>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBarComponent;