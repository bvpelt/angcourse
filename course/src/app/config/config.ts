export class Config {
    private static _instance: Config;

    private _pdokwmtsurl: string = 'https://geodata.nationaalgeoregister.nl/tiles/service/wmts?';
    //https://geodata.nationaalgeoregister.nl/luchtfoto/rgb/wmts?layer=Actueel_ortho25&style=default&tilematrixset=EPSG%3A28992&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=12&TileCol=2171&TileRow=2098    
    private _pdokwmtsluchtfoto: string = 'https://geodata.nationaalgeoregister.nl/luchtfoto/rgb/wmts?';
    private _pdokwmtsimageformat: string = 'image/png';

    private constructor() {
    }

    public static get instance() {
        // Do you need arguments? Make it a regular static method instead.
        return this._instance || (this._instance = new this());
    }

    public get pdokwmtsurl(): string {
        return this._pdokwmtsurl;
    }

    public get pdokwmtsluchtfoto(): string {
        return this._pdokwmtsluchtfoto;
    }

    public set pdokwmtsurl(url: string) {
        this._pdokwmtsurl = url;
    }

    public get pdokwmtsimageformatmtsurl(): string {
        return this._pdokwmtsimageformat;
    }

    public set pdokwmtsimageformat(url: string) {
        this._pdokwmtsimageformat = url;
    }

}