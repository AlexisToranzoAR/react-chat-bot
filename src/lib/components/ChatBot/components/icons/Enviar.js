export default function EnviarIcon({
  width = 30,
  height = 30,
  stroke = "#0B58A4",
  ...props
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 42 41"
      {...props}
    >
      <path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M16.51 20.188h24.24M40.75 20.188 13.754 32.858a.857.857 0 0 1-1.102-1.102l3.857-11.57-3.857-11.57a.857.857 0 0 1 1.102-1.101L40.75 20.187Z"
      />
    </svg>
  );
}
