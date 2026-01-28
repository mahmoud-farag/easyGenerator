import type { ToastOptions } from "react-hot-toast";


export interface IToastService {
    success: (message: string, options?: ToastOptions) => void;
    error: (message: string, options?: ToastOptions) => void;
    warning: (message: string, options?: ToastOptions) => void;
};

export type Options = {
    [key: string]: unknown;
};

export interface IResponse<T = undefined> {
    success: boolean;
    message?: string;
    data?: T;

};
