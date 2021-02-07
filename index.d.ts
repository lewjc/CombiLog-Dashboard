declare module "react-notifications";
declare module "react-combilazylog" {
	import {
		Component,
		ReactNode,
		CSSProperties,
		MouseEventHandler,
	} from "react";

	export interface WebsocketOptions {
		onOpen?: (e: Event, socket: WebSocket) => void;
		onClose?: (e: CloseEvent) => void;
		onError?: (e: Event) => void;
		formatMessage?: (message: any) => string;
	}

	export interface ColourRule {
		textColour?: string;
		backgroundColour?: string;
		rule: RegExp;
		name: string;
	}
	export interface LazyLogProps {
		caseInsensitive?: boolean;
		containerStyle?: CSSProperties;
		enableSearch?: boolean;
		extraLines?: number;
		fetchOptions?: RequestInit;
		follow?: boolean;
		formatPart?: (text: string) => ReactNode;
		height?: string | number;
		highlight?: number | number[];
		highlightLineClassName?: string;
		lineClassName?: string;
		loadingComponent?: any;
		onError?: (error: any) => any;
		onHighlight?: (range: Range) => any;
		onLoad?: () => any;
		overscanRowCount?: number;
		rowHeight?: number;
		scrollToLine?: number;
		selectableLines?: boolean;
		colourRules?: Array<ColourRule>;
		stream?: boolean;
		style?: CSSProperties;
		text?: string;
		url?: string;
		websocket?: boolean;
		websocketOptions?: WebsocketOptions;
		width?: string | number;
	}

	export class LazyLog extends Component<LazyLogProps> {
		static Props: Partial<LazyLogProps>;
	}

	export interface LineContentProps {
		data: Array<{ text: string }>;
		number: number;
		formatPart?: (text: string) => ReactNode;
		style?: CSSProperties;
	}

	export class LineContent extends Component<LineContentProps> {
		static Props: Partial<LineContentProps>;
	}

	export interface LineNumberProps {
		number: number;
		highlight?: boolean;
		onClick?: MouseEventHandler<HTMLAnchorElement>;
		style?: CSSProperties;
	}

	export class LinePart extends Component<LineNumberProps> {
		static Props: Partial<LineNumberProps>;
	}

	export interface LinePartProps {
		part: { text: string };
		format?: (text: string) => ReactNode;
		style?: CSSProperties;
	}

	export class Loading extends Component {}

	export interface ScrollFollowRenderProps {
		onScroll: (args: {
			scrollTop: number;
			scrollHeight: number;
			clientHeight: number;
		}) => void;
		follow: boolean;
		startFollowing: () => void;
		stopFollowing: () => void;
	}

	export interface ScrollFollowProps {
		render: (props: ScrollFollowRenderProps) => ReactNode;
		startFollowing?: boolean;
	}

	export class ScrollFollow extends Component<ScrollFollowProps> {}

	export interface SearchBarProps {
		onSearch?: (keyword: string) => void;
		onClearSearch?: () => void;
		onFilterLinesWithMatches?: (isFiltered: boolean) => void;
		resultsCount?: number;
		filterActive?: boolean;
		disabled?: boolean;
	}

	export class SearchBar extends Component<SearchBarProps> {
		static Props: Partial<SearchBarProps>;
	}
}
