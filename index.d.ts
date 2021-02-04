declare module "react-notifications";
declare module "react-lazylog" {
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
		stream?: boolean;
		style?: CSSProperties;
		text?: string;
		url: string;
		websocket?: boolean;
		websocketOptions?: WebsocketOptions;
		width?: string | number;
	}

	export class LazyLog extends Component<LazyLogProps> {
		static defaultProps: Partial<LazyLogProps>;
	}

	export default LazyLog;

	export interface LineContentProps {
		data: Array<{ text: string }>;
		number: number;
		formatPart?: (text: string) => ReactNode;
		style?: CSSProperties;
	}

	export default class LineContent extends Component<LineContentProps> {
		static defaultProps: Partial<LineContentProps>;
	}

	export interface LineNumberProps {
		number: number;
		highlight?: boolean;
		onClick?: MouseEventHandler<HTMLAnchorElement>;
		style?: CSSProperties;
	}

	export default class LinePart extends Component<LineNumberProps> {
		static defaultProps: Partial<LineNumberProps>;
	}

	export interface LinePartProps {
		part: { text: string };
		format?: (text: string) => ReactNode;
		style?: CSSProperties;
	}

	export default class LinePart extends Component<LinePartProps> {
		static defaultProps: Partial<LinePartProps>;
	}

	export default class Loading extends Component {}

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

	export default ScrollFollow;

	export interface SearchBarProps {
		onSearch?: (keyword: string) => void;
		onClearSearch?: () => void;
		onFilterLinesWithMatches?: (isFiltered: boolean) => void;
		resultsCount?: number;
		filterActive?: boolean;
		disabled?: boolean;
	}

	export default class SearchBar extends Component<SearchBarProps> {
		static defaultProps: Partial<SearchBarProps>;
	}
}
