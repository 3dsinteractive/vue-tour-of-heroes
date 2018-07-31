import axios, { AxiosInstance } from 'axios';
import { HttpResponse } from './types';
import { injectable } from '../../../node_modules/inversify';

@injectable()
export class HttpService {
    private service: AxiosInstance;
    constructor() {
        const service = axios.create({
            headers: { csrf: 'token' },
        });
        this.service = service;
    }

    public get<T>(path: string): Promise<HttpResponse<T>> {
        return this.service.get<T>(path);
    }

    public patch<T>(path: string, payload: any): Promise<HttpResponse<T>> {
        return this.service.request<T>({
            method: 'PATCH',
            url: path,
            responseType: 'json',
            data: payload,
        });
    }

    public post<T>(path: string, payload: any): Promise<HttpResponse<T>> {
        return this.service.request<T>({
            method: 'POST',
            url: path,
            responseType: 'json',
            data: payload,
        });
    }
}
