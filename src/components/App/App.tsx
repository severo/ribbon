import styles from "./App.module.css";
import Section, { BytesRange } from "@/components/Section";
import { fetchData, SectionData } from "@/helpers/data";
import { useState, useEffect } from "react";
import { PARQUET_URL } from "@/constants";

function App() {
  // Add zoom and pan

  const [sectionData, setSectionData] = useState<SectionData>();
  const [bytesRange, setBytesRange] = useState<BytesRange>();

  useEffect(() => {
    void fetchData(PARQUET_URL).then((nextSectionData) => {
      setSectionData(nextSectionData);
      setBytesRange({
        start: nextSectionData.offset,
        end: nextSectionData.offset + nextSectionData.length,
      });
    });
  }, []);

  return (
    <div className={styles.app}>
      <header>
        <h1>Ribbon</h1>
      </header>
      <main>
        {sectionData && bytesRange && (
          <Section sectionData={sectionData} bytesRange={bytesRange} />
        )}
      </main>
      <footer>Code: https://github.com/severo/ribbon</footer>
    </div>
  );
}

export default App;
