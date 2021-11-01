import React from "react";

interface OnlineIconProps {
  colour: string;
  className?: string;
}

export default function OnlineIcon(props: OnlineIconProps) {
  return (
    <svg height="25" width="25" className={props.className}>
      <circle
        cx="12"
        cy="12"
        r="4"
        stroke="black"
        strokeWidth="1"
        fill={props.colour}
      />
    </svg>
  );
}
