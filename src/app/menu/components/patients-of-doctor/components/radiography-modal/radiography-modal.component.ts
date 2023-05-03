import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { SafeResourceUrl } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { EMPTY, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { PatientDTO } from 'src/app/register/models/register.model';
import { ToastService } from 'src/app/shared/components/toasts-container/toasts.service';
import { PatientService } from 'src/app/shared/services/patient.service';
import { FotoService } from 'src/app/shared/services/photo.service';

@Component({
  selector: 'ado-radiography-modal',
  templateUrl: './radiography-modal.component.html',
  styleUrls: ['./radiography-modal.component.scss'],
})
export class RadiographyModalComponent implements OnInit, OnDestroy {
  @Input() selectedPatient;
  imageView: SafeResourceUrl;
  imageNotExist = false;
  imageSrc: SafeResourceUrl = null;
  selectedImage: any;
  active = 1;
  patient: PatientDTO;
  private readonly subscriptionRadiographyModal: Subscription =
    new Subscription();

  constructor(
    private photoService: FotoService,
    private activeModal: NgbActiveModal,
    private toastService: ToastService,
    private patientService: PatientService
  ) {}

  ngOnInit() {
    console.log(this.selectedPatient);
    this.subscriptionRadiographyModal.add(
      this.photoService
        .getImage(this.selectedPatient.id)
        .pipe(
          catchError(() => {
            this.imageNotExist = true;
            return EMPTY;
          })
        )
        .subscribe((image) => {
          this.imageNotExist = false;
          this.imageView = image.image;
        })
    );

    this.subscriptionRadiographyModal.add(
      this.patientService
        .getPatientInfos(this.selectedPatient.id)
        .subscribe((vl) => {
          this.patient = vl;
        })
    );
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    this.uploadImages(files);
  }

  uploadImages(files: any) {
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        if (this.isPngOrJpg(files[0].name)) {
          this.imageSrc = event.target.result;
          this.selectedImage = files[0];
        } else {
          this.toastService.showError(
            'Poti adauga doar imagini cu extensia jpg, jpeg sau png!'
          );
        }
      };
      reader.readAsDataURL(files[0]);
    }
  }

  onSaveImage() {
    this.photoService.saveImage(this.selectedImage, this.selectedPatient.id);
  }

  private isPngOrJpg(url: string): boolean {
    return (
      url.endsWith('.png') || url.endsWith('.jpg') || url.endsWith('.jpeg')
    );
  }

  onClose(): void {
    this.activeModal.close();
  }

  ngOnDestroy() {
    if (this.subscriptionRadiographyModal)
      this.subscriptionRadiographyModal.unsubscribe();
  }
}
