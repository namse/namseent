export default function constrain(
  value: number,
  min: number = 0,
  max: number = 1,
) {
  return Math.min(Math.max(value, min), max);
}
