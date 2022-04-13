// DEFAULT VALUES/SETTINGS: EDITABLE
const QUADRANT_BOXES = 10;
const DEFAULT_SLOPE = 1;
const DEFAULT_Y_INTERCEPT = 3;
const LABEL_SCALING = 8; // Arbitrary scaling offset

const GRAPH_DIMENSION = 800; // Buggy if edited because of CSS flex conflicts
const QUADRANT_DIMENSION = GRAPH_DIMENSION / 2;
const GRID_BOX_DIMENSION = QUADRANT_DIMENSION / QUADRANT_BOXES;
const AXIS_LABELS_FONT_SIZE = QUADRANT_DIMENSION / (2 * QUADRANT_BOXES); // Lazy font-sizing WRT to number of boxes in a quadrant

let emptyGraphCanvas = null;

function drawDefault() {
  let graph = document.getElementById("graph");
  graph.width = graph.height = GRAPH_DIMENSION;
  document.getElementById("slope").value = DEFAULT_SLOPE;
  document.getElementById("yIntercept").value = DEFAULT_Y_INTERCEPT;

  drawCoordinatePlane();
  drawLine(DEFAULT_SLOPE, DEFAULT_Y_INTERCEPT);
  renderEquation(DEFAULT_SLOPE, DEFAULT_Y_INTERCEPT);
}

function drawCoordinatePlane() {
  let graph = document.getElementById("graph");
  /** @type {CanvasRenderingContext2D} */
  let ctx = graph.getContext("2d");

  // Y-axis
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(QUADRANT_DIMENSION, 0);
  ctx.lineTo(QUADRANT_DIMENSION, GRAPH_DIMENSION);
  ctx.stroke();

  // X-axis
  ctx.beginPath();
  ctx.moveTo(0, QUADRANT_DIMENSION);
  ctx.lineTo(GRAPH_DIMENSION, QUADRANT_DIMENSION);
  ctx.stroke();

  // Axis labels
  ctx.font = `${AXIS_LABELS_FONT_SIZE}px Arial`;
  ctx.textAlign = "right";
  ctx.textBaseline = "top";
  ctx.lineWidth = 1;

  for (
    let line = 0, count = 0;
    line < GRAPH_DIMENSION;
    line += GRID_BOX_DIMENSION, count++
  ) {
    // Vertical line
    ctx.beginPath();
    ctx.moveTo(0, line);
    ctx.lineTo(GRAPH_DIMENSION, line);
    ctx.stroke();

    // Y-axis label
    ctx.fillText(
      Math.round(QUADRANT_DIMENSION / GRID_BOX_DIMENSION - count),
      QUADRANT_DIMENSION - GRID_BOX_DIMENSION / LABEL_SCALING,
      line + GRID_BOX_DIMENSION / LABEL_SCALING
    );

    // Horizontal line
    ctx.beginPath();
    ctx.moveTo(line, 0);
    ctx.lineTo(line, GRAPH_DIMENSION);
    ctx.stroke();

    // X-axis label
    ctx.fillText(
      Math.round(count - QUADRANT_DIMENSION / GRID_BOX_DIMENSION),
      line - GRID_BOX_DIMENSION / LABEL_SCALING,
      QUADRANT_DIMENSION + GRID_BOX_DIMENSION / LABEL_SCALING
    );
  }

  emptyGraphCanvas = ctx.getImageData(0, 0, GRAPH_DIMENSION, GRAPH_DIMENSION);
}

function drawLine(slope, yIntercept) {
  let graph = document.getElementById("graph");
  /** @type {CanvasRenderingContext2D} */
  let ctx = graph.getContext("2d");

  ctx.strokeStyle = "red";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(
    0,
    QUADRANT_DIMENSION -
      (slope * -QUADRANT_DIMENSION + yIntercept * GRID_BOX_DIMENSION)
  );
  ctx.lineTo(
    GRAPH_DIMENSION,
    QUADRANT_DIMENSION -
      (slope * QUADRANT_DIMENSION + yIntercept * GRID_BOX_DIMENSION)
  );

  ctx.putImageData(emptyGraphCanvas, 0, 0); // "Clear" graph
  ctx.stroke();
}

function renderEquation(slope, yIntercept) {
  let equation = "y = ";
  if (slope === 0 && yIntercept === 0) equation += "0";
  else if (slope !== 0 && slope !== 1) equation += `${slope} x`;
  else if (slope === 1) equation += "x";

  if (slope !== 0 && yIntercept > 0) equation += "+";
  if (yIntercept !== 0) equation += `${yIntercept}`;

  katex.render(equation, document.getElementById("equation"));
}

function handleInput() {
  const slope = Number(document.getElementById("slope").value);
  const scaledYIntercept =
    document.getElementById("yIntercept").value * GRID_BOX_DIMENSION;
  drawLine(slope, scaledYIntercept / GRID_BOX_DIMENSION);
  renderEquation(slope, scaledYIntercept / GRID_BOX_DIMENSION);
}
