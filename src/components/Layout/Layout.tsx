import { ReactNode } from "react";

import styles from "./Layout.module.css";

const Layout = ({ children }: { children: ReactNode | ReactNode[] }) => {
  return <div className={styles.layoutWrapper}>{children}</div>;
};

export { Layout };
