export const IS_LOADING = 'IS_LOADING';
export function isLoading(isLoading = false) {
    return {
        type: IS_LOADING,
        isLoading: isLoading,
    };
}