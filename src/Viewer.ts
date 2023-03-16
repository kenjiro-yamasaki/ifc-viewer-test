import {Color} from 'three';
import {IFCSPACE, IFCOPENINGELEMENT} from 'web-ifc';
import {IfcViewerAPI} from 'web-ifc-viewer';

/*
 * ビューア。
 */
export class Viewer
{
    viewer: IfcViewerAPI;

    /**
     * コンストラクター。
     */
    public constructor()
    {
        const container = document.getElementById('viewer') as HTMLElement;
        this.viewer = new IfcViewerAPI({ container, backgroundColor: new Color(255, 255, 255) });
        this.viewer.IFC.setWasmPath('./web-ifc-wasm/');

        this.viewer.IFC.loader.ifcManager.applyWebIfcConfig({
            USE_FAST_BOOLS: false,
            COORDINATE_TO_ORIGIN: true
        });
          
        this.viewer.context.renderer.postProduction.active = true;

        window.onmousemove = () => this.onMousemove();
        window.ondblclick = () => this.onDblClick();

        this.loadIFC();
    }

    /**
     * マウスカーソルが移動したとき、呼び出されます。
     */
    private onMousemove()
    {
        this.viewer.IFC.selector.prePickIfcItem();
    }

    /**
     * ダブルクリックされたとき、呼び出されます。
     */
    private async onDblClick()
    {
        const result = await this.viewer.IFC.selector.pickIfcItem(true);
        if (!result)
        {
            //this.viewer.IFC.selector.unpickIfcItems();
            return;
        }
        const { modelID, id } = result;
        const properties = await this.viewer.IFC.getProperties(modelID, id, true, false);
        console.log(properties);
    }

    /**
     * IFC ファイルをロードします。
     */
    private async loadIFC()
    {
        this.viewer.IFC.loader.ifcManager.parser.setupOptionalCategories({
            [IFCSPACE]: false,
            [IFCOPENINGELEMENT]: false
        });

        const model = await this.viewer.IFC.loadIfcUrl('./sample.ifc', false);
        await this.viewer.shadowDropper.renderShadow(model.modelID);
    }
}
