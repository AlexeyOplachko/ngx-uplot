import { Component } from '@angular/core';
import { ChartType, Details } from 'projects/ngx-uplot/src/lib/models/chart.model';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'ngx-uplot2';
    type: ChartType = 'line';
    legend = true;
    scale = {
        min: 1,
        max: 5
    }
    cursor = {
        show: true,
        x: true,
        y: true
    }
    data: Details = {
        meta: [
            { name: 'run_id', },
            { name: 'query_num',  },
            { name: 'try_num', strokeWidth: 15},
            { name: 'time',  dash: [10, 15] },
            { name: 'test'},
            { name: 'test2'},
            { name: 'test3'}
        ],
        data: [[
            1662042178004,
            1662042178005,
            1662042178013,
            1662042179010,
        ],
            [
                4.409,
                4.409
            ],
            [
                4.409
            ],
            [
                4.409
            ],
            [
                null,
                null,
                4.404,
                4.404
            ],
            [
                null,
                null,
                4.393
            ],
            [
                null,
                null,
                null,
                4.393
            ]
        ]
    };
    toggleCursor() {
        this.cursor =  {
            show: !this.cursor.show,
            x: this.cursor.x,
            y: this.cursor.y
        }
    }
    randomizeScale() {
        const arr = []
        for (let i = 0; i < 2; i++) {
            const randomNumber = Math.random() * 100
            arr.push(randomNumber)
        }
        this.scale = {
            min: 0,
            max: Math.max(...arr)
        }
        console.log(this.scale)
    }
    toggleCrosshairs() {
        this.cursor = {
            show: this.cursor.show,
            x: !this.cursor.x,
            y: !this.cursor.y
        }
    }
}
