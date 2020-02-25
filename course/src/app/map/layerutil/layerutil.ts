import Extent from 'ol/interaction/Extent';
import Point from 'ol/geom/Point';
import Projection from 'ol/proj/Projection';
import { Config } from 'src/app/config/config';

export class LayerUtil {
  private static _instance: LayerUtil = null;
  private config: Config = Config.instance;

  private _resolutions: number[] = [
    3440.64,
    1720.32,
    860.16,
    430.08,
    215.04,
    107.52,
    53.76,
    26.88,
    13.44,
    6.72,
    3.36,
    1.68,
    0.84,
    0.42,
    0.21
  ];
  private _matrixIds: string[] = new Array<string>(this._resolutions.length);
  private _rdProjection: Projection = new Projection({
    code: this.config.projectionName,
    units: this.config.units,
    extent: this.config.projectionExtent,
    getPointResolution: function (resolution) {
      return resolution;
    },
  });

  private constructor() {
    for (let z = 0; z < this._resolutions.length; ++z) {
      this._matrixIds[z] = this.config.projectionName + ':' + z;
      //console.log('LayerUtil - Generating matrixids[' + z + ']: ' + this._matrixIds[z]);
    }
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  public get nlxtent(): Extent {
    return this.config.nlxtent;
  }

  public get units(): string {
    return this.config.units;
  }

  public get center(): Point {
    return this.config.center;
  }

  public get projectionName(): string {
    return this.config.projectionName;
  }

  public get rdProjection(): Projection {
    return this._rdProjection;
  }

  public get projectionExtent(): any {
    return this.config.projectionExtent;
  }

  public get resultions(): number[] {
    return this._resolutions;
  }

  public get matrixIds(): string[] {
    return this._matrixIds;
  }
}
