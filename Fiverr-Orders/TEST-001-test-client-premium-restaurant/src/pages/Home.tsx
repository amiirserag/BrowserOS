import { Link } from 'react-router-dom';
import Reveal from '../components/Reveal';
import { brand, experiences } from '../data/sampleContent';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="hero-stage" aria-hidden="true" />
        <div className="hero-vignette" aria-hidden="true" />
        <div className="hero-content">
          <p className="eyebrow">Fine dining preview</p>
          <h1>{brand.tagline}</h1>
          <div className="gold-rule" />
          <p className="lede">
            A cinematic three-page restaurant site for review. Lighting, type, and motion are finished;
            the restaurant’s real name, photography, and copy are not on file.
          </p>
        </div>
        <div className="scroll-cue" aria-hidden="true">
          Scroll
          <i />
        </div>
      </section>

      <Reveal as="section" className="section split">
        <div>
          <p className="section-kicker">The house</p>
          <h2>A room held in low light.</h2>
        </div>
        <div>
          <p>
            This home page is built for a tasting-kitchen atmosphere: slow reveals, film grain, and a
            restrained gold line. Replace this paragraph with the restaurant’s origin, chef, and what
            the evening is actually for.
          </p>
          <p>
            No client photographs were supplied. The plate graphic beside this copy is decorative, not
            a photograph of the dining room.
          </p>
        </div>
      </Reveal>

      <Reveal className="section">
        <div className="plate" role="img" aria-label="Decorative plate graphic. No restaurant photography supplied." />
      </Reveal>

      <section className="section">
        <Reveal>
          <p className="section-kicker">The evening</p>
          <h2>Kitchen, room, cellar.</h2>
        </Reveal>
        <div className="experience-grid">
          {experiences.map((item) => (
            <Reveal as="article" className="experience-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="cta-band">
        <Reveal>
          <p className="section-kicker">Reservations</p>
          <h2>Write for a table.</h2>
          <p className="lede">The contact form validates locally. A destination inbox has not been provided.</p>
          <p>
            <Link className="btn" to="/contact">
              Open the form
            </Link>
          </p>
        </Reveal>
      </section>
    </>
  );
}
