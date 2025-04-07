// import { FileMetaData } from "hyparquet";
// import { rowCache } from 'hightable'
import { byteLengthFromUrl, parquetMetadataAsync } from "hyparquet";
import { asyncBufferFrom } from "hyperparam";

async function fetchParquet(url: string) {
  const byteLength = await byteLengthFromUrl(url);
  const asyncBuffer = await asyncBufferFrom({ url, byteLength });
  const metadata = await parquetMetadataAsync(asyncBuffer);
  // const df = rowCache(parquetDataFrame(from, metadata))
  return { metadata, byteLength };
}

export interface RangeData {
  id: string;
  start: number;
  end: number;
  children?: RangeData[];
}

export async function fetchData(url: string): Promise<RangeData> {
  const { metadata, byteLength } = await fetchParquet(url);
  const initialParRange = {
    id: "initialPar",
    start: 0,
    end: 4,
  };
  const finalParRange = {
    id: "finalPar",
    start: byteLength - 4,
    end: byteLength,
  };
  const metadataRange = {
    id: "metadata",
    start: byteLength - metadata.metadata_length - 4,
    end: byteLength - 4,
  };
  return {
    id: "file",
    start: 0,
    end: byteLength,
    children: [initialParRange, metadataRange, finalParRange],
  };
}
