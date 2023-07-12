import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { JobService } from 'src/app/shared/services/job.service';

@Component({
  selector: 'joblistings-tag-container',
  templateUrl: './tag-container.component.html',
  styleUrls: ['./tag-container.component.scss'],
})
export class TagContainerComponent implements OnInit, OnDestroy {
  currentTags: string[] = []; // Almacena las etiquetas actuales
  private unsubscribe$ = new Subject<void>(); // Subject para manejar la desuscripción de observables

  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    // Suscripción al observable languageSelected del servicio jobService
    this.jobService.languageSelected.pipe(takeUntil(this.unsubscribe$)).subscribe(
      (lang) => {
        // Si la etiqueta no está ya en currentTags, la añade
        if (!this.currentTags.includes(lang.trim())) {
          this.currentTags.push(lang.trim());
          this.jobService.existingTags.next(this.currentTags); // Emite las etiquetas actuales
        }
      }
    );
  }

  ngOnDestroy(): void {
    // Emite el evento de desuscripción y completa el Subject
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  // Elimina una etiqueta de currentTags por su índice
  removeFromTag(id: number) {
    this.currentTags.splice(id, 1);
    // Si aún quedan etiquetas, las emite. Si no, emite el evento de etiquetas borradas
    this.currentTags.length !== 0
      ? this.jobService.existingTags.next(this.currentTags)
      : this.jobService.clearedTags.next(true);
  }

  // Borra todas las etiquetas y emite el evento de etiquetas borradas
  clearTags() {
    this.currentTags.length = 0;
    this.jobService.clearedTags.next(true);
  }
}
