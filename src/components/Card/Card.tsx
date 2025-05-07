import styles from "./Card.module.css";
import type { SectionData } from "@/helpers/data";
import { cn } from "@/utils";

interface CardProps {
  sectionData: SectionData;
  onMouseEnter?: (e: React.MouseEvent<HTMLInputElement>) => void;
  onMouseLeave?: (e: React.MouseEvent<HTMLInputElement>) => void;
  hovered?: boolean;
}

function humanSize(bytes: number): string {
  const sizes = ["B", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 B";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(0)} ${sizes[i]}`;
}

function Card({ sectionData, onMouseEnter, onMouseLeave, hovered }: CardProps) {
  return (
    <div
      className={cn(styles.card, hovered && styles.hovered)}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ "--color": sectionData.color } as React.CSSProperties}
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
