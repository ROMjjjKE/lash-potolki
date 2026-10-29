import { useState } from 'react';

const PLACE = ['Квартира', 'Частный дом', 'Офис / коммерция', 'Другое'];
const WHAT = ['Потолок в одну комнату', 'Несколько комнат', 'Вся квартира / дом', 'Сложный: уровни, световые линии'];
const PHONE = '+375 33 992-21-15';
const TEL = 'tel:+375339922115';

export default function Ask() {
  const [f, setF] = useState({ name: '', tel: '', place: PLACE[0], what: WHAT[0], city: 'Молодечно', note: '' });
  const [bad, setBad] = useState<Record<string, boolean>>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const set = (k: string, v: string) => setF((s) => ({ ...s, [k]: v }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, boolean> = {};
    if (f.name.trim().length < 2) errs.name = true;
    if (f.tel.replace(/\D/g, '').length < 9) errs.tel = true;
    setBad(errs);
    if (Object.keys(errs).length) return;

    setSending(true);
    const lines = [
      'Заявка с сайта: натяжные потолки (ИП Лащ)',
      `Имя: ${f.name}`,
      `Телефон: ${f.tel}`,
      `Населённый пункт: ${f.city || '—'}`,
      `Объект: ${f.place}`,
      `Объём: ${f.what}`,
      `Детали: ${f.note || '—'}`,
    ].join('\n');

    window.setTimeout(() => {
      window.open(`https://wa.me/375339922115?text=${encodeURIComponent(lines)}`, '_blank', 'noopener');
      setSending(false);
      setSent(true);
    }, 400);
  };

  return (
    <section className="ask" id="zayavka">
      <div className="wrap" style={{ paddingBlock: 'var(--sect)' }}>
        <div className="cols shead" style={{ marginBottom: 'clamp(20px, 3vw, 40px)' }}>
          <div className="shead__num micro">07 / замер</div>
          <h2 className="shead__title reveal">Вызвать бесплатный замер</h2>
          <p className="shead__note reveal" style={{ color: 'var(--ink-2)' }}>
            Позвоните или оставьте номер: перезвоню, договоримся о времени и приеду с образцами.
          </p>
        </div>

        <div className="ask__grid">
          <div>
            <div className="micro">Телефон</div>
            <a className="ask__phone" href={TEL}>{PHONE}</a>
            <p className="ask__hint">
              Если не отвечаю — значит на монтаже. Напишите в WhatsApp или оставьте заявку, перезвоню
              в тот же день.
            </p>
          </div>

          <form className="form" onSubmit={submit} noValidate>
            <div className="half">
              <div className={bad.name ? 'bad' : ''}>
                <label htmlFor="l-name">Имя</label>
                <input id="l-name" value={f.name} onChange={(e) => set('name', e.target.value)} autoComplete="name" aria-invalid={!!bad.name} />
                {bad.name && <span className="err">Как к вам обращаться</span>}
              </div>
              <div className={bad.tel ? 'bad' : ''}>
                <label htmlFor="l-tel">Телефон</label>
                <input id="l-tel" value={f.tel} onChange={(e) => set('tel', e.target.value)} inputMode="tel" autoComplete="tel" aria-invalid={!!bad.tel} />
                {bad.tel && <span className="err">Нужен номер для связи</span>}
              </div>
            </div>

            <div className="half">
              <div>
                <label htmlFor="l-city">Где объект</label>
                <input id="l-city" value={f.city} onChange={(e) => set('city', e.target.value)} placeholder="Молодечно, район" />
              </div>
              <div>
                <label htmlFor="l-place">Что за объект</label>
                <select id="l-place" value={f.place} onChange={(e) => set('place', e.target.value)}>
                  {PLACE.map((p) => <option key={p}>{p}</option>)}
                </select>
              </div>
            </div>

            <div className="field">
              <label htmlFor="l-what">Объём работ</label>
              <select id="l-what" value={f.what} onChange={(e) => set('what', e.target.value)}>
                {WHAT.map((w) => <option key={w}>{w}</option>)}
              </select>
            </div>

            <div className="field">
              <label htmlFor="l-note">Детали</label>
              <textarea id="l-note" rows={3} value={f.note} onChange={(e) => set('note', e.target.value)} placeholder="Например: трёхкомнатная, 62 м², матовый, свет по периметру" />
            </div>

            <button className="btn" type="submit" disabled={sending}>
              {sending ? 'Собираем заявку…' : 'Отправить в WhatsApp'}
            </button>

            {sent && (
              <div className="ask__ok" role="status">
                Заявка собрана и открыта в WhatsApp — осталось нажать «Отправить». Если окно не
                открылось, позвоните: <a href={TEL} style={{ borderBottom: '1px solid currentColor' }}>{PHONE}</a>.
              </div>
            )}

            <p className="ask__fine">
              Замер бесплатный и без обязательств: посчитаем при вас и оставим смету. Дальше решаете вы.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
