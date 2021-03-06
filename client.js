import {ReactInstance, Location, Surface} from 'react-360-web';
import  SimpleRaycaster from "simple-raycaster";
import {Module} from 'react-360-web';


var mode = 'nav';
export const leftPanel = new Surface(300, 600, Surface.SurfaceShape.Flat);
export const rightPanel = new Surface(300, 600, Surface.SurfaceShape.Flat);
export const bottomPanel = new Surface(500, 50, Surface.SurfaceShape.Flat);
export var r360 = undefined;

function setmovie() {
  mode = 'movie'
}
class MyModule extends Module {
  //var leftP,rightP;
  constructor(l,r,b) {
    super('MyModule');
    leftP = l;
    rightP = r;
    bottomP = b;
  }
  clear_surface() {
    console.log("surface resize")
    leftP.resize(0,0);
    rightP.resize(0,0);
    bottomP.resize(500,50);
  }
  resume_surface() {
    r360.compositor.setBackground('./static_assets/360_plane.png');
    leftP.resize(300,600);
    rightP.resize(300,600);
    bottomP.resize(0,0);
  }
}
function init(bundle, parent, options = {}) {

   r360 = new ReactInstance(bundle, parent, {
    fullScreen: true,
    raycasters: [SimpleRaycaster],
    cursorVisibility: 'visible',
    cursorEnabled: true,
    cursorAutoHide: false,
    nativeModules: [
      new MyModule(leftPanel,rightPanel,bottomPanel),
    ],
    ...options,
  });


  // Create three roots: two flat panels on the left and the right, and a Location
  // to mount rendered models in 3D space
  //const leftPanel = new Surface(300, 600, Surface.SurfaceShape.Flat);
  leftPanel.setAngle(-0.6, 0);
  //const rightPanel = new Surface(300, 600, Surface.SurfaceShape.Flat);
  rightPanel.setAngle(0.6, 0);
  bottomPanel.setAngle(0, -0.4);
  bottomPanel.resize(0,0);
  r360.renderToSurface(
    r360.createRoot('TopPosts'),
    leftPanel,
  );
  r360.renderToSurface(
    r360.createRoot('CurrentPost'),
    rightPanel,
  );
  r360.renderToSurface(
    r360.createRoot('VCR'),
    bottomPanel,
  );
  r360.renderToLocation(
    r360.createRoot('ModelView'),
    new Location([0, -2, -10]),
  );


    r360.compositor.setBackground('./static_assets/360_plane.png');

    const player = r360.compositor.createVideoPlayer('myplayer');
    player.setSource('./static_assets/YouTube.mp4', '2D');

  //r360.compositor.setCursorVisibility('visible');
  r360.controls.addRaycaster(SimpleRaycaster);
  r360.compositor.setCursorVisibility('visible');

  //leftPanel.resize(500,500);
  //rightPanel.resize(0,0);
  //clear_surface();
}

window.React360 = {init};
