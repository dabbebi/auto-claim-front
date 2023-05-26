import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { backendUrl } from 'src/app/services/back-end-url';
import { ClaimService } from 'src/app/services/claim/claim.service';

@Component({
  selector: 'app-claim-details',
  templateUrl: './claim-details.component.html',
  styleUrls: ['./claim-details.component.css']
})
export class ClaimDetailsComponent {

  @Input() claimNo: string = '';
  claimDetails: any = { };
  contractDetails: any = {};
  pictures: any[] = [];
  pictureToShow: string = '';

  constructor(private claimService: ClaimService, private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getClaimDetails();
  }

  backEndUrl: string = backendUrl;
  viewPictureDialog: Boolean = false;

  hideViewPictureDialog() {
    this.viewPictureDialog = false;
  }

  showPicture(id: string) {
    this.pictureToShow = id;
    this.viewPictureDialog = true;
  }

  showNextPicture() {
    let index = 0;
    for(index = 0; index < this.pictures.length; index ++) {
      if(this.pictures[index].publicId == this.pictureToShow) {
        break;
      }
    }
    if(index === this.pictures.length - 1) {
      this.pictureToShow = this.pictures[0].publicId;
    }else {
      this.pictureToShow = this.pictures[index + 1].publicId ;
    }
  }

  showPreviousPicture() {
    let index = 0;
    for(index = 0; index < this.pictures.length; index ++) {
      if(this.pictures[index].publicId == this.pictureToShow) {
        break;
      }
    }
    if(index === 0) {
      this.pictureToShow = this.pictures[this.pictures.length - 1].publicId;
    }else {
      this.pictureToShow = this.pictures[index - 1].publicId ;
    }
  }

  getMonth(month: string) {
    const months = [
      "Javier",
      "Févrié",
      "Mars",
      "Avril",
      "Mai",
      "Juin",
      "Juillet",
      "Aout",
      "Septembre",
      "Octobre",
      "Novembre",
      "Décembre"
    ]
    return months[+month - 1];
  }

  getClaimSeverity(status: string) {
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

  getContractSeverity(status: string) {
    if(status == 'Valide') {
      return 'success';
    }else {
      return 'warning';
    }
  }

  getClaimStatus(status: string) {
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

  getContractStatus(date: string) {
    let today = new Date();
    let formattedDate = this.datepipe.transform(date, 'dd/MM/yyyy') + '';
    let endDate = new Date(+formattedDate.split('/')[2], +formattedDate.split('/')[1] - 1, +formattedDate.split('/')[0]);
    if(endDate < today) {
      return 'Expiré';
    } else {
      return 'Valide';
    }
  }

  formatDate(date: string) {
    return date.split('/')[0] + ' ' + this.getMonth(date.split('/')[1]) + ' ' + date.split('/')[2];
  }

  getClaimDetails() {
    this.claimService.getOneClaim(this.claimNo).subscribe((response: any) => {
      console.log(response);
      this.claimDetails = response;
      this.claimDetails.accidentDate = this.formatDate(this.datepipe.transform(this.claimDetails.accidentDate, 'dd/MM/yyyy') + '');
      this.claimDetails.creationDate = this.formatDate(this.datepipe.transform(this.claimDetails.creationDate, 'dd/MM/yyyy') + '');
      this.claimDetails.status = this.getClaimStatus(this.claimDetails.status);
      this.contractDetails = response.contract;
      this.contractDetails.status = this.getContractStatus(this.contractDetails.endDate);
      this.contractDetails.startDate = this.formatDate(this.datepipe.transform(this.contractDetails.startDate, 'dd/MM/yyyy') + '');
      this.contractDetails.endDate = this.formatDate(this.datepipe.transform(this.contractDetails.endDate, 'dd/MM/yyyy') + '');
      this.pictures = response.pictures;
    },
    (error : HttpErrorResponse)=>{
      console.log(error.message);
    });
  }
}