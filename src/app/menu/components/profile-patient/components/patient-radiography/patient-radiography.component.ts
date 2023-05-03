import { Component, OnDestroy, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EMPTY, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FotoService } from 'src/app/shared/services/photo.service';

@Component({
  selector: 'ado-patient-radiography',
  templateUrl: './patient-radiography.component.html',
  styleUrls: ['./patient-radiography.component.scss'],
})
export class PatientRadiographyComponent implements OnInit, OnDestroy {
  imageSubscription: Subscription;
  imageView: SafeResourceUrl;
  images: SafeResourceUrl[];
  imageNotExist: Boolean;

  constructor(
    private photoService: FotoService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.imageNotExist = false;
    this.photoService
      .getImageForAPatient()
      .pipe(
        catchError(() => {
          this.imageNotExist = true;
          return EMPTY;
        })
      )
      .subscribe((image) => {
        this.imageNotExist = false;
        this.imageView = image.image;
      });
      console.log(this.imageNotExist);
  }

  onClose(): void {
    this.activeModal.close();
  }

  ngOnDestroy() {
    if (this.imageSubscription) this.imageSubscription.unsubscribe();
  }
}
