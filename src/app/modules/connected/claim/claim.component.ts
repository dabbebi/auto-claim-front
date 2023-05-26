import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LocaleSettings } from 'primeng/calendar';
import { ClaimDetails } from 'src/app/models/claimDetails.model';
import { backendUrl } from 'src/app/services/back-end-url';
import { ClaimService } from 'src/app/services/claim/claim.service';

@Component({
  selector: 'app-claim',
  templateUrl: './claim.component.html',
  styleUrls: ['./claim.component.css']
})
export class ClaimComponent {

  @Input() claimList: any[] = [];
  selectedClaims: any[] = [];
  claimDialog: Boolean = false;
  deleteClaimDialog: Boolean = false;
  claimDialogTitle: string = '';
  currentClaimNo: string = '';
  currentClaim: object | ClaimDetails = {};
  currentMode: string = '';
  uploadedPictures: any[] = [];
  removedPictures: any[] = [];
  url: string = '';
  accidentDateError: Boolean = false;
  deleteMode: string = '';
  claimForm = new FormGroup({
    accidentDate: new FormControl(new Date(), [Validators.required]),
    contractNo: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
    status: new FormControl(0)
  });
  statusList = [
    {
      label: 'Ouvert',
      value: 0
    },
    {
      label: 'Expertise',
      value: 1
    },
    {
      label: 'Terminé',
      value: 2
    }
  ];
  calendar_fr: LocaleSettings ;
  currentClaimCreationDate: Date = new Date();
  isClaimDetails: Boolean = false;
  currentPictures: any[] = [];
  backEndUrl: string= backendUrl;

  constructor(private claimService: ClaimService, private datepipe: DatePipe, private messageService: MessageService) {
    this.calendar_fr = {
      monthNames: [ "janvier", "février", "mars", "avril", "mai", "juin",
        "juillet", "août", "septembre", "octobre", "novembre", "décembre" ],
      monthNamesShort: [ "janv.", "févr.", "mars", "avr.", "mai", "juin",
        "juil.", "août", "sept.", "oct.", "nov.", "déc." ],
      dayNames: [ "dimanche", "lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi" ],
      dayNamesShort: [ "dim.", "lun.", "mar.", "mer.", "jeu.", "ven.", "sam." ],
      dayNamesMin: [ "D","L","M","M","J","V","S" ],
      firstDayOfWeek: 1,
      today: "Aujourd'hui"
    };
  }

  ngOnInit(): void {
    this.getAllClaims();
  }

  removePicture(id: string) {
    let newPictures : any[] = [];
    this.currentPictures.forEach(pic => {
      if(pic.publicId !== id) {
        newPictures.push(pic);
      } else {
        this.removedPictures.push({publicId: id});
      }
    });
    this.currentPictures = newPictures;
  }

  onUpload(event: any) {
    for(let file of event.files) {
        this.uploadedPictures.push(file);
    }
    console.log(this.uploadedPictures);
  }

