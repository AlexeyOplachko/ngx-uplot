import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    Output,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import * as _uPlot from 'uplot';
import { ChartType, Details, Limits } from './models/chart.model';

const uPlot: any = (_uPlot as any)?.default;

@Component({
    selector: 'ngx-uplot',
    template: `<div style="margin: 0.5rem;" #chartUPlot></div>`,
    styleUrls: ['./ngx-uplot.style.scss'],
    styles: [
        `
            .u-legend.u-inline .u-value {
                width: 150px;
                text-align: left;
            }
        `,
    ],
    encapsulation: ViewEncapsulation.None,
})
export class NgxUplotComponent implements AfterViewInit {
    chartData: any;
    uPlotChart: any;
    _options: _uPlot.Options = {
        class: 'my-chart',
        width: 0,
        height: 0,  
        axes: [
            {
            incrs: [60],
            // use static template for every tick
            values: '{H}:{m}:{ss}',
            // reduce axis height, since ticks values are now single line
            size: 30,
            ticks: {
                    show: true,
                    stroke: "#eee",
                    width: 2,
                    dash: [],
                    size: 10,
                }
          },
          
        ],
  
        focus: {
            alpha: 0.9
        },	      
        cursor: {
            focus: {
                prox: 3,
            },
        },			
        series: [{}],
        legend: {
            show: false,
            live: true,
        },
    };
    @Input() set options(options: _uPlot.Options) {
        this._options = options;
    }
    get options(): _uPlot.Options {
        return this._options;
    }
    _dateFormat: string = '{HH}:{mm}:{ss}'
    @Input() set dateFormat(val: string) {
        this._dateFormat = val;
        this.makeChart(this.data)
    }
    get dateFormat(): string {
        return this._dateFormat
    }
    _data: any = [
        [1, 3, 2, 4],
        [2, 3, 4, 1],
        [3, 4, 1, 2],
        [4, 1, 2, 3],
    ];
    @Input() customTooltip: boolean = false;
    @Output() showTooltip = new EventEmitter<any>();
    @Output() hideTooltip = new EventEmitter<void>();

    _cursor: _uPlot.Cursor = {};
    @Input() set cursor(val: _uPlot.Cursor) {
        this._cursor = val;
        this.makeChart(this.data);
    }
    get cursor(): _uPlot.Cursor {
        return this._cursor;
    }
    @Input() tooltips: boolean = true;
    _legend: boolean = false;
    @Input() set legend(val: boolean) {
        this._legend = val;
        this.makeChart(this.data);
    }
    get legend(): boolean {
        return this._legend;
    }
    _limits: Limits = {}
    @Input() set limits(val: Limits) {
        this._limits = val;
        this.makeChart(this.data)
    }
    get limits(): Limits {
        return this._limits
    }
    @Input() align: number | Array<number> = 0;
    _type: ChartType = 'line';
    @Input() set type(value: ChartType) {
        this._type = value;
        this.makeChart(this.data);
    }
    get type(): ChartType {
        return this._type;
    }
    _strokeWidth: number = 1 / devicePixelRatio;
    @Input() set strokeWidth(value: number) {
        this._strokeWidth = value;
        this.makeChart();
    }
    get strokeWidth(): number {
        return this._strokeWidth;
    }
    @Input()
    set data(value: Details) {
        this._data = value?.data;
        try {
            const labels = value?.meta?.map((i: any) => i.name);

            const series: Array<_uPlot.Series> = value.data.map((i, k) => {
                if (k === 0) {
                    return {}
                }
                const {fillColor, strokeColor, dash, show, strokeWidth } = value?.meta?.[k-1]
                const randColor = this.randColor();
                return {
                    label: labels[k-1],
                    stroke: strokeColor ? strokeColor : randColor,
                    fill: fillColor ? fillColor : '',
                    width: strokeWidth ? strokeWidth : this.strokeWidth,
                    show: typeof value?.meta?.[k-1].show !== 'undefined' ? show : true,
                    dash: dash ? dash : [0, 0],
                };
            });
            this.options.series = series;

            this.options.plugins = [
                this.tooltipPlugin({x:10, y:10})
            ];
            this.makeChart(this._data);
        } catch (e) {}
    }
    get data(): Details {
        return this._data;
    }

    @ViewChild('chartUPlot', { static: true }) chartUPlot: any | HTMLElement;
    constructor() {
    }

    randColor() {
        return '#000000'.replace(/0/g, function () {
            return (~~(Math.random() * 16)).toString(16);
        });
    }
    makeChart(data: any = this.chartData) {
        if (data) {
            this.chartData = data;
        } else {
            return;
        }
        this.setParams();
        this.chartUPlot.nativeElement.innerHTML = '';

        const opts = this.options;
        opts.width = this.chartUPlot.nativeElement.clientWidth;
        opts.height = this.chartUPlot.nativeElement.clientHeight || 600;

        this.uPlotChart = new uPlot(opts, data, this.chartUPlot.nativeElement);
        if (this.limits && Object.keys(this.limits).length > 0) {
            if(this.uPlotChart) {
                this.uPlotChart.setScale('y', this.limits)
            }
        }
    }

