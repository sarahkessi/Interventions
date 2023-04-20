import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap, catchError, throwError } from 'rxjs';
import { ITypeProbleme } from './typesProbleme';

@Injectable({
  providedIn: 'root',
})
export class TypesProblemeService {
  constructor(private http: HttpClient) {}

  private baseUrl = 'api/typesprobleme';

  obtenirTypesProbleme(): Observable<ITypeProbleme[]> {
    return this.http.get<ITypeProbleme[]>(this.baseUrl).pipe(
      tap((data) =>
        console.log('obtenirTypesProbleme: ' + JSON.stringify(data))
      ),
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
