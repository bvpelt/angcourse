import WMTS from 'ol/source/WMTS';
import { getTopLeft } from 'ol/extent';
import WMTSTileGrid from 'ol/tilegrid/WMTS';
import { LayerUtil } from './layerutil';
import { Config } from '../../config/config';

export class BgtStandaardLayer {

    public static createBgtStandaardLayer(): WMTS {
        const config: Config = Config.instance;
        const layerUtil: LayerUtil = LayerUtil.instance;
        const layerName: string = 'bgtstandaard';

        const bgtStandaardLayer: WMTS = new WMTS({
            crossOrigin: 'anonymous',
            format: config.pdokwmtsimageformatmtsurl,
            layer: layerName,
            matrixSet: layerUtil.projectionName,
            projection: layerUtil.projectionName,
            style: 'default',
            tileGrid: new WMTSTileGrid({
                origin: getTopLeft(layerUtil.projectionExtent),
                resolutions: layerUtil.resultions,
                matrixIds: layerUtil.matrixIds,
            }),
            url: config.pdokwmtsurl,
            wrapX: true,
        });

        console.log('BgtStandaardLayer - layer: ' + bgtStandaardLayer.toString());

        return bgtStandaardLayer;
    }
}
