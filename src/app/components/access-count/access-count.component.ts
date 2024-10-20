import { isPlatformBrowser, CommonModule } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-access-count',
  standalone: true,
  imports: [BaseChartDirective, CommonModule
  ],
  templateUrl: './access-count.component.html',
  styleUrls: ['./access-count.component.scss']
})
export class AccessCountComponent implements OnInit {


  // Array para armazenar contagens de acessos por mês

  monthlyAccessCounts: number[] = new Array(12).fill(0);
  chartData!: ChartData<'bar'>;
  chartOptions: ChartOptions<'bar'> = {
    responsive: true
  };

  isBrowser: Object;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    this.trackMonthlyAccess();
    this.setupChart();

  }

  trackMonthlyAccess(): void {
    // Fallback simples caso localStorage não esteja disponível
    try {
      if (isPlatformBrowser(this.platformId)) {
        let accessHistory = localStorage.getItem('monthlyAccessHistory');
        if (accessHistory) {
          this.monthlyAccessCounts = JSON.parse(accessHistory);
        }

        const currentMonth = new Date().getMonth();
        this.monthlyAccessCounts[currentMonth]++;

        localStorage.setItem('monthlyAccessHistory', JSON.stringify(this.monthlyAccessCounts));
      } else {
        console.warn('Não está rodando no navegador. localStorage não está disponível.');
      }
    } catch (error) {
      console.error('Erro ao acessar localStorage:', error);
    }
  }


  setupChart(): void {
    const months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];

    this.chartData = {
      labels: months,
      datasets: [
        {
          label: 'Acessos por Mês',
          data: this.monthlyAccessCounts,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }
      ]
    };
  }
}