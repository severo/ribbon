// see https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Range
export interface BytesRange {
  first?: number;
  last?: number;
}

export interface ValidBytesRange {
  first: number;
  last: number;
}

// https://www.rfc-editor.org/rfc/rfc9110.html#name-byte-ranges
// TODO(SL): support range-set (500-600, 700-800)
export function validateBytesRange(
  bytesRange?: BytesRange,
  { min = 0, max = Number.MAX_SAFE_INTEGER } = {}
):
  | {
      validBytesRange: ValidBytesRange;
    }
  | {
      error: string;
    } {
  if (bytesRange === undefined) {
    return { error: "The bytes range is undefined" };
  }
  // TODO(SL): support suffix-range (-500)
  if (bytesRange.first === undefined) {
    return { error: "The bytes range's first-pos is undefined" };
  }
  if (bytesRange.first < min) {
    return {
      error: `The bytes range's first-pos is less than ${min.toString()}`,
    };
  }
  if (bytesRange.first > max) {
    return {
      error: `The bytes range's first-pos is greater than ${max.toString()}`,
    };
  }
  if (!Number.isInteger(bytesRange.first)) {
    return { error: "The bytes range's first-pos is not an integer" };
  }
  // TODO(SL): support missing last-pos (500-)
  if (bytesRange.last === undefined) {
    return { error: "The bytes range's last-pos is undefined" };
  }
  if (bytesRange.last < min) {
    return {
      error: `The bytes range's last-pos is less than ${min.toString()}`,
    };
  }
  if (bytesRange.last > max) {
    return {
      error: `The bytes range's last-pos is greater than ${max.toString()}`,
    };
  }
  if (!Number.isInteger(bytesRange.last)) {
    return { error: "The bytes range's last-pos is not an integer" };
  }

  if (bytesRange.first > bytesRange.last) {
    return {
      error: "The bytes range's last-pos is less than the first-pos",
    };
  }

  return {
    validBytesRange: {
      first: bytesRange.first,
      last: bytesRange.last,
    },
  };
}
