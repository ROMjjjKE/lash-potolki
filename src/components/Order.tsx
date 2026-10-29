const STEPS = [
  {
    n: '01',
    title: 'Бесплатный замер с образцами',
    text: 'Приезжаю на объект со всеми образцами: смотрите вживую, а не по фото в телефоне. Считаю при вас.',
  },
  {
    n: '02',
    title: 'Договор и дата',
    text: 'Запускаем материал в производство, заключаем договор с гарантией и назначаем точную или ориентировочную дату монтажа.',
  },
  {
    n: '03',
    title: 'Монтаж бригадой',
    text: 'Приезжает бригада монтажников, делает работу и убирает за собой. Сумма к этому моменту уже зафиксирована.',
  },
];

export default function Order() {
  return (
    <section className="section" id="poryadok">
      <div className="wrap">
        <div className="cols shead">
          <div className="shead__num micro">04 / порядок</div>
          <h2 className="shead__title reveal">Три шага до нового потолка</h2>
          <p className="shead__note reveal">
            Никаких «уточним на месте»: цена и дата появляются до того, как материал ушёл в производство.
          </p>
        </div>
        <div className="order reveal" style={{ marginTop: 'clamp(20px, 2.6vw, 36px)' }}>
          {STEPS.map((s) => (
            <article className="order__item" key={s.n}>
              <span className="order__n num">{s.n}</span>
              <h4>{s.title}</h4>
              <p>{s.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
