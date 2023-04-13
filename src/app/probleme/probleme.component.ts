import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VerifierCaracteresValidator } from '../shared/longueur-minimum/longueur-minimum.component';
import { VerifierCaracteresMaximumValidator } from '../shared/longueur-maximale/longueur-maximale.component';
import { TypesProblemeService } from './types-probleme.service';
import { ITypeProbleme } from './typesProbleme';
import { emailMatcherValidator } from '../shared/email-matcher/email-matcher.component';

@Component({
  selector: 'inter-probleme',
  templateUrl: './probleme.component.html',
  styleUrls: ['./probleme.component.css'],
})
export class ProblemeComponent implements OnInit {
  problemeForm: FormGroup;
  typesProbleme: ITypeProbleme[];
  errorMessage: string;

  constructor(
    private FormGroup: FormBuilder,
    private typeproblemeService: TypesProblemeService
  ) {}

  ngOnInit() {
    this.problemeForm = this.FormGroup.group({
      prenom: [
        '',
        [VerifierCaracteresValidator.longueurMinimum(3), Validators.required],
      ],
      nom: [
        '',
        [
          VerifierCaracteresMaximumValidator.longueurMaximale(50),
          Validators.required,
        ],
      ],
      noTypeProbleme: ['', [Validators.required]],
      courrielGroup: this.FormGroup.group({
        courriel: [{ value: '', disabled: true }],
        courrielConfirmation: [{ value: '', disabled: true }],
      }),
      telephone: [{ value: '', disabled: true }],
    });

    this.typeproblemeService.obtenirTypesProbleme().subscribe(
      (typesProbleme) => (this.typesProbleme = typesProbleme),
      (error) => (this.errorMessage = <any>error)
    );
  }

  save(): void {}

  setNotification(notifyVia: string): void {
    const courrielGroupControl = this.problemeForm.get('courrielGroup');
    const courrielControl = this.problemeForm.get('courrielGroup.courriel');
    const courrielConfirmationControl = this.problemeForm.get(
      'courrielGroup.courrielConfirmation'
    );
    const telephoneControl = this.problemeForm.get('telephone');

    // Tous remettre à zéro (plus simple)
    courrielControl.clearValidators();
    courrielControl.reset(); // Pour enlever les messages d'erreur si le controle contenait des données invaldides
    courrielControl.disable();
    courrielConfirmationControl.clearValidators();
    courrielConfirmationControl.reset();
    courrielConfirmationControl.disable();
    telephoneControl.clearValidators();
    telephoneControl.reset(); // Pour enlever les messages d'erreur dûs à dirty, etc..
    telephoneControl.disable();

    if (notifyVia === 'courriel') {
      courrielGroupControl.setValidators([
        Validators.compose([emailMatcherValidator.courrielDifferents()]),
      ]);
      courrielControl.setValidators([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+'),
      ]);
      courrielConfirmationControl.setValidators([
        Validators.required,
        Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+'),
      ]);
      courrielControl.enable();
      courrielConfirmationControl.enable();
    } else {
      if (notifyVia === 'messageTexte') {
        telephoneControl.setValidators([
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern('[0-9]+'),
        ]);
        telephoneControl.enable();
      }
      courrielControl.updateValueAndValidity();
      courrielConfirmationControl.updateValueAndValidity();
      telephoneControl.updateValueAndValidity();
    }
  }
}
