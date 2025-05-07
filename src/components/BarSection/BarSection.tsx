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
  hovered?: boolean;
  onMouseEnter?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function BarSection({
  style,
  sectionData,
  hovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
  onKeyDown,
}: BarSectionProps) {
  const sectionStyle = {
    ...style,
    "--color": sectionData.color,
  };
  return (
    <div
      className={cn(styles.barSection, hovered && styles.hovered)}
      style={sectionStyle}
      aria-label={`Press to select the section ${sectionData.label}`}
      role="button"
      tabIndex={0}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      onKeyDown={onKeyDown}
    ></div>
  );
}

export default BarSection;
