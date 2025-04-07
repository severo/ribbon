import styles from "./Row.module.css";
import Range, { RangeData } from "@/components/Range";
import { scaleLinear } from "d3-scale";

export interface RowData {
  start: number;
  end: number;
  ranges: RangeData[];
}

function Row({ data }: { data: RowData }) {
  const scale = scaleLinear().domain([data.start, data.end]).range([0, 100]);

  function computeStyle(range: RangeData) {
    const start = scale(range.start);
    const end = scale(range.end);
    const width = end - start;
    return {
      left: `${start.toString()}%`,
      width: `${width.toString()}%`,
      backgroundColor: range.color,
    };
  }

  return (
    <div className={styles.row}>
      {data.ranges.map((range) => (
        <Range
          key={range.id}
          style={computeStyle(range)}
          // start={range.start}
          // end={range.end}
          // color={range.color}
          // label={range.label}
        />
      ))}
    </div>
  );
}

export default Row;
