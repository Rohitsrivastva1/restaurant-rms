import React, { useMemo, useState } from 'react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import './cafeSample.css';

const TIMES = ['6:00 pm', '6:30 pm', '7:00 pm', '7:30 pm', '8:00 pm', '8:30 pm', '9:00 pm', '9:30 pm'];

const VARIANTS = {
  molten: {
    id: 'molten',
    name: 'Molten',
    theme: 'theme-molten',
    hero: '/cafe-samples/a-hero.png',
    heroAlt: 'AI-generated sample image of a wood-fired pizza cheese-pull',
    categories: [
      { id: 'pizza', label: 'Pizza', image: '/cafe-samples/a-pizza.png' },
      { id: 'burgers', label: 'Burgers', image: '/cafe-samples/a-burger.png' },
      { id: 'fries', label: 'Fries', image: '/cafe-samples/a-fries.png' },
    ],
    items: [
      { id: 'margherita', name: 'Wood-fired margherita', price: 399, line: 'Stretchy mozzarella, charred crust', image: '/cafe-samples/a-pizza.png', category: 'pizza', alt: 'AI-generated sample image of wood-fired margherita' },
      { id: 'burger', name: 'Smash cheeseburger', price: 349, line: 'Crispy-edged patties, molten cheddar', image: '/cafe-samples/a-burger.png', category: 'burgers', alt: 'AI-generated sample image of a smash cheeseburger' },
      { id: 'fries', name: 'Jalapeno cheese fries', price: 229, line: 'Crispy fries, cheese sauce, jalapeno', image: '/cafe-samples/a-fries.png', category: 'fries', alt: 'AI-generated sample image of jalapeno cheese fries' },
      { id: 'grill', name: 'Grilled cheese + tomato soup', price: 279, line: 'Golden toastie, stretchy cheese, hot soup', image: '/cafe-samples/a-grill.png', category: 'pizza', alt: 'AI-generated sample image of grilled cheese and tomato soup' },
      { id: 'soup', name: 'Tomato soup', price: 129, line: 'Slow-simmered, swirl of cream', image: '/cafe-samples/a-soup.png', category: 'pizza', alt: 'AI-generated sample image of tomato soup' },
      { id: 'slice', name: 'Cheesy garlic slice', price: 149, line: 'Crunchy edge, bubbling cheese', image: '/cafe-samples/a-slice.png', category: 'pizza', alt: 'AI-generated sample image of a cheesy garlic slice' },
    ],
  },
  fire: {
    id: 'fire',
    name: 'Fire',
    theme: 'theme-fire',
    hero: '/cafe-samples/b-hero.png',
    heroAlt: 'AI-generated sample image of chilli-oil momos',
    items: [
      { id: 'momos', name: 'Chilli-oil momos', price: 189, line: 'Glossy chilli oil, steaming hot', image: '/cafe-samples/b-momos.png', spice: 3, veg: true, alt: 'AI-generated sample image of chilli-oil momos' },
      { id: 'butter', name: 'Butter chicken + garlic naan', price: 349, line: 'Creamy, smoky, scoop-with-naan rich', image: '/cafe-samples/b-butter.png', spice: 2, veg: false, alt: 'AI-generated sample image of butter chicken and naan' },
      { id: 'wings', name: 'Glazed chilli wings', price: 299, line: 'Sticky, crackly, sesame-crusted', image: '/cafe-samples/b-wings.png', spice: 3, veg: false, alt: 'AI-generated sample image of glazed chilli wings' },
      { id: 'paneer', name: 'Chilli paneer', price: 279, line: 'Wok-tossed, peppers, spring onion', image: '/cafe-samples/b-paneer.png', spice: 2, veg: true, alt: 'AI-generated sample image of chilli paneer' },
      { id: 'naan', name: 'Garlic naan', price: 79, line: 'Charred, buttery, garlic-flecked', image: '/cafe-samples/b-naan.png', spice: 1, veg: true, alt: 'AI-generated sample image of garlic naan' },
      { id: 'dip', name: 'Chilli-oil dip', price: 59, line: 'Fiery oil, crunchy flakes, extra heat', image: '/cafe-samples/b-dip.png', spice: 3, veg: true, alt: 'AI-generated sample image of chilli-oil dip' },
    ],
  },
  caramel: {
    id: 'caramel',
    name: 'Caramel',
    theme: 'theme-caramel',
    hero: '/cafe-samples/c-hero.png',
    heroAlt: 'AI-generated sample image of a pancake stack with syrup',
    categories: [
      { id: 'pancakes', label: 'Pancakes', image: '/cafe-samples/c-hero.png' },
      { id: 'desserts', label: 'Desserts', image: '/cafe-samples/c-lava.png' },
      { id: 'coffee', label: 'Coffee', image: '/cafe-samples/c-latte.png' },
    ],
    items: [
      { id: 'lava', script: 'molten centre!', name: 'Molten lava cake', price: 229, line: 'Warm chocolate cake, gooey centre, vanilla scoop', image: '/cafe-samples/c-lava.png', category: 'desserts', alt: 'AI-generated sample image of molten lava cake' },
      { id: 'stack', script: 'golden & buttery', name: 'Syrup stack pancakes', price: 249, line: 'Fluffy, buttery, drenched in caramel syrup', image: '/cafe-samples/c-pancakes.png', category: 'pancakes', alt: 'AI-generated sample image of syrup stack pancakes' },
      { id: 'latte', script: 'cosy morning', name: 'Latte croissant', price: 189, line: 'Silky latte art, flaky buttery layers', image: '/cafe-samples/c-latte.png', category: 'coffee', alt: 'AI-generated sample image of a latte and croissant' },
      { id: 'egg', script: 'runny yolk!', name: 'Egg bacon croissant', price: 289, line: 'Runny egg, bacon, melty cheese', image: '/cafe-samples/c-egg.png', category: 'coffee', alt: 'AI-generated sample image of an egg bacon croissant' },
      { id: 'vanilla', script: 'flaky & warm', name: 'Vanilla croissant', price: 189, line: 'Warm, flaky, shatter-crisp layers', image: '/cafe-samples/c-vanilla.png', category: 'desserts', alt: 'AI-generated sample image of a vanilla croissant' },
      { id: 'scoop', script: 'cool & creamy', name: 'Crispy scoop', price: 159, line: 'Cool, creamy, perfect with the caramel drizzle', image: '/cafe-samples/c-scoop.png', category: 'desserts', alt: 'AI-generated sample image of a creamy scoop' },
    ],
  },
};

