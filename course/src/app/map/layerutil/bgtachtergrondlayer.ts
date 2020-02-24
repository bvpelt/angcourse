import WMTS from 'ol/source/WMTS';
import { getTopLeft } from 'ol/extent';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import { LayerUtil } from './layerutil';
import { Config } from '../../config/config';

export class BgtAchtergrondLayer {

  public static createBgtAchtergrondLayer(): WMTS {
    const config: Config = Config.instance;
    const layerUtil: LayerUtil = LayerUtil.instance;
    const layerName: string = 'bgtachtergrond';

    const bgtAchtergrondLayer: WMTS = new WMTS({
      crossOrigin: 'anonymous',
      format: config.pdokwmtsimageformatmtsurl,
      layer: layerName,
      matrixSet: layerUtil.projectionName, // EPSG:28992
      projection: layerUtil.projectionName,
      style: 'default',
      tileGrid: new WMTSTileGrid({
        origin: getTopLeft(layerUtil.projectionExtent),
        resolutions: layerUtil.resultions,
        matrixIds: layerUtil.matrixIds,
      }),
      url: config.pdokwmtsurl,
      wrapX: true
    });

    return bgtAchtergrondLayer;
  }
}
