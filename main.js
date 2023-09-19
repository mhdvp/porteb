// رسم پنل سمبل‌ها

drawSymbolPanel(R_sym_panel, 0, 0);
drawSymbolPanel(L_sym_panel, 0, 0);

// رسم ادیوگرام راست و چپ

drawAudTable(R_aud_table);
drawAudTable(L_aud_table);

// هندل کردن حرکت موس روی صفحه ادیوگرام

R_aud_table.onmousemove = L_aud_table.onmousemove = handleMouseMove;

function handleMouseMove(e) {
  const xy = getAuthLocalCordinate(e);
  const x = xy[0],
    y = xy[1];

  // فراخوانی تابع جابجایی دایره راهنما
  moveDirector(this.id[0], x, y);
}

// فراخوانی تابع هندل کلیک روی فرم با وقوع رویداد کلیک روی فرم

R_aud_table.onclick = L_aud_table.onclick = handleClickOnAudTable;

//تابع هندل کردن کلیک روی فرم ادیوگرام

function handleClickOnAudTable(e) {
  const NR = e.ctrlKey; // بررسی فشردن کلید کنترل برای تغییر سمبل به عدم‌پاسخ
  const targetSVG = this; // آی‌دی اس‌وی‌جی راست یا چپ
  //به دست آوردن مختصات محلی پیکسلی المنت  (در اینجا صفحه ادیوگرام انتخاب شده)
  let xy = [];
  xy = getAuthLocalCordinate(e);
  const frequency = xFrequency[xy[0]]; // به‌دست آوردن فرکانس انتخاب شده
  const intensity = yIntensity[xy[1]]; // به دست آوردن شدت انتخاب شده

  const side = this.id[0]; // به‌دست آوردن راست یا چپ
  let symbol = selectedSymbolObj[this.id[0]]; // به‌دست آوردن رشته سمبل

  if (NR) symbol += "_NR"; //اصلاح رشته سمبل به عدم پاسخ در صورت انتخاب

  removePreSymbol(symbol, frequency); //حذف سمبل قبلی

  insertSymbol(targetSVG, symbol, xy[0], xy[1]); // جاگذاری سمبل انتخاب شده

  //به‌روزرسانی یا ایجاد پراپرتی آبجکت ادیوگرام با مقدار فرکانس-شدت کلیک شده
  audiogramObj[side][symbol][frequency] = intensity;
}

// هندل کردن فشردن کلید روی صفحه ادیوگرام

R_aud_table.onkeydown = L_aud_table.onkeydown = handleKeyDown;

function handleKeyDown(e) {
  e.preventDefault();
  const NR = e.ctrlKey;

  const targetSVG = this; // آی‌دی اس‌وی‌جی راست یا چپ

  const side = this.id[0]; // به‌دست آوردن راست یا چپ

  //به دست آوردن مختصات محلی پیکسلی المنت  (در اینجا صفحه ادیوگرام انتخاب
  const x = currentAuthLocal[side]["X"];
  const y = currentAuthLocal[side]["Y"];

  let symbol = selectedSymbolObj[this.id[0]]; // به‌دست آوردن رشته سمبل
  const frequency = xFrequency[x]; // به‌دست آوردن فرکانس انتخاب شده
  const intensity = yIntensity[y]; // به دست آوردن شدت انتخاب شده

  if (NR) symbol += "_NR"; //اصلاح رشته سمبل به عدم پاسخ در صورت انتخاب

  console.log(e.keyCode);
  switch (e.keyCode) {
    case 13: // Space Key
    case 32: // Enter Key
      removePreSymbol(symbol, frequency); //حذف سمبل قبلی

      insertSymbol(targetSVG, symbol, x, y); // جاگذاری سمبل انتخاب شده

      //به‌روزرسانی یا ایجاد پراپرتی آبجکت ادیوگرام با مقدار فرکانس-شدت کلیک شده
      audiogramObj[side][symbol][frequency] = intensity;

      break;
    case 37: // Left Arrow
    case 38: // Up Arrow
    case 39: // Right Arrow
    case 40: // Down Arrow
      console.log("Arrow");
      // فراخوانی تابع هندل کلیدهای جهت نما
      handleArrowKeyDown(e.keyCode);

      break;
  }
}

R_sym_panel.onclick = L_sym_panel.onclick = handleClickOnSymPanel;

// تابع هندل کردن کلیک روی پنل سمبل‌ها

function handleClickOnSymPanel(e) {
  // جایگزین بالایی با آبجکت
  selectedSymbolObj[e.target.id[0]] = e.target.id;
}

// تبدیل مختصات x پیکسلی به مختصات رند x کاربر

function toLocalX(x) {
  let userX = ratio * x + userXOrigin;
  let roundUserX = Math.round(userX);
  return roundUserX;
}

// تبدیل مختصات y پیکسلی به مختصات رند y کاربر

function toLocalY(y) {
  let userY = ratio * y + userYOrigin;
  let roundUserY = Math.round(userY);
  return roundUserY;
}

//تابع  رو به نام جدید بازنویسی می‌کنم
// دریافت یک عدد و یک آرایه عدد و و پیدا کردن نزدیک ترین عدد آرایه به عدد دریافتی و برگرداندن آن

function getNearestNumber(a, arr) {
  let i = 0;
  let l = arr.length;
  // اول پیدا کردن دو عدد احاطه کننده عدد مورد سوال
  while (a > arr[i] && i < l - 1) {
    i++;
  }
  if (a - arr[i - 1] <= arr[i] - a) {
    return arr[i - 1];
  } else return arr[i];
}

// تابع دریافت یک رویداد و برگشت مختصات محلی مجاز

function getAuthLocalCordinate(e) {
  const offsetX = e.offsetX;
  const offsetY = e.offsetY;
  let xy = [];
  xy[0] = toLocalX(offsetX);
  xy[1] = toLocalY(offsetY);

  xy[0] = getNearestNumber(xy[0], dotX);
  xy[1] = getNearestNumber(xy[1], dotY);

  return xy;
}

// فوکوس شدن روی صفحه ادیوگرام با ورود نشانگر موس به آن

R_aud_table.onmouseenter = L_aud_table.onmouseenter = (e) => {
  e.target.focus({ focusVisible: true });
  //console.log(e.target.id);
  //currentAudTable = e.target.id;
};

// از دست دادن فوکوس با خارج شدن موس از صفحه ادیوگرام

R_aud_table.onmouseleave = L_aud_table.onmouseleave = (e) => {
  //e.target.focus({ focusVisible: true }) = false;
  //console.log(e.target.id);
  //e.target.blur();
};

// وارد کردن داده‌های سراسری
import {
  selectedSymbolObj,
  audiogramObj,
  xFrequency,
  yIntensity,
  currentAuthLocal,
  userXOrigin,
  ratio,
  userYOrigin,
  dotX,
  dotY,
} from "./initials.js";

import drawAudTable from "./drawAudTable.js";

import drawSymbolPanel from "./drawSymbolPanel.js";

import {
  removePreSymbol,
  insertSymbol,
  handleArrowKeyDown,
  moveDirector,
} from "./functions.js";
