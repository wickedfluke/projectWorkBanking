import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements AfterViewInit {
  @ViewChild('lineChart') lineChart!: ElementRef;
  @ViewChild('pieChart') pieChart!: ElementRef;

  user = {
    nome: 'Mario',
    cognome: 'Rossi',
    email: 'mariuszrossi99@gmail.com',
    iban: 'CH9789144829733648596',
    dataAperturaConto: '28/02/2004',
  };

  usciteMensili = [20, 30, 40, 50, 60, 70, 80, 90, 3000, 50, 30, 20];
  distribuzioneSpese = [10, 15, 20, 25, 30];

  constructor() {
    Chart.register(...registerables);
  }

  ngAfterViewInit() {
    this.createLineChart();
    this.createPieChart();
  }

  createLineChart() {
    new Chart(this.lineChart.nativeElement, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
          {
            label: 'Uscite Mensili',
            data: this.usciteMensili,
            borderColor: 'orange',
            fill: false,
            tension: 0.1,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }

  createPieChart() {
    new Chart(this.pieChart.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Cibo', 'Serata', 'Sigarette', 'Macchina', 'Appuntamenti'],
        datasets: [
          {
            data: this.distribuzioneSpese,
            backgroundColor: ['#FFA07A', '#FF7F50', '#FFD700', '#DAA520', '#FF6347'],
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
          },
        },
      },
    });
  }

  modificaPassword() {
    // Funzione per la modifica della password
  }
}
