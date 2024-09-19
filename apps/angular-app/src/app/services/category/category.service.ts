import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';

import { Category, GetCategoryResponse } from '../../models/Category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = 'http://localhost:4200/api/categories';

  constructor(private http: HttpClient) {}

  public getCategories(includeAll: boolean = true): Observable<Category[]> {
    return this.http.get<GetCategoryResponse[]>(this.apiUrl).pipe(
      take(1),
      map((categories) => {
        const newCategories = categories.map((c) => ({ id: c._id, name: c.name }));

        return includeAll
          ? [
              {
                id: 'all',
                name: 'All'
              },
              ...newCategories
            ]
          : newCategories;
      })
    );
  }
}
