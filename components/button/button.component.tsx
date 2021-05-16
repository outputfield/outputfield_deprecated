import * as React from "react";
import styles from "./button.module.scss";

interface Props {
  children?: string | React.ReactNode;
  onClick?: (event: any) => any;
  id?: string;
}

export const Button = ({
  children,
  onClick,
  id,
}:Props) => {
  return (
    <button className={styles.root} onClick={onClick} id={id}>
      {
        children
      }
    </button>
  );
}
