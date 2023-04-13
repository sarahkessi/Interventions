import { AbstractControl, ValidatorFn } from '@angular/forms';

export class VerifierCaracteresMaximumValidator {
  static longueurMaximale(max: number): ValidatorFn {
    return (c: AbstractControl): { [key: string]: boolean } | null => {
      // Vérifier s'il y a une valeur et si oui sa longueur est inférieure ou égale à min
      if (c.value && c.value.trim().length <= max) {
        return null; // succès.  Tout est valide.
      }

      if (c.value && c.value.trim().length > max) {
        return { nbreCaracteresExcessif: true };
      }
      return null;
    };
  }
}
