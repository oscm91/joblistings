import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JobModel } from '../models/job.model';

@Injectable({
  providedIn: 'root',
})
export class JobService implements OnDestroy {
  private unsubscribe$ = new Subject<void>(); // Subject para manejar la desuscripción de observables

  constructor(private http: HttpClient) {}

  jobSub?: Subscription; // Suscripción opcional para trabajos

  languageSelected = new Subject<string>();
  languageDeleted = new Subject<string>();

  existingTags = new Subject<string[]>();
  clearedTags = new Subject<boolean>();

  // Método para obtener todos los trabajos
  getAllJobs(): Observable<JobModel[]> {
    return this.http.get<JobModel[]>('assets/data.json').pipe(
      catchError(error => {
        console.error('Error occurred while fetching jobs', error); // Manejo de errores
        throw error;
      })
    );
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(); // Emite el evento de desuscripción
    this.unsubscribe$.complete(); // Completa el Subject
  }
}
