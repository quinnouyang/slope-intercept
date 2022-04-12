const GRAPH_DIMENSION = 800;
const QUADRANT_DIMENSION = GRAPH_DIMENSION / 2;
const QUADRANT_BOXES = 15;
const GRID_BOX_DIMENSION = QUADRANT_DIMENSION / QUADRANT_BOXES;
let slope = 1;
let yIntercept = 3 * GRID_BOX_DIMENSION;
let emptyGraphCanvas = null;

function drawDefault() {
  drawCoordinatePlane();
  drawLine();
}

function drawCoordinatePlane() {
  var graph = document.getElementById("graph");
  if (!graph.getContext) return;
  /** @type {CanvasRenderingContext2D} */
  var ctx = graph.getContext("2d");

  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(QUADRANT_DIMENSION, 0);
  ctx.lineTo(QUADRANT_DIMENSION, GRAPH_DIMENSION);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, QUADRANT_DIMENSION);
  ctx.lineTo(GRAPH_DIMENSION, QUADRANT_DIMENSION);
  ctx.stroke();

  ctx.lineWidth = 1;
  for (let line = 0; line < GRAPH_DIMENSION; line += GRID_BOX_DIMENSION) {
    ctx.beginPath();
    ctx.moveTo(0, line);
    ctx.lineTo(GRAPH_DIMENSION, line);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(line, 0);
    ctx.lineTo(line, GRAPH_DIMENSION);
    ctx.stroke();
  }

  emptyGraphCanvas = ctx.getImageData(0, 0, GRAPH_DIMENSION, GRAPH_DIMENSION);
}

function drawLine() {
  var graph = document.getElementById("graph");
  if (!graph.getContext) return;

  /** @type {CanvasRenderingContext2D} */
  var ctx = graph.getContext("2d");
  ctx.putImageData(emptyGraphCanvas, 0, 0);

  ctx.strokeStyle = "red";
  console.log("apple");
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(
    0,
    QUADRANT_DIMENSION - (slope * -QUADRANT_DIMENSION + yIntercept)
  );
  ctx.lineTo(
    GRAPH_DIMENSION,
    QUADRANT_DIMENSION - (slope * QUADRANT_DIMENSION + yIntercept)
  );
  ctx.stroke();
}

function handleSlopeInput() {
  slope = document.getElementById("slope").value;
  drawLine();
}

function handleYInterceptInput() {
  yIntercept = document.getElementById("yIntercept").value * GRID_BOX_DIMENSION;
  drawLine();
}
