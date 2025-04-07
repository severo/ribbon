import styles from "./Row.module.css";
import Range from "@/components/Range";
import { scaleLinear } from "d3-scale";
import { RangeData } from "@/helpers/data";

export interface View {
  start: number;
  end: number;
}
interface RowProps {
  data: RangeData;
  view: View;
}

function Row({ data, view }: RowProps) {
  const scale = scaleLinear().domain([view.start, view.end]).range([0, 100]);

  function computeStyle(range: RangeData) {
    const start = scale(range.start);
    const end = scale(range.end);
    const width = end - start;
    return {
      left: `${start.toString()}%`,
      width: `${width.toString()}%`,
    };
  }

  return (
    <div className={styles.row}>
      {data.children?.map((range) => (
        <Range key={range.id} style={computeStyle(range)} data={range} />
      ))}
    </div>
  );
}

export default Row;
