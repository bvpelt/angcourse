import Extent from 'ol/interaction/Extent';
import Point from 'ol/geom/Point';
import Projection from 'ol/proj/Projection';

export class LayerUtil {
  private static _instance: LayerUtil = null;

  private _projectionName: string = 'EPSG:28992';
  private _units: string = 'm';
  private _projectionExtent: any = [-285401.92, 22598.08, 595401.9199999999, 903401.9199999999];
  private _nlxtent: Extent = new Extent({ extent: [9632, 306708, 278200, 622130] });
  private _center: Point = new Point([156527, 456220]);
  //private _center: Point = new Point([166546.5, 446639.31]);
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
    code: this._projectionName,
    units: this._units,
    extent: this._projectionExtent,
    getPointResolution: function (resolution) {
      return resolution;
    },
  });

  private constructor() {
    for (let z = 0; z < this._resolutions.length; ++z) {
      this._matrixIds[z] = this._projectionName + ':' + z;
      console.log('LayerUtil - Generating matrixids[' + z + ']: ' + this._matrixIds[z]);
    }
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  public get nlxtent(): Extent {
    return this._nlxtent;
  }

  public get units(): string {
    return this._units;
  }

  public get center(): Point {
    return this._center;
  }

  public get projectionName(): string {
    return this._projectionName;
  }

  public get rdProjection(): Projection {
    return this._rdProjection;
  }

  public get projectionExtent(): any {
    return this._projectionExtent;
  }

  public get resultions(): number[] {
    return this._resolutions;
  }

  public get matrixIds(): string[] {
    return this._matrixIds;
  }
}
