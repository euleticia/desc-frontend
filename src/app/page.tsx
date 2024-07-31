import Image from "next/image";
import styles from "./page.module.css";
import HeaderComponent from "./components/HeaderComponent/HeaderComponent";
import TableComponent from "./components/TableComponent/TableComponent";

export default function Home() {
  return (
    <div>
      <HeaderComponent />
      <TableComponent />
    </div>
  );
}
