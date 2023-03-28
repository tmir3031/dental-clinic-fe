import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';

@Component({
  selector: 'ado-initials-image',
  templateUrl: './initials-image.component.html',
  styleUrls: ['./initials-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InitialsImageComponent implements OnInit {
  @Input() username?: string;
  initials?: string;
  backgroundColor = '#293c7d';
  colorsArray = [
      '#800020',
      '#4b0082',
      '#008080',
      '#ff007f',
      '#ff6600',
      '#212121',
      '#616161',
      '#455A64',
      '#3D9970',
      '#01FF70',
      '#B10DC9',
      '#F012BE',
      '#0074D9',
      '#2ECC40',
      '#FFDC00',
      '#FF851B',
      '#FF4136',
  ];

  ngOnInit() {
      this.backgroundColor = this.getRandomColor();
      this.initials = this.getInitials();
  }

  getInitials(): string {
      const words = this.username?.split('.');
      const firstName = words![0];
      const lastName = words![1];
      return (
          firstName!.charAt(0).toUpperCase() +
          lastName!.charAt(0).toUpperCase()
      );
  }

  private getRandomColor() {
      const randomIndex = Math.floor(Math.random() * this.colorsArray.length);
      return this.colorsArray[randomIndex];
  }
}
