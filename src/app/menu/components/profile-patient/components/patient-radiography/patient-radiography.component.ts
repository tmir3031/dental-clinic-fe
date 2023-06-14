import { Component, OnDestroy, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EMPTY, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ImageModel } from 'src/app/shared/models/image.model';
import { FotoService } from 'src/app/shared/services/photo.service';
import { Constants } from 'src/app/shared/utils/constants';

@Component({
  selector: 'ado-patient-radiography',
  templateUrl: './patient-radiography.component.html',
  styleUrls: ['./patient-radiography.component.scss'],
})
export class PatientRadiographyComponent implements OnInit, OnDestroy {
  imageSubscription: Subscription;
  imageView: SafeResourceUrl;
  imageView2: ImageModel;
  images: ImageModel[];
  imageNotExist: Boolean;
  dateFormat = Constants.DATE_FORMAT_DISPLAY;

  constructor(
    private photoService: FotoService,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.imageNotExist = false;
    this.photoService
      .getAllImagesForAPatient()
      .pipe(
        catchError(() => {
          this.imageNotExist = true;
          return EMPTY;
        })
      )
      .subscribe((image) => {
        if (image.length === 0) this.imageNotExist = true;
        else this.imageNotExist = false;
        this.images = image;
      });
  }

  onClose(): void {
    this.activeModal.close();
  }

  ngOnDestroy() {
    if (this.imageSubscription) this.imageSubscription.unsubscribe();
  }
}
