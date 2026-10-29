const PHONE = '+375 33 992-21-15';
const TEL = 'tel:+375339922115';

const REC = [
  ['Замер', 'бесплатно', 'с образцами на объекте'],
  ['Цена', 'в договоре', 'до конца работ'],
  ['Монтаж', 'бригада', 'дата при договоре'],
];

export default function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap">
        <div className="hero__grid">
          <div>
            <div className="hero__plate micro">ИП Лащ Н. В. · Молодечно и район</div>
            <h1>Натяжные потолки <em>без головной боли</em></h1>
            <p className="lead hero__lead">
              Приеду на бесплатный замер с образцами, посчитаю при вас и зафиксирую сумму в договоре.
              Эконом и премиум, сложные профили, световые линии.
            </p>
            <div className="hero__cta">
              <a className="btn" href={TEL}>{PHONE}</a>
              <a className="link-line" href="#zayavka">Вызвать замер</a>
            </div>
          </div>

          <div>
            <div className="rec">
              {REC.map(([k, v, note]) => (
                <div className="rec__row" key={k}>
                  <span className="rec__k">{k}</span>
                  <span className="rec__v"><b>{v}</b> · {note}</span>
                </div>
              ))}
            </div>
            <p className="rec__foot">
              Никаких доплат по нашей инициативе: сумма остаётся неизменной до конца работы.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
