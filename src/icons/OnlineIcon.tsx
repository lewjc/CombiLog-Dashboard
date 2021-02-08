import React from "react";

interface OnlineIconProps {
  colour: string;
}

export default function OnlineIcon(props: OnlineIconProps) {
  return (
    <svg height="25" width="25">
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
