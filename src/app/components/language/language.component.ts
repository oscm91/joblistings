import { Component, Input, Output, EventEmitter } from '@angular/core';
import { JobModel } from 'src/app/shared/models/job.model';

@Component({
  selector: 'joblistings-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss'],
})
export class LanguageComponent {
  @Input() currentJob: JobModel | undefined;
  @Output() languageSelected = new EventEmitter<string>();


  sendToTag(event: Event) {
    const language = (<HTMLButtonElement>event.target).textContent;
    if (language) {
      this.languageSelected.emit(language); // Emite el evento con el idioma seleccionado
    }
  }
}
