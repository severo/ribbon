import styles from "./App.module.css";
import Section from "@/components/Section";
import { fetchData, SectionData } from "@/helpers/data";
import { useState, useEffect } from "react";
import { PARQUET_URL } from "@/constants";
import BytesRangeSelector from "@/components/BytesRangeSelector";
import { BytesRange, validateBytesRange } from "@/helpers/bytesRange";

function App() {
  // Add zoom and pan

  const [sectionData, setSectionData] = useState<SectionData>();
  const [bytesRange, setBytesRange] = useState<BytesRange>();

  useEffect(() => {
    void fetchData(PARQUET_URL).then((nextSectionData) => {
      setSectionData(nextSectionData);
      setBytesRange({
        first: nextSectionData.offset,
        last: nextSectionData.offset + nextSectionData.length - 1,
      });
    });
  }, []);

  const validationResult = validateBytesRange(bytesRange, {
    min: sectionData?.offset,
    max:
      sectionData?.offset !== undefined && sectionData.length
        ? sectionData.offset + sectionData.length - 1
        : undefined,
  });

  return (
    <div className={styles.app}>
      <header>
        <h1>Ribbon</h1>
      </header>
      <main>
        <section>
          {"error" in validationResult && (
            <div className={styles.error}>
              <p>{validationResult.error}</p>
              <p>Please select a valid bytes range using the selector below.</p>
            </div>
          )}
          {!sectionData && (
            <div className={styles.loading}>
              <p>Loading...</p>
            </div>
          )}
          {"validBytesRange" in validationResult && sectionData && (
            <Section
              sectionData={sectionData}
              bytesRange={validationResult.validBytesRange}
            />
          )}
        </section>
        <footer>
          <BytesRangeSelector
            bytesRange={bytesRange}
            setBytesRange={setBytesRange}
          ></BytesRangeSelector>
        </footer>
      </main>
      <footer>Code: https://github.com/severo/ribbon</footer>
    </div>
  );
}

export default App;
