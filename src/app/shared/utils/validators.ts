import { AbstractControl, FormGroup, ValidatorFn } from '@angular/forms';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

export class CustomValidators {
    static reversedDatesValidator(formGroup: FormGroup): {
        [s: string]: boolean;
    } | null {
        const controls = formGroup.controls;
        if (controls) {
            const start = controls.startDate.value as NgbDateStruct;
            const end = controls.endDate.value as NgbDateStruct;

            if (start && end) {
                const startNgbDate = new NgbDate(
                    start.year,
                    start.month,
                    start.day
                );
                const endNgbDate = new NgbDate(end.year, end.month, end.day);

                if (
                    !startNgbDate.before(endNgbDate) &&
                    !startNgbDate.equals(endNgbDate)
                ) {
                    return {
                        datesAreReversed: true,
                    };
                }
            }
        }
        return null;
    }

    static confirmPasswordValidator(): ValidatorFn {
        return (
            control: AbstractControl
        ): { [key: string]: boolean } | null => {
            const password = control.get('password');
            const confirmPassword = control.get('confirmPassword');
            if (password?.value !== confirmPassword?.value) {
                return { passwordMismatch: true };
            }
            return null;
        };
    }

    static passwordValidator(
        control: AbstractControl
    ): { [key: string]: boolean } | null {
        const passwordRegex =
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9_])/;
        const valid = passwordRegex.test(control.value);

        if (!valid) {
            return { invalidPassword: true };
        }

        return null;
    }
}
