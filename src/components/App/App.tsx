import styles from "./App.module.css";
import Row, { RowData } from "@/components/Row";

function App() {
  const data: RowData = {
    start: 0,
    end: 13,
    ranges: [
      {
        id: "1",
        start: 0,
        end: 10,
        color: "red",
        label: "Data",
      },
      {
        id: "2",
        start: 10,
        end: 11,
        color: "blue",
        label: "Metadata",
      },
    ],
  };
  return (
    <div className={styles.app}>
      <header>
        <h1>Ribbon</h1>
      </header>
      <main>
        <Row data={data} />
      </main>
      <footer>Code: https://github.com/severo/ribbon</footer>
    </div>
  );
}

export default App;
