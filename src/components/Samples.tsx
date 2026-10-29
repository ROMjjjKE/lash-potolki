import { useEffect, useRef, useState } from 'react';

const SAMPLES = [
  {
    id: 'mat',
    n: '01',
    title: 'Матовый',
    rows: [['Блик', 'нет'], ['Основание', 'скрывает лучше всех'], ['Уход', 'сухая салфетка']] as [string, string][],
    where: ['спальня', 'гостиная', 'детская'],
    text: 'Ровный матовый свет без отражений. Прощает неровности основания и не показывает отпечатки.',
  },
  {
    id: 'satin',
    n: '02',
    title: 'Сатин',
    rows: [['Блик', 'мягкий'], ['Основание', 'требовательнее мата'], ['Уход', 'влажная салфетка']] as [string, string][],
    where: ['кухня', 'коридор', 'гостиная'],
    text: 'Между матом и глянцем: лёгкий отблеск при боковом свете, но без зеркальности и резких отражений.',
  },
  {
    id: 'gloss',
    n: '03',
    title: 'Глянцевый',
    rows: [['Блик', 'сильный'], ['Основание', 'видно всё'], ['Уход', 'чаще, видны разводы']] as [string, string][],
    where: ['ванная', 'небольшая кухня'],
    text: 'Отражает и визуально поднимает низкий потолок. Требует ровного основания и аккуратной уборки.',
  },
  {
    id: 'fabric',
    n: '04',
    title: 'Тканевый',
    rows: [['Блик', 'нет'], ['Монтаж', 'без нагрева помещения'], ['Уход', 'осторожный']] as [string, string][],
    where: ['спальня', 'неотапливаемые помещения'],
    text: 'Полотно без блика, монтаж без прогрева комнаты. Впитывает запахи, поэтому на кухне не лучший выбор.',
  },
];

export default function Samples() {
  const [pin, setPin] = useState(false);
  const [auto, setAuto] = useState(0);
  const [manual, setManual] = useState(0);
  const active = pin ? auto : manual;

  const stageRef = useRef<HTMLDivElement>(null);
  const layers = useRef<Array<HTMLDivElement | null>>([]);

  const paint = (vals: number[], smooth: boolean) => {
    layers.current.forEach((el, i) => {
      if (!el) return;
      el.style.transition = smooth ? 'opacity .5s cubic-bezier(.16,1,.3,1)' : 'none';
      el.style.opacity = String(vals[i] ?? 0);
    });
  };

  useEffect(() => {
    if (pin) return;
    paint(SAMPLES.map((_, i) => (i === manual ? 1 : 0)), true);
  }, [manual, pin]);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 980px)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!desktop.matches || calm.matches) return;

    let killed = false;
    let cleanup: (() => void) | null = null;
    let timer: number | undefined;

    const begin = () =>
      Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(([{ default: gsap }, { ScrollTrigger }]) => {
        if (killed || !stageRef.current) return;
        gsap.registerPlugin(ScrollTrigger);
        setPin(true);

        requestAnimationFrame(() => requestAnimationFrame(() => {
          const stage = stageRef.current;
          if (killed || !stage) return;
          const step = 1 / (SAMPLES.length - 1);
          const trigger = ScrollTrigger.create({
            trigger: stage,
            start: 'top top',
            end: () => '+=' + Math.round(window.innerHeight * 1.9),
            pin: true,
            scrub: 0.5,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const pos = self.progress * (SAMPLES.length - 1);
              const vals = SAMPLES.map((_, i) => Math.max(0, 1 - Math.abs(pos - i)));
              paint(vals, false);
              const i = Math.min(SAMPLES.length - 1, Math.max(0, Math.round(pos)));
              setAuto((prev) => (prev === i ? prev : i));
            },
          });
          void step;
          ScrollTrigger.refresh();
          cleanup = () => trigger.kill();
        }));
      });

    const io = new IntersectionObserver((entries) => {
      if (entries.some((e) => e.isIntersecting)) {
        io.disconnect();
        timer = window.setTimeout(begin, 80);
      }
    }, { rootMargin: '320px 0px' });
    if (stageRef.current) io.observe(stageRef.current);

    return () => {
      killed = true;
      io.disconnect();
      if (timer) clearTimeout(timer);
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <section className={`samples ${pin ? 'samples--pin' : 'samples--manual'}`} id="obrazcy">
      <div className="wrap samples__head">
        <div className="cols shead">
          <div className="shead__num micro">03 / образцы</div>
          <h2 className="shead__title reveal">Четыре типа полотна</h2>
          <p className="shead__note reveal" style={{ color: 'rgba(241,239,233,0.7)' }}>
            На замере вы смотрите эти образцы вживую. Здесь — разница в отблеске и в том, где каждый уместен.
          </p>
        </div>
      </div>

      <div className="samples__stage" ref={stageRef}>
        <div className="wrap samples__inner">
          <div className="plane" role="img" aria-label={`Образец полотна: ${SAMPLES[active].title}`}>
            {SAMPLES.map((s, i) => (
              <div
                className="plane__layer"
                data-f={s.id}
                key={s.id}
                ref={(el) => { layers.current[i] = el; }}
                style={i === 0 ? { opacity: 1 } : { opacity: 0 }}
              />
            ))}
            <div className="plane__edge" aria-hidden="true" />
            <div className="plane__cap num">{SAMPLES[active].n} · {SAMPLES[active].title}</div>
          </div>

          <div className="spec">
            <div className="spec__n num">{SAMPLES[active].n} / 04</div>
            <h3>{SAMPLES[active].title}</h3>
            <div className="spec__rows">
              {SAMPLES[active].rows.map(([k, v]) => (
                <div key={k}><span>{k}</span><b>{v}</b></div>
              ))}
            </div>
            <p className="body-s" style={{ color: 'rgba(241,239,233,0.78)', marginTop: 14, fontSize: 'var(--fs-14)' }}>
              {SAMPLES[active].text}
            </p>
            <div className="spec__list">
              {SAMPLES[active].where.map((w) => <i key={w}>{w}</i>)}
            </div>
          </div>
        </div>
      </div>

      <div className="wrap">
        <div className="specs-rail">
          {SAMPLES.map((s, i) => (
            <button
              key={s.id}
              type="button"
              className={i === active ? 'on' : ''}
              onClick={() => { if (!pin) setManual(i); }}
              aria-pressed={i === active}
            >
              {s.n} {s.title}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
