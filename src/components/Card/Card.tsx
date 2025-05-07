import styles from "./Card.module.css";
import type { SectionData } from "@/helpers/data";
import { cn } from "@/utils";

interface CardProps {
  sectionData: SectionData;
  hovered?: boolean;
  onMouseEnter?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

function humanSize(bytes: number): string {
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 B";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(0)} ${sizes[i]}`;
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
      <div className={styles.size}>
        <div>{humanSize(sectionData.length)}</div>
      </div>
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
