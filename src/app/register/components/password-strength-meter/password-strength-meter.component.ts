import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Item } from '../../models/register.model';

@Component({
  selector: 'ado-password-strength-meter',
  templateUrl: './password-strength-meter.component.html',
  styleUrls: ['./password-strength-meter.component.scss'],
})
export class PasswordStrengthMeterComponent implements OnChanges {
  @Input() password?: string;
  @Input() minLength = 8;
  @Input() numberCheck?: boolean = true;
  @Input() specialCharCheck?: boolean = true;
  @Input() smallcaseCheck?: boolean = true;
  @Input() uppercaseCheck?: boolean = true;

  @Output() strengthChange = new EventEmitter<number>();
  public strengthText = '';
  public score = 0;
  public feedbackArr: Array<Item> = [];

  ngOnChanges(changes: SimpleChanges) {
    if (changes.password) {
      this.checkStrength();
    }
  }

  /*
 Checks the strength of a password based on criterions, 
 In this case length, special characters, numbers, lowercase and uppercase letters. 
 It calculates a score based on how many criteria are met and assigns a corresponding strength text to the password.
*/
  checkStrength(): void {
    let totalCriteria = 1; //One is always there because there will be at least 8 char length check
    totalCriteria = this.numberCheck ? totalCriteria + 1 : totalCriteria;
    totalCriteria = this.specialCharCheck ? totalCriteria + 1 : totalCriteria;
    totalCriteria = this.smallcaseCheck ? totalCriteria + 1 : totalCriteria;
    totalCriteria = this.uppercaseCheck ? totalCriteria + 1 : totalCriteria;
    this.feedbackArr = [];
    this.score = 0;
    this.score = this.isLengthMet()
      ? this.score + parseFloat((100 / totalCriteria).toFixed(2))
      : this.score;
    this.score =
      this.specialCharCheck && this.isSpecialCharMet()
        ? this.score + parseFloat((100 / totalCriteria).toFixed(2))
        : this.score;
    this.score =
      this.numberCheck && this.isNumberMet()
        ? this.score + parseFloat((100 / totalCriteria).toFixed(2))
        : this.score;
    this.score =
      this.smallcaseCheck && this.isSmallcaseMet()
        ? this.score + parseFloat((100 / totalCriteria).toFixed(2))
        : this.score;
    this.score =
      this.uppercaseCheck && this.isUppercaseMet()
        ? this.score + parseFloat((100 / totalCriteria).toFixed(2))
        : this.score;
    this.getStrengthText();
  }

  /*
  Functions isSpecialCharMet(), isNumberMet(), isSmallcaseMet(), isUppercaseMet() and  isLengthMet()
are used to validate the password, i.e. a string, so that it meets the conditions imposed
*/

  /*
  Purpose: Checks if the password property contains at least one special character.
  Returns: A Boolean value indicating if there is at least one special character in the password property.
  Side Effects: Modifies the feedbackArr array by adding an element with a label and a corresponding status.
  Behavior:
1. Tests the password property to see if it contains at least one special character using a regular expression.
2. If the password property contains at least one special character, adds an element to the feedbackArr array with the localized label "At least one special character" and a status of true.
3. If the password property does not contain any special characters, adds an element to the feedbackArr array with the localized label "At least one special character" and a status of false.
4. Returns true if there is at least one special character in the password property, otherwise returns false.
*/
  isSpecialCharMet(): boolean {
    if (/[!@#$%*]/.test(this.password!)) {
      this.feedbackArr.push({
        label: `Cel putin un caracter special`,
        status: true,
      });
      return true;
    } else {
      this.feedbackArr.push({
        label: `Cel putin un caracter special`,
        status: false,
      });
      return false;
    }
  }

  /*
  Purpose: Checks if the password property contains at least one number.
  Returns: A Boolean value indicating if there is at least one number in the password property.
  Side Effects: Modifies the feedbackArr array by adding an element with a label and a corresponding status.
  Behavior:
1. Tests the password property to see if it contains at least one number using a regular expression.
2. If the password property contains at least one number, adds an element to the feedbackArr array with the label "One number" and a status of true.
3. If the password property does not contain any numbers, adds an element to the feedbackArr array with the label "One number" and a status of false.
4. Returns true if there is at least one number in the password property, otherwise returns false.
*/
  isNumberMet(): boolean {
    if (/[0-9]/.test(this.password!)) {
      this.feedbackArr.push({
        label: `Cel putin un numar`,
        status: true,
      });
      return true;
    } else {
      this.feedbackArr.push({
        label: `Cel putin un numar`,
        status: false,
      });
      return false;
    }
  }

  /*
  Purpose: Checks if the password property contains at least one lowercase letter.
  Returns: A Boolean value indicating if there is at least one lowercase letter in the password property.
  Side Effects: Modifies the feedbackArr array by adding an element with a label and a corresponding status.
*/
  isSmallcaseMet(): boolean {
    if (/[a-z]/.test(this.password!)) {
      this.feedbackArr.push({
        label: `Cel putin o litera mica`,
        status: true,
      });
      return true;
    } else {
      this.feedbackArr.push({
        label: `Cel putin o litera mica`,
        status: false,
      });
      return false;
    }
  }

  /*
  Purpose: Checks if the password property contains at least one uppercase letter.
  Returns: A Boolean value indicating if there is at least one uppercase letter in the password property.
  Side Effects: Modifies the feedbackArr array by adding an element with a label and a corresponding status.
*/
  isUppercaseMet(): boolean {
    if (/[A-Z]/.test(this.password!)) {
      this.feedbackArr.push({
        label: `Cel putin o litera mare`,
        status: true,
      });
      return true;
    } else {
      this.feedbackArr.push({
        label: `Cel putin o litera mare`,
        status: false,
      });
      return false;
    }
  }

  /*
  Purpose: Checks if the length of the password property is at least as long as the minimum length specified in the minLength property.
  Returns: A Boolean value indicating if the length of the password property is at least as long as the minimum length specified in the minLength property.
  Side Effects: Modifies the feedbackArr array by adding an element with a label and a corresponding status.
*/
  isLengthMet(): boolean {
    if (this.password!.length >= this.minLength) {
      this.feedbackArr.push({
        label: `Minim ${this.minLength} caractere`,
        status: true,
      });
      return true;
    } else {
      this.feedbackArr.push({
        label: `Minim ${this.minLength} caractere`,
        status: false,
      });
      return false;
    }
  }

  /*
  Purpose: Sets the value of the strengthText property based on the current score property value.
  Returns: Void.
  Side Effects: Modifies the value of the strengthText property.
*/
  getStrengthText(): void {
    this.strengthText = '';
    switch (this.score) {
      case 1:
      case 20:
      case 25:
        this.strengthText = `Prea scurt`;
        break;
      case 2:
      case 33.33:
      case 40:
        this.strengthText = `Slab`;
        break;
      case 3:
      case 60:
      case 50:
      case 66.66:
        this.strengthText = `Echitabil`;
        break;
      case 4:
      case 80:
      case 75:
        this.strengthText = `Bine`;
        break;
      case 5:
      case 100:
      case 99.99:
        this.strengthText = `Puternic`;
        break;
    }
  }
}