function rupee(n) {
  return `₹${n}`;
}

function Switcher({ current }) {
  return (
    <div className="cs-switcher">
      <Link to="/samples">Samples</Link>
      {Object.values(VARIANTS).map((variant) => (
        <Link key={variant.id} to={`/samples/${variant.id}`} className={current === variant.id ? 'active' : ''}>
          {variant.name}
        </Link>
      ))}
    </div>
  );
}

function Badges({ variant }) {
  if (variant === 'fire') {
    return (
      <div className="cs-badges">
        <span className="cs-pill cs-brand">SAMPLE CAFE</span>
        <div>
          <span className="cs-pill cs-sample">SAMPLE CONTENT</span>
          <div className="cs-ai">AI-generated sample images</div>
        </div>
      </div>
    );
  }
  return (
    <div className="cs-badges">
      <div>
        <span className="cs-pill cs-brand">Sample Cafe</span>
        {variant === 'caramel' && <div className="cs-ai">AI-generated sample images</div>}
      </div>
      <div>
        <span className="cs-pill cs-sample">SAMPLE CONTENT</span>
        {variant === 'molten' && <div className="cs-ai">AI-generated sample images</div>}
      </div>
    </div>
  );
}

function FindUs() {
  return (
    <section className="cs-find">
      <h2>Find us</h2>
      <p>000 Sample Street, Sample City 000000</p>
      <p>Daily 8:00 am – 10:00 pm</p>
      <p><a href="https://maps.google.com/?q=000+Sample+Street" target="_blank" rel="noreferrer">Open map</a></p>
      <p><a href="tel:0000000000">000-000-0000</a></p>
      <p>WhatsApp <span>(only if the client has one)</span></p>
      <p className="cs-fine">AI-generated sample images, not photos. Sample content, prices and details are placeholders.</p>
    </section>
  );
}

function StickyBar({ variant, count }) {
  const orderLabel = variant === 'fire' ? `ORDER${count ? ` · ${count}` : ''}` : `Order${count ? ` · ${count}` : ''}`;
  const bookLabel = variant === 'fire' ? 'BOOK A TABLE' : 'Book a table';
  return (
    <div className="cs-bar">
      <button type="button" className="cs-bar-order">{orderLabel}</button>
      <Link className="cs-bar-book" to={`/samples/${variant}/book`}>{bookLabel}</Link>
    </div>
  );
}

