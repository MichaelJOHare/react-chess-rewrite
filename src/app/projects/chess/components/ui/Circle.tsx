import { CircleProps } from "../../types";

export const Circle = ({ cx, cy }: CircleProps) => {
  // why so thin when window is small?.. change vmin to vh?
  return (
    <svg
      className="absolute top-0 left-0 z-10 pointer-events-none"
      width="100%"
      height="100%"
      viewBox="0 0 100 100"
    >
      <circle
        cx={cx}
        cy={cy}
        r="0.45vmin"
        stroke={cx === 0 && cy === 0 ? "transparent" : "green"}
        strokeWidth="0.06vmin"
        fill="transparent"
        opacity="0.7"
      />
    </svg>
  );
};
