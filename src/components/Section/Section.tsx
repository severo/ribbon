import styles from "./Section.module.css";
import BarSection from "@/components/BarSection";
import Bar from "@/components/Bar";
import Card from "@/components/Card";
import CardsList from "@/components/CardsList";
import { scaleLinear } from "d3-scale";
import { SectionData } from "@/helpers/data";
import React from "react";
import type { ValidBytesRange } from "@/helpers/bytesRange";

interface SectionProps {
  sectionData: SectionData;
  bytesRange: ValidBytesRange;
}

function Section({ sectionData, bytesRange }: SectionProps) {
  const [hoveredSection, setHoveredSection] = React.useState<
    SectionData | undefined
  >(undefined);

  const first = bytesRange.first;
  const last = bytesRange.last;

  const scale = scaleLinear()
    .domain([first, last + 1])
    .range([0, 100]);

  function scaleAndClamp(value: number) {
    const max = 200;
    const min = -100;
    return Math.max(min, Math.min(max, scale(value)));
  }
  function computeStyle(section: SectionData) {
    const top = scaleAndClamp(section.offset);
    const height = scaleAndClamp(section.offset + section.length) - top;
    return {
      top: `${top.toString()}%`,
      height: `${height.toString()}%`,
    };
  }

  const getOnMouseEnter = (section: SectionData) => {
    return () => {
      setHoveredSection(section);
    };
  };
  const onMouseLeave = () => {
    setHoveredSection(undefined);
  };

  // TODO: keyboard navigation
  return (
    <div className={styles.section}>
      <Bar>
        {sectionData.children?.map((child, i) => {
          return (
            <BarSection
              key={`section_${i.toString()}`}
              style={computeStyle(child)}
              sectionData={child}
              onMouseEnter={getOnMouseEnter(child)}
              onMouseLeave={onMouseLeave}
              hovered={hoveredSection === child}
            />
          );
        })}
      </Bar>
      <CardsList>
        {sectionData.children?.map((child, i) => {
          return (
            <Card
              key={`section_${i.toString()}`}
              sectionData={child}
              onMouseEnter={getOnMouseEnter(child)}
              onMouseLeave={onMouseLeave}
              hovered={hoveredSection === child}
            />
          );
        })}
      </CardsList>
    </div>
  );
}

export default Section;
