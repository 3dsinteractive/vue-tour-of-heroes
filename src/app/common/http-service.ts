import axios, { AxiosInstance } from 'axios';
import { HttpResponse } from './types';

export class HttpService {
    private service: AxiosInstance;
    constructor() {
        const service = axios.create({
            headers: { csrf: 'token' },
        });
        this.service = service;
    }

    public get(path: string): Promise<HttpResponse> {
        return this.service.get(path);
    }

    public patch(path: string, payload: any): Promise<HttpResponse> {
        return this.service.request({
            method: 'PATCH',
            url: path,
            responseType: 'json',
            data: payload,
        });
    }

    public post(path: string, payload: any): Promise<HttpResponse> {
        return this.service.request({
            method: 'POST',
            url: path,
            responseType: 'json',
            data: payload,
        });
    }
}
