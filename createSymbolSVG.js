// ساخت اس‌وی‌جی شانزده سمبل

export default function createSymbolSVG(symbol, x, y) {
  let dot = [],
    points = [];
  let dx, dy, xNR, yNR;
  let polyline, circle;
  const g = document.createElementNS(svgNS, "g");

  switch (symbol) {
    case "R_AC":
    case "R_AC_NR":
      dot = [0, 0];
      //مختصات نقطه اول سمبل عدم پاسخ
      xNR = r * Math.sin(Math.PI / 4);
      yNR = xNR;
      xNR *= -1;
      xNR += x;
      yNR += y;

      circle = document.createElementNS(svgNS, "circle");
      circle.setAttribute("stroke", "red");
      circle.setAttribute("stroke-width", "0.6px");
      circle.setAttribute("fill", "transparent");
      circle.setAttribute("cx", `${x}`);
      circle.setAttribute("cy", `${y}`);
      circle.setAttribute("r", `${r}`);
      g.appendChild(circle);
      break;

    case "R_BC":
    case "R_BC_NR":
      dot = [0, -r, -r, 0, 0, r];
      points = [
        dot[0] + x,
        dot[1] + y,
        dot[2] + x,
        dot[3] + y,
        dot[4] + x,
        dot[5] + y,
      ];
      polyline = document.createElementNS(svgNS, "polyline");
      polyline.setAttribute("stroke-width", "0.6px");
      polyline.setAttribute("fill", "transparent");
      polyline.setAttribute("stroke", "red");
      polyline.setAttribute("points", points);
      g.appendChild(polyline);

      //مختصات نقطه اول سمبل عدم پاسخ
      xNR = 0;
      yNR = r;
      xNR += x;
      yNR += y;

      break;

    case "R_AC_M":
    case "R_AC_M_NR":
      // GH = r / 2	= dy
      // HB = 3/2 * r * Sin 60 = dx
      dx = (3 / 2) * r * Math.tan(Math.PI / 6);
      dy = r / 2;
      // A(0 , r) B(dx , dy) C(-dx , dy)
      // C is O for NR
      // ذخیره مختصات مبدا علامت بدون پاسخ
      xNR = -dx + x;
      yNR = dy + y;
      dot = [0, -r, dx, dy, -dx, dy, 0, -r];
      points = [
        dot[0] + x,
        dot[1] + y,
        dot[2] + x,
        dot[3] + y,
        dot[4] + x,
        dot[5] + y,
        dot[6] + x,
        dot[7] + y,
      ];
      polyline = document.createElementNS(svgNS, "polyline");
      polyline.setAttribute("stroke-width", "0.6px");
      polyline.setAttribute("stroke-linecap", "round");
      polyline.setAttribute("stroke-miterlimit", "0");
      polyline.setAttribute("fill", "transparent");
      polyline.setAttribute("stroke", "red");
      polyline.setAttribute("points", points);
      g.appendChild(polyline);
      break;

    case "R_BC_M":
    case "R_BC_M_NR":
      dot = [0, -r, -r, -r, -r, r, 0, r];

      points = `${dot[0] + x}, ${dot[1] + y}
                    ${dot[2] + x}, ${dot[3] + y}
                    ${dot[4] + x}, ${dot[5] + y}
                    ${dot[6] + x}, ${dot[7] + y}
                    `;
      polyline = document.createElementNS(svgNS, "polyline");
      polyline.setAttribute("stroke-width", "0.6px");
      polyline.setAttribute("fill", "transparent");
      polyline.setAttribute("stroke", "red");
      polyline.setAttribute("points", points);
      g.appendChild(polyline);
      //مختصات نقطه اول سمبل عدم پاسخ
      xNR = -r;
      yNR = r;
      xNR += x;
      yNR += y;
      break;

    case "L_AC":
    case "L_AC_NR":
      const x1 = (Math.sqrt(2) / 2) * r;
      const y1 = -x1;
      dot = [x1, y1, -x1, -y1, -x1, y1, x1, -y1];

      points = [dot[0] + x, dot[1] + y, dot[2] + x, dot[3] + y];

      polyline = document.createElementNS(svgNS, "polyline");
      polyline.setAttribute("stroke-width", "0.6px");
      polyline.setAttribute("fill", "transparent");
      polyline.setAttribute("stroke", "blue");
      polyline.setAttribute("points", points);
      g.appendChild(polyline);

      points = [dot[4] + x, dot[5] + y, dot[6] + x, dot[7] + y];
      polyline = document.createElementNS(svgNS, "polyline");
      polyline.setAttribute("stroke-width", "0.6px");
      polyline.setAttribute("fill", "transparent");
      polyline.setAttribute("stroke", "blue");
      polyline.setAttribute("points", points);
      g.appendChild(polyline);
      break;

    case "L_AC_M":
    case "L_AC_M_NR":
      break;

    case "L_BC":
    case "L_BC_NR":
      dot = [0, -r, r, 0, 0, r];

      points = [
        dot[0] + x,
        dot[1] + y,
        dot[2] + x,
        dot[3] + y,
        dot[4] + x,
        dot[5] + y,
      ];

      polyline = document.createElementNS(svgNS, "polyline");
      polyline.setAttribute("stroke-width", "0.6px");
      polyline.setAttribute("fill", "transparent");
      polyline.setAttribute("stroke", "blue");
      polyline.setAttribute("points", points);
      g.appendChild(polyline);
      break;

    case "L_BC_M":
    case "L_BC_M_NR":
      dot = [0, -r, r, -r, r, r, 0, r];
      points = `${dot[0] + x}, ${dot[1] + y}
                      ${dot[2] + x}, ${dot[3] + y}
                      ${dot[4] + x}, ${dot[5] + y}
                      ${dot[6] + x}, ${dot[7] + y}
                      `;
      polyline = document.createElementNS(svgNS, "polyline");
      polyline.setAttribute("stroke-width", "0.6px");
      polyline.setAttribute("fill", "transparent");
      polyline.setAttribute("stroke", "blue");
      polyline.setAttribute("points", points);
      g.appendChild(polyline);
      break;
  }

  //رسم قسمت NR
  if (getLastLetters(symbol) == "NR") {
    g.appendChild(createNRSVG(symbol[0], xNR, yNR));
  }
  return g;
}

