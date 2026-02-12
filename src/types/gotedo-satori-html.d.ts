declare module '@gotedo/satori-html' {
	export function html(
		templates: TemplateStringsArray,
		...expressions: unknown[]
	): import('satori').SatoriNode;
}
