import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

import { Resource } from './resource.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class ResourceService {

    private resourceUrl = 'api/resources';

    constructor(private http: Http) { }

    create(resource: Resource): Observable<Resource> {
        const copy = this.convert(resource);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    update(resource: Resource): Observable<Resource> {
        const copy = this.convert(resource);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            return res.json();
        });
    }

    find(id: number): Observable<Resource> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            return res.json();
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        return new ResponseWrapper(res.headers, jsonResponse, res.status);
    }

    private convert(resource: Resource): Resource {
        const copy: Resource = Object.assign({}, resource);
        return copy;
    }
}
