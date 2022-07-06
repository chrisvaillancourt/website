import { webcrypto } from 'crypto';
import { isServer } from '../env';

// TODO https://github.com/chrisvaillancourt/website/issues/7

const _crypto = isServer ? (webcrypto as unknown as Crypto) : crypto;

export { _crypto as crypto };
