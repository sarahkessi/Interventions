import { AbstractControl } from "@angular/forms";
import { VerifierCaracteresMaximumValidator} from "./longueur-maximale.component";
import { noop } from "rxjs";

describe('longueur zone Validator', () => {
    it ('Une chaîne avec 10 espaces est invalide', () =>  {
        let control = { value: ' '.repeat(10)}
        let validatorFn = VerifierCaracteresMaximumValidator.longueurMaximale(50);
        let result = validatorFn(control as AbstractControl);
        expect(result['nbreCaracteresExcessif']).toBe(true);
    });

    // it ('#8 Une phrase avec des mots est valide', () => {
    //     let control = { value : "Vive angular"}
    //     let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
    //     let result = validatorFn(control as AbstractControl);
    //     expect(result).toBeNull;
    // });

    // it ('#9 Une phrase avec 3 espaces, des mots et ensuite 3 espaces est valide', () => {
    //     let control = { value : "je le veux"}
    //     let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
    //     let result = validatorFn(control as AbstractControl);
    //     expect(result).toBeNull;
    // });

    // it ('#10 Une phrase avec 1 espace et 2 caractères est invalide', () => {
    //     let control = { value: ' xx'};
    //     let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
    //     let result = validatorFn(control as AbstractControl);
    //     expect(result['nbreCaracteresInsuffisant']).toBe(true);
    // });

    // it ('#11 Une phrase avec 2 espaces et 1 caractère est invalide', () => {
    //     let control = { value: '  x'};
    //     let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
    //     let result = validatorFn(control as AbstractControl);
    //     expect(result['nbreCaracteresInsuffisant']).toBe(true);
    // });

    // it ('#12 Une phrase avec 3 espaces et 3 caractères est valide', () => {
    //     let control = { value: '   xxx'};
    //     let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
    //     let result = validatorFn(control as AbstractControl);
    //     expect(result).toBeNull;
    // });

    // it ('#13 Une phrase avec 5 espaces et 5 caractères est valide', () => {
    //     let control = { value: '     xxxxx'};
    //     let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
    //     let result = validatorFn(control as AbstractControl);
    //     expect(result).toBeNull;
    // });

    // it ('#14 Une chaîne null est invalide', () => {
    //     let validatorFn = VerifierCaracteresValidator.longueurMinimum(3);
    //     let control = { value: null};
    //     let result = validatorFn(control as AbstractControl);
    //     expect(result['nbreCaracteresInsuffisant']).toBe(true);
    // });
    
});