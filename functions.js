export { insertSymbol, removePreSymbol, handleArrowKeyDown, moveDirector };

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

import createSymbolSVG from "./createSymbolSVG.js";

// تابع قرار دادن سمبل انتخاب شده در نقطه مورد نظر

function insertSymbol(svg, symbol, x, y) { 
  const g = document.createElementNS(svgNS, "g");
  g.setAttribute("id", `${symbol}_${xFrequency[x]}`);
  g.setAttribute("class", symbol);
  g.appendChild(createSymbolSVG(symbol, x, y));
  svg.appendChild(g);
}

//تابع حذف سمبل قبلی ادیوگرام

function removePreSymbol(symbol, frequency) {
  const rootSymbolName = symbol.substring(0, 4);

  // حرف اول سمبل که راست و چپ را میده
  const side = symbol[0];

  //آرایه ای از سمبل های هم‌خانواده سمبل انتخاب شده بساز
  const familySymbol = [
    rootSymbolName,
    `${rootSymbolName}_NR`,
    `${rootSymbolName}_M`,
    `${rootSymbolName}_M_NR`,
  ];

  // اگر سمبل‌های هم‌خانواده سمبل انتخابی در خط فرکانسی وجود داشت برو المنت سمبل قبلی رو پاک کن
  // R_AC, R_AC_M, R_AC_NR, R_AC_M_NR - sample family
  let preSymbolElement, preSymbol;

  familySymbol.forEach((i) => {
    preSymbolElement = document.getElementById(i + "_" + frequency);
    //prn(preSymbolElement)

    if (preSymbolElement != null) {
      preSymbol = preSymbolElement.classList[0];

      // اگر در یک خط فرکانسی سمبل قبلی و سمبل فعلی از یک زوح بودند قبلی رو از آبجکت ادیوگرام هم پاک کن
      //instance of pair Symbols: (R_AC, R_AC_NR) (L_BC_M, L_BC_M_NR)
      //سمبل‌های زوج فقط در قسمت NR با هم تفاوت دارند

      if (isPair(symbol, preSymbol))
        delete audiogramObj[side][preSymbol][frequency];

      // حذف سمبل قبلی هم‌خانواده از دام
      preSymbolElement.remove();
    }
  });
}

// تابع تشخیص دو سمبل جفت

function isPair(s1, s2) {
  let greaterS, smallerS;
  // رشته بزرگ تر رو پیدا کن
  // اگر دو حرف آخرش ان‌آٰر نیست فالس رو برگردون
  //از رشته پیدا شده خط تیره ان‌آر رو حذف کن
  //اگر این رشته با رشته دیگه برابر هست ترو رو برگردون وگرنه فالس
  if (s2 == s1) return false;
  if (s2.length > s1.length) {
    greaterS = s2;
    smallerS = s1;
  } else {
    greaterS = s1;
    smallerS = s2;
  }
  if (
    greaterS.includes(smallerS) &&
    greaterS.substring(greaterS.length - 2) == "NR"
  )
    return true;

  return false;
}

// فراخوانی تابع هندل کلیدهای جهت نما

function handleArrowKeyDown(keyCode) {
  switch (keyCode) {
    case 37: // Left Arrow
      moveDirector("R", currentAuthLocal["R"]["X"] - 20, currentAuthLocal.R.Y);
      break;
    case 38: // Up Arrow
      moveDirector("R", currentAuthLocal["R"]["X"], currentAuthLocal.R.Y - 5);
      break;
    case 39: // Right Arrow
      moveDirector("R", currentAuthLocal["R"]["X"] + 20, currentAuthLocal.R.Y);
      break;
    case 40: // Down Arrow
    moveDirector("R", currentAuthLocal["R"]["X"], currentAuthLocal.R.Y + 5);
      break;
    default:
      break;
  }

  console.log(keyCode);
}

// فراخوانی تابع جابجایی دایره راهنما

function moveDirector(side, x, y) {
  switch (side) {
    case "R":
      // آپدیت کردن آرایه نگهداری مختصات محلی مجاز جاری
      currentAuthLocal["R"]["X"] = x;
      currentAuthLocal.R.Y = y;

      if (x != -1 && y != -1) {
        // قرار دادن دایره دایرکتور در نقطه رند مجاز نزدیک به نشانگر موس
        r_director.setAttribute("cx", `${x}`);
        r_director.setAttribute("cy", `${y}`);
      }
      break;
    case "L":
      // آپدیت کردن آرایه نگهداری مختصات محلی مجاز جاری
      currentAuthLocal["L"]["X"] = x;
      currentAuthLocal.L.Y = y;

      if (x != -1 && y != -1) {
        // قرار دادن دایره دایرکتور در نقطه رند مجاز نزدیک به نشانگر موس
        l_director.setAttribute("cx", `${x}`);
        l_director.setAttribute("cy", `${y}`);
      }
      break;
    default:
      break;
  }
}
