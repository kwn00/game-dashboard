// 픽셀아트 썸네일(SVG) 생성기: node tools/make-thumbs.mjs
import { writeFileSync } from 'node:fs';

const W = 96, H = 54; // 16:9 픽셀 캔버스
const C = {
  line: '#11111b', bg: '#1e1e2e', bg2: '#181825', panel: '#313244', text: '#cdd6f4',
  muted: '#9399b2', green: '#a6e3a1', red: '#f38ba8', yellow: '#f9e2af', blue: '#89b4fa',
  purple: '#cba6f7', orange: '#fab387', cyan: '#89dceb', white: '#ffffff', dkred: '#7a2e45',
  ice: '#dbeafe', dkblue: '#1e3a5f', fire: '#e64553', dkorange: '#8a4b2b',
};

function canvas() { const r = []; return { r, px(x, y, c) { r.push([x, y, 1, 1, c]); }, rect(x, y, w, h, c) { r.push([x, y, w, h, c]); } }; }
// 문자맵 스프라이트: '.'=투명, 나머지는 팔레트 키
function sprite(cv, map, x0, y0, pal) {
  map.trim().split('\n').forEach((row, y) => [...row.trim()].forEach((ch, x) => { if (ch !== '.') cv.px(x0 + x, y0 + y, pal[ch]); }));
}
function toSvg(cv) {
  const body = cv.r.map(([x, y, w, h, c]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" shape-rendering="crispEdges">${body}</svg>\n`;
}
let seed = 7; const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);

const DEV = `
..kkkk..
.khhhhk.
.kssssk.
.kskskk.
.kssssk.
..kggk..
.kggggk.
kgggggk.
.kggggk.
.kk..kk.`;
const BUG = `
k...k
.kkk.
krrrk
.rkr.
krrrk
.kkk.`;
const BUGPAL = { k: C.line, r: C.red };

// ---------- FRIDAY DEPLOY: 금요일 밤 배포, 버그 떼에 둘러싸인 개발자 ----------
{
  seed = 11; const cv = canvas();
  cv.rect(0, 0, W, H, C.bg2);
  for (let y = 0; y < 30; y += 2) cv.rect(0, y, W, 2, y < 10 ? '#2a1b2e' : y < 20 ? '#24192b' : C.bg2);
  for (let i = 0; i < 30; i++) cv.px(Math.floor(rnd() * W), Math.floor(rnd() * 26), rnd() > .7 ? C.yellow : C.muted);
  // 달
  cv.rect(80, 4, 5, 9, C.yellow); cv.rect(79, 5, 7, 7, C.yellow); cv.px(81, 7, '#e5c890'); cv.px(83, 10, '#e5c890'); cv.px(82, 8, '#e5c890');
  // 바닥 타일
  for (let x = 0; x < W; x += 6) for (let y = 34; y < H; y += 6) cv.rect(x, y, 6, 6, ((x + y) / 6) % 2 ? '#24273a' : '#1f2133');
  // 캘린더 FRI
  cv.rect(6, 6, 22, 20, C.line); cv.rect(7, 7, 20, 18, C.text); cv.rect(7, 7, 20, 5, C.red);
  sprite(cv, `
ttt.tt..t
t...t.t.t
tt..tt..t
t...t.t.t
t...t.t.t`, 12, 15, { t: C.line });
  cv.px(10, 6, C.muted); cv.px(23, 6, C.muted);
  // 개발자 + 노트북
  sprite(cv, DEV, 44, 26, { k: C.line, h: C.purple, s: '#f2cdcd', g: C.green });
  cv.rect(52, 32, 7, 1, C.muted); cv.rect(53, 28, 6, 4, C.blue); cv.rect(54, 29, 4, 1, C.white);
  // 버그 떼
  [[20, 36], [30, 44], [12, 46], [66, 38], [74, 46], [62, 48], [84, 36], [36, 30], [70, 28], [4, 38], [88, 44], [26, 50]]
    .forEach(([x, y]) => sprite(cv, BUG, x, y, BUGPAL));
  // 투사체
  [[40, 30], [36, 34], [60, 31], [64, 34]].forEach(([x, y]) => cv.rect(x, y, 2, 1, C.yellow));
  // HP 바
  cv.rect(4, 2, 30, 3, C.line); cv.rect(5, 3, 18, 1, C.red);
  writeFileSync('thumbs/friday-deploy.svg', toSvg(cv));
}

// ---------- CODE FREEZE: 얼어붙은 서버실, 눈송이 ----------
{
  seed = 23; const cv = canvas();
  for (let y = 0; y < H; y += 3) cv.rect(0, y, W, 3, y < 18 ? '#1b2a44' : y < 36 ? '#182339' : '#141c2e');
  // 서버 랙 3개
  [10, 36, 62].forEach((x, i) => {
    cv.rect(x, 12, 22, 34, C.line); cv.rect(x + 1, 13, 20, 32, C.panel);
    for (let s = 0; s < 5; s++) {
      const y = 15 + s * 6; cv.rect(x + 3, y, 16, 4, C.bg2);
      cv.px(x + 4, y + 1, (s + i) % 3 ? C.cyan : C.blue); cv.px(x + 6, y + 1, C.blue);
      cv.rect(x + 9, y + 2, 8, 1, '#45475a');
    }
    // 얼음 덮개 / 고드름
    cv.rect(x, 11, 22, 2, C.ice); cv.rect(x + 1, 10, 20, 1, C.white);
    for (let k = 1; k < 21; k += 3) cv.rect(x + k, 13, 1, 2 + ((k + i) % 4), C.ice);
  });
  // 자물쇠 (동결)
  cv.rect(42, 30, 10, 9, C.line); cv.rect(43, 31, 8, 7, C.yellow); cv.rect(46, 33, 2, 3, C.line);
  cv.rect(44, 26, 6, 1, C.line); cv.rect(43, 27, 1, 3, C.line); cv.rect(50, 27, 1, 3, C.line);
  // 눈 바닥
  cv.rect(0, 46, W, 8, C.ice); for (let x = 0; x < W; x += 5) cv.rect(x, 45, 3, 1, C.white);
  cv.rect(0, 50, W, 4, '#b4c7e8');
  // 눈송이
  for (let i = 0; i < 40; i++) { const x = Math.floor(rnd() * W), y = Math.floor(rnd() * 44); cv.px(x, y, C.white); if (rnd() > .75) { cv.px(x - 1, y, C.ice); cv.px(x + 1, y, C.ice); cv.px(x, y - 1, C.ice); cv.px(x, y + 1, C.ice); } }
  // 상단 배너 ❄
  cv.rect(4, 2, 30, 4, C.line); cv.rect(5, 3, 28, 2, C.blue);
  writeFileSync('thumbs/code-freeze.svg', toSvg(cv));
}

// ---------- HOTFIX RELOAD: 불타는 프로덕션, 렌치와 새로고침 ----------
{
  seed = 5; const cv = canvas();
  for (let y = 0; y < H; y += 3) cv.rect(0, y, W, 3, y < 18 ? '#2b1a1a' : y < 36 ? '#33201c' : '#3a2418');
  // 모니터
  cv.rect(26, 8, 44, 30, C.line); cv.rect(28, 10, 40, 24, C.bg2);
  cv.rect(44, 38, 8, 4, C.line); cv.rect(38, 42, 20, 2, C.line);
  // 터미널 로그
  [[30, 12, 20, C.red], [30, 15, 28, C.muted], [30, 18, 16, C.red], [30, 21, 24, C.muted], [30, 24, 12, C.yellow], [30, 27, 22, C.green]]
    .forEach(([x, y, w, c]) => cv.rect(x, y, w, 1, c));
  // 새로고침 화살표 (원형)
  const cx = 58, cy = 24;
  for (let a = 0; a < 300; a += 6) { const r = a * Math.PI / 180; cv.rect(Math.round(cx + Math.cos(r) * 6), Math.round(cy + Math.sin(r) * 6), 1, 1, C.cyan); }
  sprite(cv, `
c....
cc...
ccc..`, 62, 18, { c: C.cyan });
  // 렌치
  sprite(cv, `
.yy.yy...........
.yyyyy...........
..yyyyy..........
....yyyyy........
......yyyyy......
........yyyyy....
..........yyyyy..
............yyy..`, 6, 36, { y: C.muted });
  // 불꽃
  const flame = `
...o.....
..oo..o..
..ooo.oo.
.oyoo.oo.
.oyyooooo
ooyyyyoyo
oyywyyyyo
oyywwyyyo
.oyyyyyo.`;
  [[2, 10], [80, 30], [72, 44], [14, 44], [86, 8]].forEach(([x, y]) => sprite(cv, flame, x, y, { o: C.fire, y: C.orange, w: C.yellow }));
  // 바닥
  cv.rect(0, 52, W, 2, C.line);
  // 불씨
  for (let i = 0; i < 18; i++) cv.px(Math.floor(rnd() * W), Math.floor(rnd() * 50), rnd() > .5 ? C.orange : C.yellow);
  writeFileSync('thumbs/hotfix-reload.svg', toSvg(cv));
}
console.log('thumbs written');
