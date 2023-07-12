import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { JobModel } from './shared/models/job.model';
import { JobService } from './shared/services/job.service';

@Component({
  selector: 'joblistings-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  jobs: JobModel[] = []; // Array para almacenar los trabajos
  JobsCopy: JobModel[] = []; // Copia del array de trabajos para filtrar
  languages: string[] = []; // Array para almacenar los lenguajes
  filteringTags: string[] = []; // Array para almacenar los tags de filtrado

  private unsubscribe$ = new Subject<void>(); // Subject para manejar la desuscripción de observables

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    // Obtener todos los trabajos al inicializar el componente
    this.jobService.getAllJobs().pipe(takeUntil(this.unsubscribe$)).subscribe((resp: any) => {
      this.jobs = resp;
      this.JobsCopy = this.jobs;
      this.languages = resp.languages;
    });

    // Suscribirse a los tags existentes para filtrar los trabajos
    this.jobService.existingTags.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      this.filteringTags = res;
      const filteringResult = this.filterFunc(this.filteringTags, this.jobs);
      if (filteringResult.length !== 0) {
        this.JobsCopy = filteringResult;
      }
    });

    // Suscribirse a los tags borrados para restablecer los trabajos
    this.jobService.clearedTags.pipe(takeUntil(this.unsubscribe$)).subscribe((res) => {
      this.JobsCopy = this.jobs;
    });
  }

  // Función para filtrar los trabajos basado en los tags
  filterFunc(filterTags: string[], jobs: JobModel[]) {
    return jobs.filter((job) => {
      if (
        filterTags.includes(job.level) ||
        filterTags.includes(job.role) ||
        filterTags.every((tag) => job.languages?.includes(tag))
      ) {
        return true;
      } else {
        return false;
      }
    });
  }

  // Función para manejar la selección de un lenguaje
  onLanguageSelected(language: string) {
    this.jobService.languageSelected.next(language);
  }

  // Función para manejar la destrucción del componente
  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
