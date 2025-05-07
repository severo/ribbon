import styles from "./BytesRangeSelector.module.css";
import type { BytesRange } from "@/helpers/bytesRange";

interface BytesRangeSelectorProps {
  bytesRange?: BytesRange; //
  setBytesRange: (bytesRange: BytesRange) => void;
}

function BytesRangeSelector({
  bytesRange,
  setBytesRange,
}: BytesRangeSelectorProps) {
  const isDisabled = bytesRange === undefined;
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
          <span>Start</span>
          <input
            type="number"
            disabled={isDisabled}
            required
            value={bytesRange?.first}
            onChange={(e) => {
              const first = parseInt(e.target.value, 10);
              setBytesRange({
                ...bytesRange,
                first: isNaN(first) ? undefined : first,
              });
            }}
            step={1}
            className={styles.input}
          />
        </label>
        <span>-</span>
        <label>
          <input
            type="number"
            disabled={isDisabled}
            value={bytesRange?.last}
            onChange={(e) => {
              const last = parseInt(e.target.value, 10);
              setBytesRange({
                ...bytesRange,
                last: isNaN(last) ? undefined : last,
              });
            }}
            step={1}
            className={styles.input}
          />
          <span>End</span>
        </label>
      </fieldset>
    </form>
  );
}

export default BytesRangeSelector;
