import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const ConfirmedValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const password = control.get('password');
  const confirm_password = control.get('confirm_password');
  if (confirm_password?.errors && !confirm_password.errors.confirmedValidator) {
    return null;
  }
  if (password?.value !== confirm_password?.value) {
    const error = { confirmedValidator: true };
    confirm_password?.setErrors(error);
    return error;
  } else {
    confirm_password?.setErrors(null);
    return null;
  }
};
