export interface PairingIdValidationResult {
    isValid: boolean;
    cleanedValue: string;
    errorMessage?: string;
}

export function validatePairingId(
    input: string,
    errorMessages: {invalidCharacters: string}
): PairingIdValidationResult {
    const trimmedInput = input.trim();

    const convertedInput = trimmedInput
        .replace(/[oO]/g, '0') // o and O → 0
        .replace(/[lLiI]/g, '1'); // l, L, i, and I → 1

    // Validate hex characters (0-9, a-f, A-F)
    const hexPattern = /^[0-9a-fA-F]*$/;
    const isValid = hexPattern.test(convertedInput);

    return {
        isValid,
        cleanedValue: convertedInput,
        errorMessage: isValid ? undefined : errorMessages.invalidCharacters,
    };
}

export const defaultErrorMessages = {
    invalidCharacters:
        'The Pairing ID entered is invalid. Pairing IDs only contain the digits 0-9 or letters a-f.',
};
