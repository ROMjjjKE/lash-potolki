import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
const p = await b.newPage();
const errs = [];
p.on('pageerror', e => errs.push(e.message));
p.on('console', m => { if (m.type() === 'error') errs.push('c:' + m.text().slice(0, 120)); });
await p.setViewport({ width: 1440, height: 900 });
await p.evaluateOnNewDocument(() => {
  window.__s = [];
  new PerformanceObserver(l => { for (const e of l.getEntries()) if (!e.hadRecentInput) window.__s.push(+e.value.toFixed(4)); }).observe({ type: 'layout-shift', buffered: true });
});
await p.goto('http://127.0.0.1:4240/lash-potolki/', { waitUntil: 'networkidle2' });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 900));
console.log(JSON.stringify(await p.evaluate(() => {
  const c = document.createElement('canvas').getContext('2d');
  const s = 'Натяжные потолки в Молодечно: бесплатный замер с образцами';
  const w = f => { c.font = f; return +c.measureText(s).width.toFixed(1); };
  return {
    spectral: w('600 40px Spectral'), georgia: w('600 40px Georgia'),
    rubik: w('400 40px Rubik'), arial: w('400 40px Arial'),
    ratioSp: +(w('600 40px Spectral') / w('600 40px Georgia')).toFixed(4),
    ratioRb: +(w('400 40px Rubik') / w('400 40px Arial')).toFixed(4),
    h1: document.querySelector('h1').innerText, cls: +window.__s.reduce((a, b) => a + b, 0).toFixed(4),
    fonts: [...document.fonts].filter(f => f.status === 'loaded').length,
  };
}), null, 1), errs.slice(0, 3));
await b.close();
