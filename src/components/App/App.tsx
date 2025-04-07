import styles from "./App.module.css";
import Row, { View } from "@/components/Row";
import { fetchData, RangeData } from "@/helpers/data";
import { useState } from "react";
import { PARQUET_URL } from "@/constants";

function App() {
  // Add zoom and pan
  // switch to vertical

  const [data, setData] = useState<RangeData>();
  const [view, setView] = useState<View>();

  void fetchData(PARQUET_URL).then((nextData) => {
    setData(nextData);
    setView({
      start: nextData.start,
      end: nextData.end,
    });
  });
  return (
    <div className={styles.app}>
      <header>
        <h1>Ribbon</h1>
      </header>
      <main>{data && view && <Row data={data} view={view} />}</main>
      <footer>Code: https://github.com/severo/ribbon</footer>
    </div>
  );
}

export default App;
