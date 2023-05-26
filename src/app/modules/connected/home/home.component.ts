import { Component } from '@angular/core';

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

  userCount: string = '2,250';
  validContractCount: number = 0;
  expiredContractCount: number = 0;
  openClaimCount: number = 0;
  expertiseClaimCount: number = 0;
  finishedClaimCount: number = 0;

  ngOnInit() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
        labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        datasets: [
            {
                label: 'Nombre de sinistres',
                data: [65, 59, 80, 81, 56, 55, 40, 54, 80, 65, 77, 52],
                fill: false,
                borderColor: documentStyle.getPropertyValue('--teal-700'),
                tension: 0.4
            }
        ]
    };

    this.options = {
        maintainAspectRatio: false,
        aspectRatio: 0.6,
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
              data: [540, 325, 702],
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
              data: [540, 325],
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


  }
}
