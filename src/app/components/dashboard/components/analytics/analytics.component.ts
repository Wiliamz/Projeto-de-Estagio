import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { AnalyticsService } from '../../../../services/analytics.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss',
})
export class AnalyticsComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  chartData: ChartData<'line'> = {
    labels: [],
    datasets: [
      {
        label: 'Usuários Ativos',
        data: [],
        borderColor: '#007bff',
        backgroundColor: 'rgba(0, 123, 255, 0.5)',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  chartOptions: ChartOptions = {
    responsive: false,
    maintainAspectRatio: false,
  };

  constructor(private analyticsService: AnalyticsService) {}

  ngOnInit(): void {
    this.analyticsService.getUserActivity().subscribe({
      next: (response) => {
        const rows = response.rows || [];

        // Atualiza os dados do gráfico
        this.chartData.labels = rows.map(
          (row: any) => row.dimensionValues[0].value
        ); // Datas
        this.chartData.datasets[0].data = rows.map(
          (row: any) => +row.metricValues[0].value
        ); // Usuários Ativos

        this.chart?.update(); // Atualiza o gráfico
      },
      error: (err) => console.error(err),
    });
  }
}
