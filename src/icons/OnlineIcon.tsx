import React from "react";

interface OnlineIconProps {
	colour: string;
}

export default function OnlineIcon(props: OnlineIconProps) {
	return (
		<svg height="100" width="100">
			<circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill={props.colour} />
		</svg>
	);
}
