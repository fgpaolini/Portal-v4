declare global {
  interface IAuthError extends Error {
    response?: {
      status: number;
      _data?: {
        message?: string;
		title?:string;
		status?:string;
		detail?:string;
      };
    };
  }
}

export { IAuthError };
