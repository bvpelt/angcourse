import Extent from 'ol/interaction/Extent';
import Point from 'ol/geom/Point';

export class Config {
    private static _instance: Config;

    private _pdokwmtsurl: string = 'https://geodata.nationaalgeoregister.nl/tiles/service/wmts?';
    private _pdokwmtsluchtfoto: string = 'https://geodata.nationaalgeoregister.nl/luchtfoto/rgb/wmts?';
    private _pdokwmtsimageformat: string = 'image/png';
    private _projectionName: string = 'EPSG:28992';
    private _units: string = 'm';
    private _projectionExtent: any = [-285401.92, 22598.08, 595401.9199999999, 903401.9199999999];
    private _nlxtent: Extent = new Extent({ extent: [9632, 306708, 278200, 622130] });
    private _center: Point = new Point([156527, 456220]);

    private constructor() {
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    public get pdokwmtsurl(): string {
        return this._pdokwmtsurl;
    }

    public set pdokwmtsurl(url: string) {
        this._pdokwmtsurl = url;
    }

    public get pdokwmtsluchtfoto(): string {
        return this._pdokwmtsluchtfoto;
    }

    public set pdokwmtsluchtfoto(url: string) {
        this._pdokwmtsluchtfoto = url;
    }

    public get pdokwmtsimageformatmtsurl(): string {
        return this._pdokwmtsimageformat;
    }

    public set pdokwmtsimageformat(url: string) {
        this._pdokwmtsimageformat = url;
    }

    public get projectionName(): string {
        return this._projectionName;
    }

    public set projectionName(name: string) {
        this._projectionName = name;
    }

    public get units(): string {
        return this._units;
    }

    public set units(units: string) {
        this._units = units;
    }

    public get projectionExtent(): any {
        return this._projectionExtent;
    }

    public set projectionExtent(extent: any) {
        this._projectionExtent = extent;
    }

    public get nlxtent(): Extent {
        return this._nlxtent;
    }

    public set nlxtent(extent: Extent) {
        this._nlxtent = extent;
    }

    public get center(): Point {
        return this._center;
    }

    public set center(point: Point) {
        this._center = point;
    }
}