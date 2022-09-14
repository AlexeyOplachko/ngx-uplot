type ChartTypeString = 'line' | 'stepped' | 'spline' | 'points' | 'bar';
type ChartTypeArray = Array<ChartTypeString>;
export type ChartType = ChartTypeString | ChartTypeArray;
export interface Limits {
    min?: number;
    max?: number;
}
export interface Details {
    data: Array<Array<any>>;
    meta: Array<Meta>;
}
export interface Meta {
    name: string;
    show?: boolean;
    strokeColor?: string;
    strokeWidth?: number;
    fillColor?: string;
    dash?: Array<number>;
}