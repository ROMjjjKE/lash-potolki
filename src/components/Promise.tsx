const ITEMS = [
  ['Сумма', 'фиксируется в договоре до начала работ и не меняется по нашей инициативе.'],
  ['Доплаты', 'не появляются по ходу. Если что-то меняете вы — обсуждаем заранее.'],
  ['Гарантия', 'по договору, а не «на словах». Условия прописаны в документе.'],
  ['Смета', 'считается на замере, при вас, по вашим размерам, а не «от балды по телефону».'],
];

export default function Promise() {
  return (
    <section className="section" id="garantiya">
      <div className="wrap promise">
        <div>
          <div className="micro" style={{ marginBottom: 14 }}>05 / обещание</div>
          <p className="promise__quote reveal">
            «Никаких подводных камней и изменений цен по нашей инициативе: сумма остаётся
            <em> неизменной до конца работы</em>».
          </p>
          <p className="body-s reveal" style={{ marginTop: 18 }}>
            Это главная причина, по которой люди боятся ремонта: не сам потолок, а то, что итог окажется
            в два раза дороже и в три раза позже. Поэтому в договоре фиксируется именно сумма.
          </p>
        </div>
        <ul className="promise__list reveal">
          {ITEMS.map(([k, v], i) => (
            <li key={k}>
              <b>{String(i + 1).padStart(2, '0')}</b>
              <span><strong>{k}. </strong>{v}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
