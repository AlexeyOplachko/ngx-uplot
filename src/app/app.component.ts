import { Component } from '@angular/core';
import { ChartType } from 'projects/ngx-uplot/src/lib/models/chart.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'ngx-uplot2';
    type: ChartType = 'line';
    legend = true
    cursor = {
        show: true,
        x: true,
        y: true
    }
    data = {
        meta: [
            { name: 'run_id', type: 'UUID' },
            { name: 'query_num', type: 'UInt8' },
            { name: 'try_num', type: 'UInt8' },
            { name: 'time', type: 'Decimal(9, 3)' },
        ],
        data: [
            ['38c2c067-578a-459d-83de-b2af46d88b14', 1, 1, 0.002],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 1, 2, 0.037],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 1, 3, 0.002],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 2, 1, 0.303],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 2, 2, 0.02],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 2, 3, 0.02],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 3, 1, 0.476],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 3, 2, 0.071],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 3, 3, 0.069],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 4, 1, 1.897],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 4, 2, 0.086],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 4, 3, 0.083],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 5, 1, 1.871],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 5, 2, 0.207],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 5, 3, 0.19],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 6, 1, 3.442],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 6, 2, 0.514],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 6, 3, 0.52],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 7, 1, 0.002],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 7, 2, 0.002],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 7, 3, 0.002],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 8, 1, 0.034],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 8, 2, 0.022],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 8, 3, 0.021],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 9, 1, 2.429],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 9, 2, 0.886],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 9, 3, 0.895],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 10, 1, 2.142],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 10, 2, 1.034],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 10, 3, 1.042],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 11, 1, 0.898],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 11, 2, 0.309],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 11, 3, 0.302],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 12, 1, 1.294],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 12, 2, 0.371],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 12, 3, 0.371],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 13, 1, 2.346],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 13, 2, 1.088],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 13, 3, 1.111],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 14, 1, 4.135],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 14, 2, 1.636],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 14, 3, 1.613],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 15, 1, 3.487],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 15, 2, 1.35],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 15, 3, 1.349],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 16, 1, 1.881],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 16, 2, 1.048],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 16, 3, 1.008],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 17, 1, 4.564],
            ['38c2c067-578a-459d-83de-b2af46d88b14', 17, 2, 3.377],
        ]
    };
    toggleCursor() {
        this.cursor =  {
            show: !this.cursor.show,
            x: this.cursor.x,
            y: this.cursor.y
        }
    }
    toggleCrosshairs() {
        this.cursor = {
            show: this.cursor.show,
            x: !this.cursor.x,
            y: !this.cursor.y
        }
    }
}
