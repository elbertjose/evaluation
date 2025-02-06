import CryptoJS from 'crypto-js';
import { createTransform } from 'redux-persist';
type CipherParams = CryptoJS.lib.CipherParams;
import type { TransformConfig } from 'redux-persist/lib/createTransform';

export interface EncryptTransformConfig {
    secretKey: string;
    onError?: (err: Error) => void;
}

const makeError = (message: string) => new Error(`redux-persist-transform-encrypt: ${message}`);

export const encryptTransform = <HSS, S = any, RS = any>(config: EncryptTransformConfig, transformConfig?: TransformConfig) => {

    const onError = typeof config.onError === 'function' ? config.onError : console.warn;

    if (typeof config === 'undefined') {
        onError(makeError('No configuration provided.'));
    }
    const { secretKey } = config;
    if (!secretKey) {
        onError(makeError('No secret key provided.'));
    }


   return createTransform(
        (inboundState: string | CipherParams, key) => {
            if (!inboundState) return inboundState;
            const encryptedText = CryptoJS.AES.encrypt(JSON.stringify(inboundState), secretKey);

            return encryptedText.toString();
        },
        (outboundState: string | CipherParams, key) => {
            if (!outboundState) return outboundState;
            const bytes = CryptoJS.AES.decrypt(outboundState, secretKey);
            const decrypted = bytes.toString(CryptoJS.enc.Utf8);

            if (!decrypted) {
                throw new Error('Decrypted string is empty.');
            }
            try {
                return JSON.parse(decrypted);
            }
            catch {
                return onError(makeError('Failed to parse state as JSON.'));
            }
        },
        transformConfig
    );
}
