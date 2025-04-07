import styles from "./Range.module.css";
import { RangeData } from "@/helpers/data";

interface RangeProps {
  data: RangeData;
  style?: React.CSSProperties;
}

function Range({ style }: RangeProps) {
  const rangeStyle = {
    backgroundColor: "red",
    ...style,
  };
  return <div className={styles.range} style={rangeStyle}></div>;
}

export default Range;
