export default function EnLineaIcon({
  width = 14,
  height = 14,
  fill = "#5EC86D",
  ...props
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 14 14"
      {...props}
    >
      <circle cx={7} cy={7} r={5} fill={fill} />
      <circle cx={7} cy={7} r={6.25} stroke="#fff" strokeWidth={1.5} />
    </svg>
  );
}