function AddButton({ added, onAdd, className = 'cs-add' }) {
  return (
    <button type="button" className={className} onClick={onAdd}>
      {added ? 'Added' : 'Add'}
    </button>
  );
}

function MoltenHome({ data, category, setCategory, added, addItem }) {
  const visible = category ? data.items.filter((item) => item.category === category) : data.items;
  return (
    <>
      <header className="cs-hero">
        <img className="cs-hero-photo" src={data.hero} alt={data.heroAlt} />
        <div className="cs-scrim" />
        <div className="cs-hero-copy">
          <Badges variant="molten" />
          <span className="cs-pill cs-special" style={{ marginTop: 22, alignSelf: 'flex-start' }}>TODAY'S SPECIAL</span>
          <h1 className="cs-title">Wood-fired<br />margherita</h1>
          <p className="cs-micro">Molten. Stretchy. Fire-kissed.</p>
          <div className="cs-hero-actions">
            <span className="cs-btn cs-price-lg">{rupee(399)}</span>
            <button type="button" className="cs-btn cs-order" onClick={() => addItem('margherita')}>Order</button>
          </div>
        </div>
      </header>
      <div className="cs-status"><span className="cs-dot" /> Open now <span>Daily 8:00 am – 10:00 pm</span></div>
      <div className="cs-chips">
        {data.categories.map((chip) => (
          <button key={chip.id} type="button" className={`cs-chip${category === chip.id ? ' selected' : ''}`} onClick={() => setCategory(category === chip.id ? null : chip.id)}>
            <img src={chip.image} alt="" />
            {chip.label}
          </button>
        ))}
      </div>
      <div className="cs-menu-head"><h2>The menu</h2><span>Sample prices in ₹</span></div>
      {visible.map((item) => (
        <article className="cs-card" key={item.id}>
          <div className="cs-card-photo">
            <img src={item.image} alt={item.alt} />
            <span className="cs-card-price cs-price">{rupee(item.price)}</span>
            <AddButton className="cs-btn cs-add cs-card-add" added={added[item.id]} onAdd={() => addItem(item.id)} />
          </div>
          <div className="cs-card-copy">
            <h3>{item.name}</h3>
            <p>{item.line}</p>
          </div>
        </article>
      ))}
      <FindUs />
    </>
  );
}

function FireHome({ data, spice, setSpice, added, addItem }) {
  const visible = data.items.filter((item) => {
    if (spice === 'veg') return item.veg;
    if (spice === 'all') return true;
    return item.spice === spice;
  });
  return (
    <>
      <header className="cs-hero">
        <img className="cs-hero-photo" src={data.hero} alt={data.heroAlt} />
        <div className="cs-scrim" />
        <div className="cs-hero-copy">
          <Badges variant="fire" />
          <span className="cs-hot">HOT RIGHT NOW</span>
          <h1 className="cs-title">CHILLI-OIL<em>MOMOS</em></h1>
          <p className="cs-micro">SIZZLING. STICKY. SERIOUSLY SPICY.</p>
          <div className="cs-hero-actions">
            <span className="cs-price-lg">{rupee(189)}</span>
            <button type="button" className="cs-btn cs-order" onClick={() => addItem('momos')}>ORDER</button>
            <span className="cs-spicy-label">SPICY</span>
          </div>
        </div>
      </header>
      <div className="cs-status"><span className="cs-open">OPEN NOW</span> Daily 8:00 am – 10:00 pm</div>
      <div className="cs-section-label">SPICY LEVEL</div>
      <div className="cs-chips">
        {[{ id: 'all', label: 'ALL' }, { id: 1, label: '🔥' }, { id: 2, label: '🔥🔥' }, { id: 3, label: '🔥🔥🔥' }, { id: 'veg', label: 'VEG' }].map((chip) => (
          <button key={chip.id} type="button" className={`cs-chip${spice === chip.id ? ' selected' : ''}`} onClick={() => setSpice(chip.id)}>
            {chip.label}
          </button>
        ))}
      </div>
      {visible.map((item) => (
        <article className="cs-tile" key={item.id}>
          <img src={item.image} alt={item.alt} />
          <div className="cs-tile-copy">
            <h3>{item.name.toUpperCase()}</h3>
            <span className="cs-tile-price">{rupee(item.price)}</span>
            <p>{item.line}</p>
            <AddButton added={added[item.id]} onAdd={() => addItem(item.id)} />
          </div>
        </article>
      ))}
      <FindUs />
    </>
  );
}