  onRemove(event: any) {
    let tempPictures: any[] = this.uploadedPictures;
    this.uploadedPictures = [];
    tempPictures.forEach(elt => {
        if(elt !== event.file) {
          this.uploadedPictures.push(elt);
        }
    })
    console.log(this.uploadedPictures);
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  get accidentDate() {
    return this.claimForm.get('accidentDate');
  }

  get contractNo() {
    return this.claimForm.get('contractNo');
  }

  getStatusvalue(status: string) {
    const stList = [
      'Ouvert',
      'Expertise',
      'Terminé'
    ]
    return stList.indexOf(status);
  }

  showAddClaimDialog() {
    this.uploadedPictures = [];
    this.removedPictures = [];
    this.claimForm.setValue({
      accidentDate: new Date(),
      contractNo: '',
      status: 0
    });
    this.currentMode = 'add';
    this.claimDialogTitle = 'Créer un sinistre';
    this.claimDialog = true;
  }

  showEditClaimDialog(claim: any) {
    this.uploadedPictures = [];
    this.removedPictures = [];
    this.currentClaim = claim;
    this.currentClaimNo = claim.claimNo;
    this.currentPictures = claim.pictures;
    this.currentClaimCreationDate = new Date(claim.creationDate.split('/')[2], +(claim.creationDate.split('/')[1]) - 1, claim.creationDate.split('/')[0]);
    this.claimForm.setValue({
      accidentDate: new Date(claim.accidentDate.split('/')[2], +(claim.accidentDate.split('/')[1]) - 1, claim.accidentDate.split('/')[0]),
      contractNo: claim.contract.contractNo,
      status: this.getStatusvalue(claim.status)
    });
    this.currentMode = 'edit';
    this.claimDialogTitle = 'Modifier le sinistre n° ' + claim.claimNo;
    this.claimDialog = true;
  }

  hideClaimDialog() {
    this.claimDialog = false;
  }

  showDeleteClaimDialog(currentClaimNo: string, deleteMode: string) {
    this.deleteMode = deleteMode;
    this.currentClaimNo = currentClaimNo;
    this.deleteClaimDialog = true;
  }

  hideDeleteClaimDialog() {
    this.deleteClaimDialog = false;
  }

  moveToClaimDetails(claimNo: string) {
    this.currentClaimNo = claimNo;
    this.isClaimDetails = true;
  }

  backToClaimPage() {
    this.isClaimDetails = false;
  }

  getSeverity(status: string) {
    switch (status) {
        case 'Ouvert':
            return 'info';
        case 'Expertise':
            return 'warning';
        case 'Terminé':
            return 'success';
        default:
          return 'info';
    }
  }

  getStatus(status: string) {
    switch (status) {
        case 'OPEN':
            return 'Ouvert';
        case 'Expertise':
            return 'Expertise';
        case 'FINISHED':
            return 'Terminé';
        default:
          return 'info';
    }
  }

  getAllClaims() {
    this.claimService.getAllClaims().subscribe((response: any) => {
      console.log(response);
      for(let i = 0; i< response?.length; i++) {
        response[i].creationDate = this.datepipe.transform(response[i].creationDate, 'dd/MM/yyyy');
        response[i].accidentDate = this.datepipe.transform(response[i].accidentDate, 'dd/MM/yyyy');
        response[i].status = this.getStatus(response[i].status);
      }
      this.claimList = response;
    },
    (error : HttpErrorResponse)=>{
      console.log(error.message);
    });
  }

  deleteOneClaim() {
    this.claimService.deleteOneClaim(this.currentClaimNo).subscribe((response: any) => {
      this.getAllClaims();
      this.hideDeleteClaimDialog();
      this.messageService.add({ severity: 'success', summary: "Suppression d'un sinistre", detail: 'Sinistre n°' + response.claimNo + 'a été supprimé.' });
    },
    (error: HttpErrorResponse) => {
      this.hideDeleteClaimDialog();
      console.log(error.message);
      this.messageService.add({ severity: 'error', summary: "Suppression d'un sinistre", detail: 'La suppression du sinistre à échouée' });
    });
  }

  deleteMultipleClaims() {
    let claimsToDelete: any[] = [];
    this.selectedClaims.forEach(claim => claimsToDelete.push(claim.claimNo));
    this.claimService.deleteMultipleClaim(claimsToDelete).subscribe((response: any) => {
      this.getAllClaims();
      this.hideDeleteClaimDialog();
      this.messageService.add({ severity: 'success', summary: "Suppression de sinistres", detail: 'Les sinistres sélectionnés ont été supprimé.' });
    },
    (error: HttpErrorResponse) => {
      this.hideDeleteClaimDialog();
      console.log(error.message);
      this.messageService.add({ severity: 'error', summary: "Suppression de sinistres", detail: 'La suppression des sinistres sélectionnés à échouée' });
    });
  }

  deleteClaim() {
    if(this.deleteMode == 'single') {
      this.deleteOneClaim();
    }else {
      this.deleteMultipleClaims();
    }
  }

  saveClaim() {
    if(this.currentMode === 'add') {
      this.createClaim();
    } else {
      this.updateClaim();
    }
  }

  postNewClaim(pictures : any[]) {
    var claim = {
      accidentDate: this.claimForm.value.accidentDate,
      contractNo: this.claimForm.value.contractNo,
      status: this.claimForm.value.status,
      pictures: pictures
    };
    this.claimService.createClaim(claim).subscribe((response: any) => {
      this.hideClaimDialog();
      this.messageService.add({ severity: 'success', summary: "Création d'un sinistre", detail: 'Sinistre n°' + response.claimNo + 'a été crée.' });
      this.getAllClaims();
    },(error: HttpErrorResponse) => {
      this.messageService.add({ severity: 'error', summary: "Création d'un sinistre", detail: 'La création du sinistre à échouée!'});
      console.log(error.message); 
    });
  }

  createClaim() {
    this.accidentDateError = false;
    let today = new Date();
    if(this.claimForm.value.accidentDate !== null && this.claimForm.value.accidentDate !== undefined && this.claimForm.value.accidentDate > today){
      this.accidentDateError = true;
    }
    if(this.claimForm.valid && !this.accidentDateError) {
      if(this.uploadedPictures.length == 0) {
        this.postNewClaim([]);
      }else {
        this.claimService.uploadClaimPictures(this.uploadedPictures).subscribe((response: any) => {
          console.log(response);
          this.postNewClaim(response);
        }, (error: HttpErrorResponse) => {
          console.log(error.message);
        });
      }
    }else {
      this.messageService.add({ severity: 'error', summary: "Création d'un sinistre", detail: "Le formulaire n'est pas valide!" });
    }
  }

  postExistingClaim(pictures : any[]) {
    var claim = {
      accidentDate: this.claimForm.value.accidentDate,
      contractNo: this.claimForm.value.contractNo,
      status: this.claimForm.value.status,
      addedPictures: pictures,
      removedPictures: this.removedPictures
    };
    console.log(claim);
    
    this.claimService.updateClaim(this.currentClaimNo, claim).subscribe((response: any) => {
      this.hideClaimDialog();
      this.messageService.add({ severity: 'success', summary: "Modification d'un sinistre", detail: 'Sinistre n°' + response.claimNo + 'a été modifié.' });
      this.getAllClaims();
    },(error: HttpErrorResponse) => {
      this.messageService.add({ severity: 'error', summary: "Modification d'un sinistre", detail: 'La modification du sinistre à échouée!'});
      console.log(error.message); 
    });
  }

  updateClaim() {
    this.accidentDateError = false;
    if(this.claimForm.value.accidentDate !== null && this.claimForm.value.accidentDate !== undefined && this.claimForm.value.accidentDate > this.currentClaimCreationDate){
      this.accidentDateError = true;
    }
    if(this.claimForm.valid && !this.accidentDateError) {
      if(this.uploadedPictures.length == 0) {
        this.postExistingClaim([]);
      }else {
        this.claimService.uploadClaimPictures(this.uploadedPictures).subscribe((response: any) => {
          console.log(response);
          this.postExistingClaim(response);
        }, (error: HttpErrorResponse) => {
          console.log(error.message);
        });
      }
    }else {
      this.messageService.add({ severity: 'error', summary: "Modification d'un sinistre", detail: "Le formulaire n'est pas valide!" });
    }
  }
}
