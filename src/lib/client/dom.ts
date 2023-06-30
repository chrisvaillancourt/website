export { toggleClass, hasClass };

function toggleClass(element: HTMLElement, className: string) {
	element.classList.toggle(className);
}

function hasClass(element: HTMLElement, className: string) {
	return element.classList.contains(className);
}