    __hostWidth = 0;
    updateChecker() {
        requestAnimationFrame(() => {
            if (
                this.__hostWidth !== this.chartUPlot.nativeElement.clientWidth
            ) {
                this.__hostWidth = this.chartUPlot.nativeElement.clientWidth;
                this.makeChart(this.data);
            }
            this.updateChecker();
        });
    }
    ngAfterViewInit() {
        this.makeChart(this.data);
        this.updateChecker();
    }
    setParams() {
        if (this.type) {
            this.options.series.forEach((series: any, index: number) => {
                if (typeof this.type === 'string') {
                    series.paths = this.getTypeFunction(this.type);
                } else {
                    series.paths = this.getTypeFunction(this.type[index], index);
                }
            });
        }
        if (this.options.legend) {
            this.options.legend.show = this.legend;
        }else {
            this.options.legend = {show: this.legend};
        }
        if (this.cursor && Object.keys(this.cursor).length > 0) {
            if (this.options.cursor) {
                this.options.cursor = Object.assign(this.options.cursor, this.cursor);
            } else {
                this.options.cursor = this.cursor;
            }
        }
        if (this.dateFormat) {
            if (this.options?.axes?.[0]) {
                this.options.axes[0].values = this.dateFormat;
            } else {
                this.options.axes?.push({
                    values: this.dateFormat
                })
            }
        }
    }
    getTypeFunction(type: ChartType, index: number = 0) {
        const align =
            typeof this.align === 'number' ? this.align : this.align[index];
        switch (type) {
            case 'line':
                return uPlot.paths.linear({ align });
            case 'bar':
                return uPlot.paths.bars({ align });
            case 'stepped':
                return uPlot.paths.stepped({ align });
            case 'spline':
                return uPlot.paths.spline({ align });
            case 'points':
                return uPlot.paths.points({ align });
            default:
                return uPlot.paths.linear({ align: this.align });
        }
    }
    tooltipPlugin({ shiftX = 10, shiftY = 10}: any) {
        let tooltipLeftOffset = 0;
        let tooltipTopOffset = 0;

        const tooltip = document.createElement("div");
        tooltip.className = "u-tooltip";

        let seriesIdx: any  = null;
        let dataIdx: any  = null;

        let over: any;

        let tooltipVisible = false;

        const showTooltip = () => {
            if (!tooltipVisible) {
                tooltip.style.display = "block";
                // over.style.cursor = "pointer";
                tooltipVisible = true;
            }
        }

        const hideTooltip = () => {
            this.hideTooltip.emit()
            if (tooltipVisible) {
                tooltip.style.display = "none";
                over.style.cursor = null;
                tooltipVisible = false;
            }
        }

        const setTooltip = (u: _uPlot) => {
            showTooltip();
            
            if (this.customTooltip) {
                this.showTooltip.emit(
                    {
                        currentPoint: u.data[seriesIdx][dataIdx],
                        data: u.data
                    }
                )
            } else {
                let top = u.valToPos(u.data[seriesIdx][dataIdx] as any, 'y');
                let lft = u.valToPos(u.data[        0][dataIdx], 'x');
                tooltip.style.top  = (tooltipTopOffset  + top + shiftX) + "px";
                const width = this.uPlotChart.bbox.width
                if (lft > width*0.75) {
                    tooltip.style.right = (tooltipLeftOffset + width - lft + shiftY) + "px";
                } else {
                    tooltip.style.left = (tooltipLeftOffset + lft + shiftY) + "px";

                }
                tooltip.textContent = (
                    u.data[0][dataIdx] + " - " + +
                    uPlot.fmtNum(u.data[seriesIdx][dataIdx])
                );
            }
        }

        return {
            hooks: {
                ready: [
                    (u: _uPlot) => {
                        over = u.over;
                        tooltipLeftOffset = parseFloat(over.style.left);
                        tooltipTopOffset = parseFloat(over.style.top);
                        u?.root?.querySelector(".u-wrap")?.appendChild(tooltip);

                        let clientX: number;
                        let clientY: number;

                    }
                ],
                
                setCursor: [
                    (u: _uPlot) => {
                        let c = u.cursor;
                        if (dataIdx != c.idx) {
                            dataIdx = c.idx;
                            if (seriesIdx !== null) {
                                setTooltip(u);
                            }
                        }
                    }
                ],
                setSeries: [
                    (u:_uPlot, sidx: any) => {
                        if (seriesIdx != sidx) {
                            seriesIdx = sidx;

                            if (sidx == null) {
                                hideTooltip();
                            }
                            else if (dataIdx != null) {
                                setTooltip(u);
                            }
                        }
                    }
                ],
            }
        };
    }

}
