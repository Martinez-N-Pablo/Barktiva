/**
 * Called when http request fails, 
 * it will return a rejected promise with the error message.
 * 
 * @param error: any;
 * @returns: Promise<any>;
 */
export function HandleError(error: any): Promise<any> {
    return Promise.reject(error.message || error);
}