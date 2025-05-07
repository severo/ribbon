import styles from "./App.module.css";
import Section from "@/components/Section";
import { fetchData, SectionData } from "@/helpers/data";
import { useState, useEffect } from "react";
import { PARQUET_URL } from "@/constants";
import BytesRangeSelector from "@/components/BytesRangeSelector";
import { BytesRange, validateBytesRange } from "@/helpers/bytesRange";

function App() {
  // Add zoom and pan

  const [fileData, setFileData] = useState<SectionData>();
  const [sectionData, setSectionData] = useState<SectionData>();
  const [bytesRange, setBytesRange] = useState<BytesRange>();

  useEffect(() => {
    void fetchData(PARQUET_URL).then((nextFileData) => {
      setFileData(nextFileData);
      setSectionData(nextFileData);
    });
  }, []);

  useEffect(() => {
    if (sectionData) {
      setBytesRange({
        first: sectionData.offset,
        last: sectionData.offset + sectionData.length - 1,
      });
    }
  }, [sectionData]);

  const validationResult = validateBytesRange(bytesRange, {
    min: fileData?.offset,
    max:
      fileData?.offset !== undefined && fileData.length
        ? fileData.offset + fileData.length - 1
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
              setSectionData={setSectionData}
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
