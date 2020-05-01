import { IRenderMime } from '@jupyterlab/rendermime-interfaces';
import { Widget } from '@lumino/widgets';
import { Simple3DScene } from 'mat-periodic-table';

export const MIME_TYPE = 'application/vnd.mp.v1+json';
export const CSS_CLASS = 'jp-three';
export const CSS_ICON_CLASS = 'jp-icon-three';

export class ThreeRenderer extends Widget implements IRenderMime.IRenderer {

  private threeContainer: HTMLDivElement;
  private model!: IRenderMime.IMimeModel;
  private threeScene: Simple3DScene;
  /**
   * Create a new widget for rendering Plotly.
   */
  constructor(options: IRenderMime.IRendererOptions) {
    super();
    this.addClass(CSS_CLASS);
    // Create image element
    this.threeContainer = (document.createElement('div') as HTMLDivElement);
    this.threeContainer.setAttribute('style',  'height: 600px; width: 600px');
    this.node.appendChild(this.threeContainer);
    console.log('created scene', this.threeScene);
  }
  /**
   * Render Plotly into this widget's node.
   */
  renderModel(model: IRenderMime.IMimeModel): Promise<void> {
    // Save off reference to model so that we can regenerate the plot later
    this.model = model;
    this.threeScene = new Simple3DScene(
      model,
      this.threeContainer,
      {},
      50,
      10,
      (objects: any[]) => {
        // not sure what to do here
        console.log('clicked on objects', objects);
      },
      () => {
        /* we do not need to dispatch camera changes*/
      },
      null
    );
    this.threeScene.addToScene(this.model.data[MIME_TYPE]);
    return Promise.resolve();
  }
}

/**
 * A mime renderer factory for Plotly data.
 */
export const rendererFactory: IRenderMime.IRendererFactory = {
  safe: true,
  mimeTypes: [MIME_TYPE],
  createRenderer: options => new ThreeRenderer(options)
};


const extensions: IRenderMime.IExtension | IRenderMime.IExtension[] = [
  {
    id: '@jupyterlab/three-extension:plugin',
    rendererFactory,
    rank: 10,
    dataType: 'json',
    fileTypes: [
      {
        name: 'THREE',
        displayName: 'THREE',
        fileFormat: 'json',
        mimeTypes: [MIME_TYPE],
        extensions: ['.scene', '.json', '.scene.json']
      }
    ],
    documentWidgetFactoryOptions: {
      name: 'THREE',
      primaryFileType: 'THREE',
      fileTypes: ['THREE'],
      defaultFor: ['THREE']
    }
  }
];

export default extensions;
