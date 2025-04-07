import styles from "./Range.module.css";
interface RangeProps {
  // start: number;
  // end: number;
  // color: string;
  // label: string;
  style?: React.CSSProperties;
}

function Range({ style }: RangeProps) {
  return <div className={styles.range} style={style}></div>;
}

export default Range;

export interface RangeData {
  id: string;
  start: number;
  end: number;
  color: string;
  label: string;
}