// تابع ایجاد تصویر عدم پاسخ
function createNRSVG(side, x, y) {
  let symColor = side == "R" ? "red" : "blue";
  let angle = side == "R" ? "135" : "45";
  const a = r / 2;
  const x1 = a * Math.cos(Math.PI / 6);
  const y1 = a * Math.sin(Math.PI / 6);
  // مختصات سه نقطه فلش
  //A, B, C
  let points = [-x1 + r + x, -y1 + y, r + x, y, -x1 + x + r, y1 + y];
  const g = document.createElementNS(svgNS, "g");
  let polyline = document.createElementNS(svgNS, "polyline");
  polyline.setAttribute("stroke-width", "0.4px");
  polyline.setAttribute("fill", "transparent");
  polyline.setAttribute("stroke", symColor);
  polyline.setAttribute("points", points);
  g.appendChild(polyline);
  // مختصات خط فلش
  points = [x, y, x + r, y];
  polyline = document.createElementNS(svgNS, "polyline");
  polyline.setAttribute("stroke-width", "0.4px");
  polyline.setAttribute("fill", "transparent");
  polyline.setAttribute("stroke", symColor);
  polyline.setAttribute("points", points);
  g.setAttribute("transform", `rotate(${angle} ${x} ${y})`);
  g.appendChild(polyline);
  return g;
}

// تابع برگردادندن دو حرف آخر
function getLastLetters(symbol) {
  const l = symbol.length;
  return symbol[l - 2] + symbol[l - 1];
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
