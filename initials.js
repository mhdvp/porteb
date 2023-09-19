export {
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
};

// بعدا این مقدار رو برابر با dI باید قرار بدیم
const h = 5; // تعریف ارتفاع دو خط افقی محصورکننده سمبل ها
const r = h / 2; // نصف ارتفاع بیس‌لاین
const ptv = 4.5; //نسبت اندازه پیکسلی به ویوباکس کاربر
const svgNS = "http://www.w3.org/2000/svg";

// تعریف مقدار پیش‌فرض سمبل انتخاب شده
let selectedSymbol = ["R_AC", "L_AC"];

//بالایی رو با آبجکت ریفکتور میکنم
let selectedSymbolObj = { R: "R_AC", L: "L_AC" };

const audiogramObj = {
  R: {
    R_AC: {},
    R_BC: {},
    R_AC_M: {},
    R_BC_M: {},
    R_AC_NR: {},
    R_BC_NR: {},
    R_AC_M_NR: {},
    R_BC_M_NR: {},
  },
  L: {
    L_AC: {},
    L_BC: {},
    L_AC_M: {},
    L_BC_M: {},
    L_AC_NR: {},
    L_BC_NR: {},
    L_AC_M_NR: {},
    L_BC_M_NR: {},
  },
};

// تعریف آبجکت مختصات ایکس - فرکانس در تیبل ادیوگرام
const xFrequency = {
  // مقدار کلید برابر با مختصات محلی فرکانس هست
  20: 250,
  40: 500,
  53: 750,
  60: 1000,
  73: 1500,
  80: 2000,
  93: 3000,
  100: 4000,
  113: 6000,
  120: 8000,
};

// تعریف آبجکت مختصات ایگرگ - شدت در تیبل ادیوگرام
const yIntensity = {
  5: -15,
  10: -10,
  15: -5,
  20: 0,
  25: 5,
  30: 10,
  35: 15,
  40: 20,
  45: 25,
  50: 30,
  55: 35,
  60: 40,
  65: 45,
  70: 50,
  75: 55,
  80: 60,
  85: 65,
  90: 70,
  95: 75,
  100: 80,
  105: 85,
  110: 90,
  115: 95,
  120: 100,
  125: 105,
  130: 110,
  135: 115,
  140: 120,
  145: 125,
};

const symbolType = [
  "R_AC",
  "R_BC",
  "R_M_AC",
  "R_M_AC",
  "L_AC",
  "L_BC",
  "L_M_AC",
  "L_M_AC",
];

// مقداردهی اولیه مختصات محلی مجاز فعلی
let currentAuthLocal = {
  R: { X: 0, Y: 0 },
  L: { X: 0, Y: 0 },
};

const userXOrigin = -20;
const viewBoxWidth = 180;
const ratio = 1 / ptv;

const userYOrigin = -20;
const viewBoxHeight = 180;

const dI = [
  -15, -10, -5, 0, 5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75,
  80, 85, 90, 95, 100, 105, 110, 115, 120, 125,
];

// مختصات طولی نقاط مجاز (همه فرکانس‌های اصلی و نیم‌اکتاو)

const dotX = [20, 40, 53, 60, 73, 80, 93, 100, 113, 120];

// مختصات عرضی نقاط مجاز (همه شدت‌های اصلی و نیمه)

const dotY = [
  5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
  100, 105, 110, 115, 120, 125, 130, 135, 140, 145,
];

// یک دایره کوچک به‌عنوان نقطه نشانگر موقعیت مجاز مکان‌نما تعریف میکنیم
let circle = document.createElementNS(svgNS, "circle");
circle.setAttribute("id", "r_director");
circle.setAttribute("stroke", "black");
//circle.setAttribute("stroke-width", "0.1px");
//circle.setAttribute("fill", "transparent");
circle.setAttribute("cx", "0");
circle.setAttribute("cy", "0");
circle.setAttribute("r", "0.5");
R_aud_table.appendChild(circle);

// یک دایره کوچک به‌عنوان نقطه نشانگر موقعیت مجاز مکان‌نما تعریف میکنیم
circle = document.createElementNS(svgNS, "circle");
circle.setAttribute("id", "l_director");
circle.setAttribute("stroke", "black");
//circle.setAttribute("stroke-width", "0.1px");
//circle.setAttribute("fill", "transparent");
circle.setAttribute("cx", "0");
circle.setAttribute("cy", "0");
circle.setAttribute("r", "0.5");
L_aud_table.appendChild(circle);

// // یک المنت تکست برای توسعه دایرکتور ایجاد می‌کنیم
// const text = document.createElementNS(svgNS, "text");
// text.setAttribute("id", "txtdirector");
// //text.setAttribute("tabindex", "0");
// text.setAttribute("style", "font: 5px Verdana, Helvetica, Arial, sans-serif;");
// text.setAttribute("fill", "red");
// text.setAttribute("text-anchor", "middle");
// text.setAttribute("x", "0");
// text.setAttribute("y", "0");
// text.innerHTML = "1.5K | 55";
// r_aud_table.appendChild(text);


