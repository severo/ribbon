import styles from "./BarSection.module.css";
import { SectionData } from "@/helpers/data";
import { cn } from "@/utils";

// see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Range
export interface BytesRange {
  start: number;
  end: number; // inclusive
}
interface BarSectionProps {
  sectionData: SectionData;
  bytesRange?: BytesRange;
  style?: React.CSSProperties;
  onMouseEnter?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLInputElement>) => void;
  hovered?: boolean;
}

function BarSection({
  style,
  sectionData,
  onMouseEnter,
  onMouseLeave,
  hovered,
}: BarSectionProps) {
  const sectionStyle = {
    ...style,
    "--color": sectionData.color,
  };
  return (
    <div
      className={cn(styles.section, hovered && styles.hovered)}
      style={sectionStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      aria-label={sectionData.label}
    ></div>
  );
}

export default BarSection;
