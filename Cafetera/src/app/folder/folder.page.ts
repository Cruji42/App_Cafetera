import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import {HttpClient} from "@angular/common/http";


@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  // Data
  chartData: ChartDataSets[] = [{ data: [], label: 'Stock price' }];
  chartLabels: Label[];

  // Options
  chartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Historic Stock price'
    },
    pan: {
      enabled: true,
      mode: 'xy'
    },
    zoom: {
      enabled: true,
      mode: 'xy'
    }
  };
  chartColors: Color[] = [
    {
      borderColor: '#000000',
      backgroundColor: '#ff00ff'
    }
  ];
  chartType = 'line';
  showLegend = false;

  // For search
  stock = '';
  public folder: string;

  constructor(private activatedRoute: ActivatedRoute, public http: HttpClient ) { }
  getData() {
    this.http.get(`https://financialmodelingprep.com/api/v3/historical-price-full/${this.stock}?from=2018-03-12&to=2019-03-12`).subscribe(res => {
      const history = res['historical'];

      this.chartLabels = [];
      this.chartData[0].data = [];

      for (let entry of history) {
        this.chartLabels.push(entry.date);
        this.chartData[0].data.push(entry['close']);
      }
    });
  }

  typeChanged(e) {
    const on = e.detail.checked;
    this.chartType = on ? 'line' : 'bar';
  }
  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

}
