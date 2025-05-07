import styles from "./Bar.module.css";
import React from "react";

interface BarProps {
  children?: React.ReactNode;
}

function Bar({ children }: BarProps) {
  return (
    <div className={styles.bar}>
      <div className={styles.barSections}>{children}</div>
    </div>
  );
}

export default Bar;
