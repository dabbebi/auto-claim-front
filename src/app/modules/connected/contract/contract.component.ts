import { DatePipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { LocaleSettings } from 'primeng/calendar';
import { ContractService } from 'src/app/services/contract/contract.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})

export class ContractComponent {

  contractList: any[] = [];
  selectedContracts: any[] = [];
  contractDialog: Boolean = false;
  deleteContractDialog: Boolean = false;
  contractDialogTitle: string = '';
  currentContractNo: string = '';
  currentContract: object = {};
  currentMode: string = '';
  endDateError: Boolean = false;
  deleteMode: string = '';
  contractForm = new FormGroup({
    startDate: new FormControl(new Date(), [Validators.required]),
    endDate: new FormControl(new Date(), [Validators.required]),
    insuredName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]),
    vehicleRegistrationNo: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(25)])
  });

  
  calendar_fr: LocaleSettings ;
  currentContractCreationDate: Date = new Date();
  isContractDetails: Boolean = false;
  constructor(private contractService: ContractService, private datepipe: DatePipe, private messageService: MessageService) {
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
    this.getAllContracts();
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  get startDate() {
    return this.contractForm.get('startDate');
  }

  get endDate() {
    return this.contractForm.get('endDate');
  }

  get vehicleRegistrationNo() {
    return this.contractForm.get('vehicleRegistrationNo');
  }

  get insuredName() {
    return this.contractForm.get('insuredName');
  }

  showAddContractDialog() {
    this.contractForm.setValue({
      startDate: new Date(),
      endDate: new Date(),
      vehicleRegistrationNo: '',
      insuredName: ''
    });
    this.currentMode = 'add';
    this.contractDialogTitle = 'Créer un contrat';
    this.contractDialog = true;
  }

  showEditContractDialog(contract: any) {
    this.currentContract = contract;
    this.currentContractNo = contract.contractNo;
    this.contractForm.setValue({
      startDate: new Date(contract.startDate.split('/')[2], +(contract.startDate.split('/')[1]) - 1, contract.startDate.split('/')[0]),
      endDate: new Date(contract.endDate.split('/')[2], +(contract.endDate.split('/')[1]) - 1, contract.endDate.split('/')[0]),
      insuredName: contract.insuredName,
      vehicleRegistrationNo: contract.vehicleRegistrationNo
    });
    this.currentMode = 'edit';
    this.contractDialogTitle = 'Modifier le contrat n° ' + contract.contractNo;
    this.contractDialog = true;
  }

  hideContractDialog() {
    this.contractDialog = false;
  }

  showDeleteContractDialog(currentContractNo: string, deleteMode: string) {
    this.deleteMode = deleteMode;
    this.currentContractNo = currentContractNo;
    this.deleteContractDialog = true;
  }

  hideDeleteContractDialog() {
    this.deleteContractDialog = false;
  }

  moveToContractDetails(contractNo: string) {
    this.currentContractNo = contractNo;
    this.isContractDetails = true;
  }

  backToContractPage() {
    this.isContractDetails = false;
  }

  getSeverity(status: string) {
    if (status == 'Valide') {
            return 'success';
    } else {
      return 'warning';
    }
  }

  getStatus(date: string) {
    let today = new Date();
    let endDate : Date = new Date(+date.split('/')[2], +date.split('/')[1], +date.split('/')[0]);
    if(endDate < today) {
      return 'Expiré';
    } else {
      return 'Valide';
    }
  }

  getAllContracts() {
    this.contractService.getAllContracts().subscribe((response: any) => {
      console.log(response);
      for(let i = 0; i< response?.length; i++) {
        response[i].startDate = this.datepipe.transform(response[i].startDate, 'dd/MM/yyyy');
        response[i].endDate = this.datepipe.transform(response[i].endDate, 'dd/MM/yyyy');
        response[i].status = this.getStatus(response[i].endDate);
      }
      this.contractList = response;
    },
    (error : HttpErrorResponse)=>{
      console.log(error.message);
    });
  }

  deleteOneContract() {
    this.contractService.deleteOneContract(this.currentContractNo).subscribe((response: any) => {
      this.getAllContracts();
      this.hideDeleteContractDialog();
      this.messageService.add({ severity: 'success', summary: "Suppression d'un contrat", detail: 'Contrat n°' + response.contractNo + 'a été supprimé.' });
    },
    (error: HttpErrorResponse) => {
      this.hideDeleteContractDialog();
      console.log(error.message);
      this.messageService.add({ severity: 'error', summary: "Suppression d'un contrat", detail: 'La suppression du contrat à échouée' });
    });
  }

  deleteMultipleContracts() {
    let contractsToDelete: any[] = [];
    this.selectedContracts.forEach(contract => contractsToDelete.push(contract.contractNo));
    this.contractService.deleteMultipleContract(contractsToDelete).subscribe((response: any) => {
      this.getAllContracts();
      this.hideDeleteContractDialog();
      this.messageService.add({ severity: 'success', summary: "Suppression de contrats", detail: 'Les contrats sélectionnés ont été supprimé.' });
    },
    (error: HttpErrorResponse) => {
      this.hideDeleteContractDialog();
      console.log(error.message);
      this.messageService.add({ severity: 'error', summary: "Suppression de contrats", detail: 'La suppression des contrats sélectionnés à échouée' });
    });
  }

  deleteContract() {
    if(this.deleteMode == 'single') {
      this.deleteOneContract();
    }else {
      this.deleteMultipleContracts();
    }
  }

  saveContract() {
    if(this.currentMode === 'add') {
      this.createContract();
    } else {
      this.updateContract();
    }
  }

  createContract() {
    this.endDateError = false;
    if(false){
      this.endDateError = true;
    }
    if(this.contractForm.valid && !this.endDateError) {
      var contract = {
        startDate: this.contractForm.value.startDate,
        endDate: this.contractForm.value.endDate,
        insuredName: this.contractForm.value.insuredName,
        vehicleRegistrationNo: this.contractForm.value.vehicleRegistrationNo,
      };
      this.contractService.createContract(contract).subscribe((response: any) => {
        this.hideContractDialog();
        this.messageService.add({ severity: 'success', summary: "Création d'un contrat", detail: 'Contrat n°' + response.contractNo + 'a été crée.' });
        this.getAllContracts();
      },(error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: "Création d'un contrat", detail: 'La création du contrat à échouée!'});
        console.log(error.message); 
      });
    }else {
      this.messageService.add({ severity: 'error', summary: "Création d'un contrat", detail: "Le formulaire n'est pas valide!" });
    }
  }

  updateContract() {
    this.endDateError = false;
    if(false){
      this.endDateError = true;
    }
    if(this.contractForm.valid && !this.endDateError) {
      var contract = {
        startDate: this.contractForm.value.startDate,
        endDate: this.contractForm.value.endDate,
        insuredName: this.contractForm.value.insuredName,
        vehicleRegistrationNo: this.contractForm.value.vehicleRegistrationNo,
      };
      this.contractService.updateContract(this.currentContractNo, contract).subscribe((response: any) => {
        this.hideContractDialog();
        this.messageService.add({ severity: 'success', summary: "Modification d'un contrat", detail: 'Contrat n°' + response.contractNo + 'a été crée.' });
        this.getAllContracts();
      },(error: HttpErrorResponse) => {
        this.messageService.add({ severity: 'error', summary: "Modification d'un contrat", detail: 'La modification du contrat à échouée!'});
        console.log(error.message); 
      });
    }else {
      this.messageService.add({ severity: 'error', summary: "Modification d'un contrat", detail: "Le formulaire n'est pas valide!" });
    }
  }
}