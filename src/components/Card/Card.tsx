import styles from "./Card.module.css";
import type { SectionData } from "@/helpers/data";
import { cn } from "@/utils";
import { ReactNode } from "react";

interface CardProps {
  sectionData: SectionData;
  hovered?: boolean;
  onMouseEnter?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function humanSize(
  units: string[],
  bytes: number
): {
  unit: string;
  value: string;
  meterValue: number;
} {
  if (bytes < 0) {
    throw new Error("Negative size");
  }
  // Meter value is a log scale, where 0 corresponds to 1 byte, and
  // 1 corresponds to 1 PB
  const maxSupportedSize = Math.pow(1024, units.length);
  if (bytes === 0)
    return {
      unit: units[0],
      value: "0",
      meterValue: 0,
    };
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  const meterValue =
    (Math.log(bytes) - Math.log(1)) /
    (Math.log(maxSupportedSize) - Math.log(1));
  return {
    unit: units[i],
    value: (bytes / Math.pow(1024, i)).toFixed(0),
    meterValue,
  };
}

function Size({ sectionData }: { sectionData: SectionData }): ReactNode {
  //return <div className={styles.sizeCircle}>{humanSize(bytes)}</div>;
  const units = ["B", "KB", "MB", "GB", "TB"];
  const { unit, value, meterValue } = humanSize(units, sectionData.length);
  return (
    <div className={styles.size}>
      <div>
        {value} {unit}
      </div>
      <div>
        <meter min={0} max={1} value={meterValue}></meter>
        <div className={styles.units}>
          {units.map((_unit) => (
            <div
              className={cn(styles.unit, unit === _unit && styles.selected)}
              key={_unit}
            >
              {_unit}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Card({
  sectionData,
  hovered,
  onMouseEnter,
  onMouseLeave,
  onClick,
  onKeyDown,
}: CardProps) {
  return (
    <div
      className={cn(styles.card, hovered && styles.hovered)}
      style={{ "--color": sectionData.color } as React.CSSProperties}
      role="button"
      tabIndex={0}
      aria-label={`Press to select the section ${sectionData.label}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      onKeyDown={onKeyDown}
    >
      <Size sectionData={sectionData} />
      <div className={styles.details}>
        <div>{sectionData.label}</div>
        <div className={styles.range}>
          Range: {sectionData.offset} -{" "}
          {sectionData.offset + sectionData.length - 1}
        </div>
      </div>
    </div>
  );
}

export default Card;
