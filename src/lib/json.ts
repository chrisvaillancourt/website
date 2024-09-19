import { safeDestr } from 'destr';

// destr docs: https://github.com/unjs/destr

function safeJSONParse(value: string | null | undefined): string | null {
	try {
		return safeDestr(value);
	} catch {
		return null;
	}
}

export { safeJSONParse };
