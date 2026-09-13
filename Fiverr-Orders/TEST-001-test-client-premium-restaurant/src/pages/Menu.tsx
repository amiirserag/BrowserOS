import { useMemo, useState } from 'react';
import Reveal from '../components/Reveal';
import { menuCategories, type MenuCategoryId } from '../data/sampleContent';

export default function Menu() {
  const [active, setActive] = useState<MenuCategoryId>('tasting');
  const category = useMemo(
    () => menuCategories.find((entry) => entry.id === active) ?? menuCategories[0],
    [active],
  );

  return (
    <>
      <header className="page-intro">
        <p className="eyebrow">The card</p>
        <h1>Menu</h1>
        <div className="gold-rule" />
        <p className="lede">
          Interactive categories and scroll-revealed plates. Every dish and price here is sample
          structure, not the restaurant’s live offering.
        </p>
      </header>

      <section className="section">
        <div className="menu-tabs" role="tablist" aria-label="Menu categories">
          {menuCategories.map((entry) => (
            <button
              key={entry.id}
              type="button"
              role="tab"
              id={`tab-${entry.id}`}
              aria-selected={entry.id === active}
              aria-controls={`panel-${entry.id}`}
              onClick={() => setActive(entry.id)}
            >
              {entry.label}
            </button>
          ))}
        </div>

        <div
          key={category.id}
          className="page-enter"
          role="tabpanel"
          id={`panel-${category.id}`}
          aria-labelledby={`tab-${category.id}`}
        >
          <p className="lede">{category.intro}</p>
          <div className="menu-list">
            {category.items.map((item) => (
              <Reveal as="article" className="menu-card" key={item.name}>
                <header>
                  <h3>{item.name}</h3>
                  <p className="price">{item.priceLabel}</p>
                </header>
                <p>{item.description}</p>
                {item.note ? <p className="menu-note">{item.note}</p> : null}
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
