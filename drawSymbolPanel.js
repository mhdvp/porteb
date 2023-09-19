// رسم پنل سمبل ها

export default function drawSymbolPanel(svg, x, y) {
  const viewBox = svg.getAttribute("viewBox");
  const viewBoxArray = viewBox.split(" ");
  const width = viewBoxArray[2];
  const height = viewBoxArray[3];

  svg.setAttribute("width", `${width * ptv}`);
  svg.setAttribute("height", `${height * ptv}`);
  svg.setAttribute("style", "border: 1px solid blue");

  let dx = 5;
  let dy = 5;
  x += dx;
  y += dy;

  switch (svg.id) {
    case "R_sym_panel":
      insertSymbol(svg, "R_AC", x, y);
      //draw_R_AC(svg, x, y);
      wrapperSquare(svg, x, y, "R_AC");

      dx *= 2;
      x += dx;
      insertSymbol(svg, "R_BC", x, y);
      //draw_R_BC(svg, x, y);
      wrapperSquare(svg, x, y, "R_BC");

      x += dx;
      insertSymbol(svg, "R_AC_M", x, y);
      //draw_R_AC_M(svg, x, y);
      wrapperSquare(svg, x, y, "R_AC_M");

      x += dx;
      insertSymbol(svg, "R_BC_M", x, y);
      //draw_R_BC_M(svg, x, y);
      wrapperSquare(svg, x, y, "R_BC_M");
      break;
    case "L_sym_panel":
      insertSymbol(svg, "L_AC", x, y);
      //draw_L_AC(svg, x, y);
      wrapperSquare(svg, x, y, "L_AC");

      dx *= 2;
      x += dx;
      insertSymbol(svg, "L_BC", x, y);
      //draw_L_BC(svg, x, y);
      wrapperSquare(svg, x, y, "L_BC");

      x += dx;
      insertSymbol(svg, "L_AC_M", x, y);
      //draw_L_AC_M(svg, x, y);
      wrapperSquare(svg, x, y, "L_AC_M");

      x += dx;
      insertSymbol(svg, "L_BC_M", x, y);
      //draw_L_BC_M(svg, x, y);
      wrapperSquare(svg, x, y, "L_BC_M");
      break;

    default:
      break;
  }
}

// رسم مربع احاطه‌کننده سمبل پنل سمبل‌ها - wrapperSquare

function wrapperSquare(svg, x, y, id) {
  const offset = 1.5;
  const a = h / 2 + offset; // نصف هر ضلع مربع
  let points = [a, -a, -a, -a, -a, a, a, a, a, -a];

  // جابجایی مختصات نقاط
  points = shiftPoints(points, x, y);

  const polyline = document.createElementNS(svgNS, "polyline");
  polyline.setAttribute("tabindex", "1");
  polyline.setAttribute("class", "symbol_square");
  polyline.setAttribute("id", id);
  // polyline.setAttribute("stroke-opacity", "0.9");
  polyline.setAttribute("stroke-width", "0.2px");
  polyline.setAttribute("stroke-linecap", "round");
  polyline.setAttribute("stroke-miterlimit", "0");
  polyline.setAttribute("fill", "transparent");
  polyline.setAttribute("stroke", "red");
  polyline.setAttribute("points", points);
  svg.appendChild(polyline);
}

// جابجایی مختصات نقاط
function shiftPoints(points, x, y) {
  let l = points.length;
  l--;
  for (let i = 0; i < l; i += 2) {
    points[i] += x;
    points[i + 1] += y;
  }
  return points;
}

// وارد کردن داده‌های سراسری
import {
  h,
  r,
  ptv,
  svgNS,
  selectedSymbolObj,
  audiogramObj,
  xFrequency,
  yIntensity,
  symbolType,
  currentAuthLocal,
  userXOrigin,
  viewBoxWidth,
  ratio,
  userYOrigin,
  viewBoxHeight,
  dI,
  dotX,
  dotY,
} from "./initials.js";

import { insertSymbol } from "./functions.js";