function CaramelHome({ data, category, setCategory, added, addItem }) {
  const visible = category ? data.items.filter((item) => item.category === category) : data.items;
  return (
    <>
      <header className="cs-hero">
        <img className="cs-hero-photo" src={data.hero} alt={data.heroAlt} />
        <div className="cs-hero-copy"><Badges variant="caramel" /></div>
        <svg className="cs-scallop" viewBox="0 0 390 24" preserveAspectRatio="none" aria-hidden="true">
          <path fill="#fff3dc" d="M0 24 Q15 0 30 24 Q45 0 60 24 Q75 0 90 24 Q105 0 120 24 Q135 0 150 24 Q165 0 180 24 Q195 0 210 24 Q225 0 240 24 Q255 0 270 24 Q285 0 300 24 Q315 0 330 24 Q345 0 360 24 Q375 0 390 24 V24 H0 Z" />
        </svg>
      </header>
      <section className="cs-special">
        <span className="cs-special-pill">TODAY'S SPECIAL</span>
        <h2>Syrup stack</h2>
        <div className="cs-script">fresh off the griddle</div>
        <p>Golden, buttery, drowned in caramel.</p>
        <div className="cs-hero-actions">
          <span className="cs-price-lg">{rupee(249)}</span>
          <button type="button" className="cs-btn cs-order" onClick={() => addItem('stack')}>Order</button>
        </div>
      </section>
      <div className="cs-status"><span className="cs-dot" /> Open now <span>Daily 8:00 am – 10:00 pm</span></div>
      <div className="cs-chips">
        {data.categories.map((chip) => (
          <button key={chip.id} type="button" className={`cs-chip${category === chip.id ? ' selected' : ''}`} onClick={() => setCategory(category === chip.id ? null : chip.id)}>
            <img src={chip.image} alt="" />
            {chip.label}
          </button>
        ))}
      </div>
      <div className="cs-menu-head"><h2>The menu</h2><span className="cs-script">sample prices in ₹</span></div>
      <div className="cs-mosaic">
        {visible.map((item, index) => (
          <article className={`cs-row${index % 2 ? ' reverse' : ''}`} key={item.id}>
            <div className="cs-photo"><img src={item.image} alt={item.alt} /></div>
            <div className="cs-row-copy">
              <div className="cs-script">{item.script}</div>
              <h3>{item.name}</h3>
              <p>{item.line}</p>
              <div className="cs-row-meta">
                <span className="cs-price">{rupee(item.price)}</span>
                <AddButton added={added[item.id]} onAdd={() => addItem(item.id)} />
              </div>
            </div>
          </article>
        ))}
      </div>
      <FindUs />
    </>
  );
}

