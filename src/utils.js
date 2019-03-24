export function readableDate(timestamp) {
  return Number.isInteger(timestamp)
    ? Intl.DateTimeFormat("en-GN", {
        day: "numeric",
        year: "numeric",
        month: "short"
      }).format(timestamp * 1000)
    : "";
}
