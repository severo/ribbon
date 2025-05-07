import styles from "./Section.module.css";
import BarSection from "@/components/BarSection";
import Bar from "@/components/Bar";
import Card from "@/components/Card";
import CardsList from "@/components/CardsList";
import { scaleLinear } from "d3-scale";
import { SectionData } from "@/helpers/data";
import React from "react";
import { BytesRange } from "@/components/BytesRangeSelector";

interface SectionProps {
  sectionData: SectionData;
  bytesRange: BytesRange;
}

function Section({ sectionData, bytesRange }: SectionProps) {
  const [hoveredSection, setHoveredSection] = React.useState<
    SectionData | undefined
  >(undefined);

  const scale = scaleLinear()
    .domain([bytesRange.start, bytesRange.end])
    .range([0, 100]);

  function computeStyle(section: SectionData) {
    const start = scale(section.offset);
    const length = scale(section.offset + section.length) - start;
    return {
      top: `${start.toString()}%`,
      height: `${length.toString()}%`,
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