function Booking({ variant }) {
  const [party, setParty] = useState(2);
  const [time, setTime] = useState('7:30 pm');
  const [sent, setSent] = useState(false);
  const [name, setName] = useState('Asha Sample');
  const [contact, setContact] = useState('000-000-0000');
  const [notes, setNotes] = useState('Window table if possible');

  return (
    <>
      <header className="cs-hero" style={{ minHeight: 120 }}>
        <img className="cs-hero-photo" src={VARIANTS[variant].hero} alt="" />
        <div className="cs-hero-copy" style={{ minHeight: 120 }}>
          <Badges variant={variant} />
        </div>
      </header>
      <form className="cs-form" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
        <div className="cs-title-row">
          <h1>{variant === 'fire' ? 'BOOK A TABLE' : 'Book a table'}</h1>
          {variant === 'caramel' && <span className="cs-script">just a request</span>}
        </div>
        <p className="cs-sub">No table is guaranteed until confirmed.</p>
        <label htmlFor="cs-name">{variant === 'fire' ? 'NAME' : 'Name'}</label>
        <input id="cs-name" value={name} onChange={(event) => setName(event.target.value)} required />
        <label htmlFor="cs-contact">{variant === 'fire' ? 'PHONE OR EMAIL' : 'Phone or email'} <span style={{ fontWeight: 600 }}>(one is enough)</span></label>
        <input id="cs-contact" value={contact} onChange={(event) => setContact(event.target.value)} required />
        <div className="cs-split">
          <div>
            <label htmlFor="cs-date">{variant === 'fire' ? 'DATE' : 'Date'}</label>
            <input id="cs-date" defaultValue="Sat, 17 Oct 2026" />
          </div>
          <div>
            <label>{variant === 'fire' ? 'PARTY SIZE' : 'Party size'}</label>
            <div className="cs-stepper">
              <button type="button" onClick={() => setParty((value) => Math.max(1, value - 1))} aria-label="Decrease party size">−</button>
              <span>{party}</span>
              <button type="button" className="plus" onClick={() => setParty((value) => value + 1)} aria-label="Increase party size">+</button>
            </div>
            {party > 12 ? (
              <a className="cs-help" href="tel:0000000000">{variant === 'caramel' ? 'more than 12? call us' : 'More than 12? Call us'}</a>
            ) : (
              <span className="cs-help">{variant === 'caramel' ? 'more than 12? call us' : 'More than 12? Call us'}</span>
            )}
          </div>
        </div>
        <label>{variant === 'fire' ? 'TIME' : 'Time'}</label>
        <div className="cs-times">
          {TIMES.map((slot) => (
            <button type="button" key={slot} className={time === slot ? 'selected' : ''} onClick={() => setTime(slot)}>{slot}</button>
          ))}
        </div>
        <label htmlFor="cs-notes">{variant === 'fire' ? 'NOTES' : 'Notes'} <span style={{ fontWeight: 600 }}>(optional)</span></label>
        <input id="cs-notes" value={notes} onChange={(event) => setNotes(event.target.value)} />
        <label>{variant === 'fire' ? 'VERIFICATION' : 'Verification'}</label>
        <div className="cs-verified">✓ {variant === 'fire' ? 'VERIFIED' : 'Verified'}</div>
        <p className="cs-note">This is a booking request. The cafe will confirm by phone or email.</p>
        {sent ? (
          <div className="cs-sent">Request noted for {name}, party of {party}, {time}. Nothing was sent. This sample does not book a table.</div>
        ) : (
          <button className="cs-btn cs-send" type="submit">{variant === 'fire' ? 'SEND REQUEST' : 'Send request'}</button>
        )}
      </form>
    </>
  );
}

export function CafeSampleIndex() {
  return (
    <div className="cs-page">
      <Switcher />
      <div className="cs-index">
        <h1>Round 2 cafe samples</h1>
        <p>Three craving-led mobile menus. Sample content only. Prices, hours and contact details are placeholders. Nothing is ordered or booked.</p>
        <div className="cs-grid">
          <Link className="cs-index-card" to="/samples/molten"><strong>A · Molten</strong>Cheese-pull pizza, yellow prices, tomato-red actions.</Link>
          <Link className="cs-index-card fire" to="/samples/fire"><strong>B · Fire</strong>Dark chilli menu with a spicy-level filter.</Link>
          <Link className="cs-index-card caramel" to="/samples/caramel"><strong>C · Caramel</strong>Brunch pancakes, script notes, raspberry actions.</Link>
        </div>
      </div>
    </div>
  );
}

export function CafeSample() {
  const { variant } = useParams();
  const data = VARIANTS[variant];
  const booking = useLocation().pathname.endsWith('/book');
  const [category, setCategory] = useState(null);
  const [spice, setSpice] = useState('all');
  const [cart, setCart] = useState({});
  const [added, setAdded] = useState({});

  const count = useMemo(() => Object.values(cart).reduce((sum, value) => sum + value, 0), [cart]);

  if (!data) return <Navigate to="/samples" replace />;

  const addItem = (id) => {
    setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 }));
    setAdded((current) => ({ ...current, [id]: true }));
    window.setTimeout(() => {
      setAdded((current) => ({ ...current, [id]: false }));
    }, 600);
  };

  return (
    <div className="cs-page">
      <Switcher current={variant} />
      <div className={`cs-phone ${data.theme}`}>
        {booking ? <Booking variant={variant} /> : (
          <>
            {variant === 'molten' && <MoltenHome data={data} category={category} setCategory={setCategory} added={added} addItem={addItem} />}
            {variant === 'fire' && <FireHome data={data} spice={spice} setSpice={setSpice} added={added} addItem={addItem} />}
            {variant === 'caramel' && <CaramelHome data={data} category={category} setCategory={setCategory} added={added} addItem={addItem} />}
          </>
        )}
        {!booking && <StickyBar variant={variant} count={count} />}
      </div>
    </div>
  );
}
