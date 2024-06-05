export class ApiError extends Error {
    constructor(msg: string, url: string) {
        msg += ` (${url})`;
        super(msg);
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}