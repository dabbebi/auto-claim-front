import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { StatService } from 'src/app/services/stat/stat.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  data: any;
  options: any;

  claimDataPie: any;
  claimOptionsPie: any;

  contractDataPie: any;
  contractOptionsPie: any;

  userCount: number = 0;
  validContractCount: number = 0;
  expiredContractCount: number = 0;
  openClaimCount: number = 0;
  expertiseClaimCount: number = 0;
  finishedClaimCount: number = 0;
  claimsPerMonth: number[] = [0,0,0,0,0,0,0,0,0,0,0,0];

  constructor(private statService: StatService) {}

  getStatistics() {
    this.statService.getStat().subscribe((response) => {
        
        this.userCount = response.userCount;
        this.validContractCount = response.validContractCount;
        this.expiredContractCount = response.expiredContractCount;
        this.openClaimCount = response.openClaimCount;
        this.expertiseClaimCount = response.expertiseClaimCount;
        this.finishedClaimCount = response.finishedClaimCount;
        this.claimsPerMonth = response.claimsPerMonth;

        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

        this.data = {
            labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
            datasets: [
                {
                    label: 'Nombre de sinistres',
                    data: this.claimsPerMonth,
                    fill: true,
                    borderColor: documentStyle.getPropertyValue('--teal-500'),
                    tension: 0.35
                }
            ]
        };

        this.options = {
            maintainAspectRatio: true,
            aspectRatio: 1,
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };


        this.claimDataPie = {
        labels: ['Ouvert', 'Expertise', 'Terminé'],
        datasets: [
            {
                data: [
                    this.openClaimCount,
                    this.expertiseClaimCount,
                    this.finishedClaimCount
                ],
                backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--teal-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--teal-400')]
            }
        ]
        };

        this.claimOptionsPie = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            }
        }
        };

        this.contractDataPie = {
        labels: ['Valide', 'Expiré'],
        datasets: [
            {
                data: [
                    this.validContractCount,
                    this.expiredContractCount
                ],
                backgroundColor: [documentStyle.getPropertyValue('--teal-500'), documentStyle.getPropertyValue('--yellow-500')],
                hoverBackgroundColor: [documentStyle.getPropertyValue('--teal-400'), documentStyle.getPropertyValue('--yellow-400')]
            }
        ]
        };

        this.contractOptionsPie = {
        plugins: {
            legend: {
                labels: {
                    usePointStyle: true,
                    color: textColor
                }
            }
        }
        };

    }, (error: HttpErrorResponse) => {
        console.log(error.message);
    })
  }

  ngOnInit() {
    this.getStatistics();
  }
}
