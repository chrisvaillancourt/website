declare module '@gotedo/satori-html' {
	interface VNode {
		type: string;
		props: {
			style?: Record<string, unknown>;
			children?: string | VNode | VNode[];
			[prop: string]: unknown;
		};
	}

	export function html(
		templates: string | TemplateStringsArray,
		...expressions: unknown[]
	): VNode;
}
