import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ProblemeComponent } from './probleme.component';
import { TypesProblemeService } from './types-probleme.service';
import { HttpClientModule } from '@angular/common/http';

describe('ProblemeComponent', () => {
  let component: ProblemeComponent;
  let fixture: ComponentFixture<ProblemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, HttpClientModule],
      declarations: [ProblemeComponent],
      providers:[TypesProblemeService],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProblemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
     expect(component).toBeTruthy();
   });

  it('#1 Zone prénom invalide avec 2 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(2));
    expect(zone.valid).toBeFalsy();
  });

  it('#2 Zone prénom valide avec 3 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(3));
    expect(zone.valid).toBeTruthy();
  });

  it('#3 Zone prénom valide avec 200 caractères', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue('a'.repeat(200));
    expect(zone.valid).toBeTruthy();
  });

  it('#4 Zone prénom invalide avec aucune valeur', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(null);
    let errors = zone.errors || {};
    expect(errors['required']).toBeTruthy();
  });

  it('#5 Zone prénom invalide avec 10 espaces', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(' '.repeat(10));
    expect(zone.valid).toBeFalsy();
  });

  it('#6 Zone prénom invalide avec 2 espaces et 1 caractère', () => {
    let zone = component.problemeForm.controls['prenom'];
    zone.setValue(' '.repeat(2) + 'a');
    expect(zone.valid).toBeFalsy();
  });

  it('#15 | Zone TELEPHONE est désactivée quand ne pas me notifier', () => {
    component.setNotification('pasnotification');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED'); 
  });

  it('#16 | Zone TELEPHONE est vide quand ne pas me notifier', () => {
    component.setNotification('pasnotification');
    let zone = component.problemeForm.get('telephone');
    expect(zone.value).toEqual(null); 
  });

  it('#17 | Zone ADRESSE COURRIEL est désactivée quand ne pas me notifier', () => {
    component.setNotification('pasnotification');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('DISABLED'); 
  });

  it('#18 | Zone CONFIRMATION COURRIEL est désactivée quand ne pas me notifier', () => {
    component.setNotification('pasnotification');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('DISABLED'); 
  });

  it('#19 | Zone TELEPHONE est désactivée quand notifier par courriel', () => {
    component.setNotification('courriel');
    let zone = component.problemeForm.get('telephone');
    expect(zone.status).toEqual('DISABLED'); 
  });

  it('#20 | Zone ADRESSE COURRIEL est activée quand notifier par courriel', () => {
    component.setNotification('courriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.status).toEqual('INVALID'); 
  });

  it('#21 | Zone CONFIRMER COURRIEL est activée quand notifier par courriel', () => {
    component.setNotification('courriel');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.status).toEqual('INVALID'); 
  });

  it('#22 | Zone ADRESSE COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.setNotification('courriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    expect(zone.valid).toBeFalse(); 
  });

  it('#23 | Zone CONFIRMER COURRIEL est invalide sans valeur quand notifier par courriel', () => {
    component.setNotification('courriel');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    expect(zone.valid).toBeFalse(); 
  });

  it('#24 | Zone ADRESSE COURRIEL est invalide avec un format non conforme', () => {
    component.setNotification('courriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue("sarahkessi")
    expect(zone.valid).toBeFalse(); 
  });

  it('#25 | Zone ADRESSE COURRIEL sans valeur et Zone CONFIRMER COURRIEL avec valeur vaLide retourne null', () => {
    component.setNotification('courriel');
    let zone = component.problemeForm.get('courrielGroup.courrielConfirmation');
    zone.setValue("sarahkessi@gmail.com")
    let groupe= component.problemeForm.get('courrielGroup');
    expect(groupe.valid).toBeFalse(); 
  });

  it('#26 | Zone ADRESSE COURRIEL avec valeur valide et Zone CONFIRMER COURRIEL sans valeur retourne null', () => {
    component.setNotification('courriel');
    let zone = component.problemeForm.get('courrielGroup.courriel');
    zone.setValue("sarahkessi@gmail.com")
    let groupe= component.problemeForm.get('courrielGroup');
    expect(groupe.valid).toBeFalse(); 
  });

  it('#27 | Zone ADRESSE COURRIEL et CONFIRMER COURRIEL sont invalides si les valeurs sont différentes quand notifier par courriel', () => {
    component.setNotification('courriel');
    let courriel = component.problemeForm.get('courrielGroup.courriel');
    let emailConfirm = component.problemeForm.get('courrielGroup.courrielConfirmation');

    courriel.setValue("sarahkessi@gmail.com")
    emailConfirm.setValue("sarah@gmail.com")

    let groupe= component.problemeForm.get('courrielGroup');
    expect(groupe.valid).toBeFalse(); 
  });

  it('#27 | Zone ADRESSE COURRIEL et CONFIRMER COURRIEL sont valides si les valeurs sont identiques quand notifier par courriel', () => {
    component.setNotification('courriel');
    let courriel = component.problemeForm.get('courrielGroup.courriel');
    let emailConfirm = component.problemeForm.get('courrielGroup.courrielConfirmation');

    courriel.setValue("sarahkessi@gmail.com")
    emailConfirm.setValue("sarahkessi@gmail.com")

    let groupe= component.problemeForm.get('courrielGroup');
    expect(groupe.valid).toBeTrue(); 
  });

});
