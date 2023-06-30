/**
 * Test if an event target is a Node.
 */
export function isNode(target?: EventTarget | null): target is Node {
	return Boolean(target) && target instanceof Node;
}
