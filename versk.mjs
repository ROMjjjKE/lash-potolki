import puppeteer from 'puppeteer-core';
const b = await puppeteer.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
for (const w of [320, 390, 480, 768, 1024, 1200, 1440, 1680]) {
  const p = await b.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  await p.setViewport({ width: w, height: 860 });
  await p.goto('http://127.0.0.1:4240/lash-potolki/', { waitUntil: 'networkidle2' });
  await p.evaluate(() => document.fonts.ready);
  await new Promise(r => setTimeout(r, 400));
  const st = await p.evaluate(() => {
    const over = [];
    document.querySelectorAll('*').forEach(el => { const r = el.getBoundingClientRect(); if (r.right > window.innerWidth + 1 && r.width > 0) over.push(el.tagName + '.' + (typeof el.className === 'string' ? el.className.split(' ')[0] : '')); });
    return { sw: document.documentElement.scrollWidth, inner: window.innerWidth, over: over.slice(0, 3), h1: getComputedStyle(document.querySelector('h1')).fontSize };
  });
  console.log(String(w).padStart(4), st.sw > st.inner ? 'OVERFLOW ' + st.over.join(',') : 'ok', st.h1, errs[0] || '');
  await p.close();
}
// сцена образцов
const p = await b.newPage();
await p.setViewport({ width: 1440, height: 900 });
await p.goto('http://127.0.0.1:4240/lash-potolki/', { waitUntil: 'networkidle2' });
await p.evaluate(() => { document.documentElement.style.scrollBehavior = 'auto'; });
await p.evaluate(() => document.fonts.ready);
await new Promise(r => setTimeout(r, 900));
const top = await p.evaluate(() => Math.round(document.querySelector('.samples__stage').getBoundingClientRect().top + window.scrollY));
for (let i = 0; i <= 5; i++) {
  await p.evaluate(y => window.scrollTo({ top: y, behavior: 'instant' }), top + i * 380);
  await new Promise(r => setTimeout(r, 600));
  console.log(i * 380, await p.evaluate(() => ({
    y: Math.round(document.querySelector('.samples__stage').getBoundingClientRect().top),
    cap: document.querySelector('.plane__cap').innerText,
    ops: [...document.querySelectorAll('.plane__layer')].map(l => +(+getComputedStyle(l).opacity).toFixed(2)),
  })));
}
await b.close();
