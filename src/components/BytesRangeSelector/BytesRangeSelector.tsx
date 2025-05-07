import styles from "./BytesRangeSelector.module.css";

// see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Range
export interface BytesRange {
  start: number;
  end: number; // inclusive
}

interface BytesRangeSelectorProps {
  minValue?: number; // disables the inputs if undefined
  maxValue?: number; // disables the inputs if undefined
  bytesRange?: BytesRange; //
  setBytesRange: (bytesRange: BytesRange) => void;
}

const defaultMinValue = 0;
const defaultMaxValue = 0xffffffff; // 4 bytes

function BytesRangeSelector({
  minValue,
  maxValue,
  bytesRange,
  setBytesRange,
}: BytesRangeSelectorProps) {
  const isDisabled =
    minValue === undefined ||
    maxValue === undefined ||
    bytesRange === undefined;
  return (
    <form
      className={styles.selector}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <fieldset>
        <legend>Bytes range</legend>
        <label>
          <span>Start: </span>
          <input
            type="number"
            disabled={isDisabled}
            value={bytesRange?.start ?? defaultMinValue}
            onChange={(e) => {
              const start = parseInt(e.target.value, 10);
              if (isNaN(start) || isDisabled) return;
              setBytesRange({ ...bytesRange, start });
            }}
            min={0}
            max={bytesRange?.end ?? defaultMaxValue}
            step={1}
            className={styles.input}
          />
        </label>
        <label>
          <span>End: </span>
          <input
            type="number"
            disabled={isDisabled}
            value={bytesRange?.end ?? defaultMaxValue}
            onChange={(e) => {
              const end = parseInt(e.target.value, 10);
              if (isNaN(end) || isDisabled) return;
              setBytesRange({ ...bytesRange, end });
            }}
            min={bytesRange?.start ?? defaultMinValue}
            max={Infinity}
            step={1}
            className={styles.input}
          />
        </label>
      </fieldset>
    </form>
  );
}

export default BytesRangeSelector;
