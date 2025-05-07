// import { FileMetaData } from "hyparquet";
// import { rowCache } from 'hightable'
import { byteLengthFromUrl, parquetMetadataAsync } from "hyparquet";
import { asyncBufferFrom } from "hyperparam";

async function fetchParquet(url: string) {
  const t0 = performance.now();
  const byteLength = await byteLengthFromUrl(url);
  const t1 = performance.now();
  console.log(`byteLengthFromUrl took ${(t1 - t0).toString()} ms`);
  const asyncBuffer = await asyncBufferFrom({ url, byteLength });
  const t2 = performance.now();
  console.log(`asyncBufferFrom took ${(t2 - t1).toString()} ms`);
  const metadata = await parquetMetadataAsync(asyncBuffer);
  const t3 = performance.now();
  console.log(`parquetMetadataAsync took ${(t3 - t2).toString()} ms`);
  // const df = rowCache(parquetDataFrame(from, metadata))
  return { metadata, byteLength };
}

/*
 * A section of a file. It can be a header, a footer, a metadata group, a row group, a magic number, etc.
 */
export interface SectionData {
  label: string;
  offset: number;
  length: number;
  children?: SectionData[]; // we don't check for circular references
  parent?: SectionData; // we don't check for circular references
  level: number; // redundant with children/parents, but useful
  color: string; // for the UI
}

export const COLORS = {
  file: "#FF5733",
  data: "#FF33F5",
  metadata: "#33FF57",
  rowGroup: "#3357FF",
  columnChunk: "#FF33A1",
  dataPage: "#FF8C33",
  dictionaryPage: "#33FFF5",
  footer: "#FF33F5",
};

export async function fetchData(url: string): Promise<SectionData> {
  const { metadata, byteLength } = await fetchParquet(url);
  const fileDataLength = byteLength - 4 - metadata.metadata_length - 4;
  const parent: SectionData = {
    label: "File",
    offset: 0,
    length: byteLength,
    level: 0,
    color: COLORS.file,
    children: [
      {
        label: "Initial magic number: PAR",
        length: 4,
        color: COLORS.file,
      },
      {
        label: "File data",
        length: fileDataLength,
        color: COLORS.data,
      },
      {
        label: "File metadata",
        length: metadata.metadata_length,
        color: COLORS.metadata,
      },
      {
        label: "Final magic number: PAR",
        length: 4,
        color: COLORS.file,
      },
    ].reduce<SectionData[]>((acc, child) => {
      const previous = acc.at(-1) ?? { offset: 0, length: 0 };
      acc.push({
        ...child,
        offset: previous.offset + previous.length,
        level: 1,
      });
      return acc;
    }, []),
  };
  parent.children?.map((child) => ({ ...child, parent }));
  return parent;
}
