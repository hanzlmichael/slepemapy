import { canvas } from '../inits/canvas.js';

function setDefaultCursor() {
  fabric.Object.prototype.moveCursor = "default"
  fabric.Object.prototype.hoverCursor = "default"
}

export function turnOfControls(obj) {
  let controls = [ "ml", "mt", "mr", "mb", "mtr"]
  /* controls.forEach((control) => obj.setControlVisible(control, false)) */
  controls.forEach(control => fabric.Object.prototype.setControlVisible(control, false))
  /* fabric.Object.prototype.moveCursor = "default" */
  //fabric.Object.prototype.hoverCursor = "default"
  /* fabric.Object.prototype.hoverCursor = "default" */
}

function initObjectDeleteIcon() {
  let deleteIcon =
    "data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3C!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 1.1//EN' 'http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd'%3E%3Csvg version='1.1' id='Ebene_1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' width='595.275px' height='595.275px' viewBox='200 215 230 470' xml:space='preserve'%3E%3Ccircle style='fill:%23F44336;' cx='299.76' cy='439.067' r='218.516'/%3E%3Cg%3E%3Crect x='267.162' y='307.978' transform='matrix(0.7071 -0.7071 0.7071 0.7071 -222.6202 340.6915)' style='fill:white;' width='65.545' height='262.18'/%3E%3Crect x='266.988' y='308.153' transform='matrix(0.7071 0.7071 -0.7071 0.7071 398.3889 -83.3116)' style='fill:white;' width='65.544' height='262.179'/%3E%3C/g%3E%3C/svg%3E";

  let deleteImg = document.createElement("img");
  deleteImg.src = deleteIcon;

  function renderIcon(icon) {
    return function renderIcon(ctx, left, top, styleOverride, fabricObject) {
      let size = this.cornerSize;
      ctx.save();
      ctx.translate(left, top);
      ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle));
      ctx.drawImage(icon, -size / 2, -size / 2, size, size);
      ctx.restore();
    };
  }

  fabric.Object.prototype.controls.deleteControl = new fabric.Control({
    x: 0.5,
    y: -0.5,
    offsetY: -16,
    offsetX: 16,
    cursorStyle: "pointer",
    mouseUpHandler: deleteObject,
    render: renderIcon(deleteImg),
    cornerSize: 24,
  });

  function deleteObject(eventData, transform) {
    let target = transform.target;
    let canvas = target.canvas;
    canvas.remove(target);
    canvas.requestRenderAll();
  }
}

export function activateSettings() {
  /* fabric.Object.prototype.padding = 10;
  fabric.Object.prototype.borderColor = "rgb(211,33,45)"
  fabric.Object.prototype.borderDashArray = [5] */
  fabric.Object.prototype.padding = 4;
  fabric.Object.prototype.borderColor = "rgb(211,33,45)";
  fabric.Object.prototype.borderDashArray = [3,3];
  fabric.Object.prototype.transparentCorners= false;
  fabric.Object.prototype.cornerColor ='white';
  fabric.Object.prototype.cornerStrokeColor='red';
  fabric.Object.prototype.borderColor= 'red';
  fabric.Object.prototype.cornerSize= 6;
  fabric.Object.prototype.cornerStyle='rect';
}

export function activateZooming() {
  canvas.on('mouse:wheel', function(opt) {
    var delta = opt.e.deltaY;
    var zoom = canvas.getZoom();
    zoom *= 0.999 ** delta;
    if (zoom > 20) zoom = 20;
    if (zoom < 0.01) zoom = 0.01;
    canvas.zoomToPoint({ x: opt.e.offsetX, y: opt.e.offsetY }, zoom);
    opt.e.preventDefault();
    opt.e.stopPropagation();
  });
}

export function initGlobalPrototypeSettings() {
  activateSettings();
  activateZooming();
  turnOfControls();
  initObjectDeleteIcon();
  setDefaultCursor();
}

