"use client";

import { useEffect } from "react";

const marqueeItems = [
  "Весілля",
  "День народження",
  "Фотозони",
  "Оформлення столів",
  "Арки та конструкції",
  "Корпоративи",
  "Заручини",
];

const services = [
  {
    num: "01",
    name: "Весільне оформлення",
    icon: "🌸",
    kind: "Wedding",
    desc: "Повне флористичне оформлення весілля: арки, фотозони, декор залу, букет нареченої та бутоньєрка.",
    tone: "s1",
  },
  {
    num: "02",
    name: "День народження",
    icon: "🎂",
    kind: "Birthday",
    desc: "Яскраві та ніжні флористичні декорації для днів народження будь-якого стилю та масштабу.",
    tone: "s2",
  },
  {
    num: "03",
    name: "Фотозони",
    icon: "📸",
    kind: "Photo Zone",
    desc: "Неповторні квіткові інсталяції для фотографування: фони з живих квітів, арки та квіткові стіни.",
    tone: "s3",
  },
  {
    num: "04",
    name: "Оформлення столів",
    icon: "🍽️",
    kind: "Table Design",
    desc: "Стильні центральні композиції та флористичні акценти для банкетних столів.",
    tone: "s4",
  },
  {
    num: "05",
    name: "Декор приміщень",
    icon: "🏛️",
    kind: "Hall Decor",
    desc: "Комплексне оформлення залів, вхідних груп та вуличних зон з використанням сезонних квітів.",
    tone: "s5",
  },
  {
    num: "06",
    name: "Корпоративні події",
    icon: "💼",
    kind: "Corporate",
    desc: "Представницьке флористичне оформлення конференцій, прийомів та корпоративних вечірок.",
    tone: "s6",
  },
];

const process = [
  {
    num: "01",
    title: "Консультація",
    text: "Зустрічаємось або спілкуємось онлайн, дізнаємось про ваші побажання, стиль і бюджет.",
  },
  {
    num: "02",
    title: "Концепція",
    text: "Розробляємо індивідуальну концепцію оформлення з мудбордами та ескізами.",
  },
  {
    num: "03",
    title: "Підготовка",
    text: "Підбираємо свіжі квіти, матеріали та готуємо всі елементи декору.",
  },
  {
    num: "04",
    title: "Оформлення",
    text: "Приїжджаємо на локацію та створюємо атмосферу вашого свята під ключ.",
  },
];

const gallery = [
  { cls: "g1", label: "Весільна арка · 2026" },
  { cls: "g2", label: "Фотозона" },
  { cls: "g3", label: "Декор столу" },
  { cls: "g4", label: "День народження" },
  { cls: "g5", label: "Квіткова стіна" },
];

export default function Home() {
  useEffect(() => {
    const cursor = document.getElementById("cursor");
    const ring = document.getElementById("cursorRing");
    const navbar = document.getElementById("navbar");

    const onMove = (e: MouseEvent) => {
      if (!cursor || !ring) return;
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
      ring.style.left = `${e.clientX}px`;
      ring.style.top = `${e.clientY}px`;
    };

    const onScroll = () => {
      if (!navbar) return;
      navbar.classList.toggle("scrolled", window.scrollY > 60);
    };

    document.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", onScroll);

    const interactive = document.querySelectorAll("a, button, .service-card, .gal-item, .step-card");
    const onEnter = () => {
      cursor?.classList.add("expanded");
      ring?.classList.add("expanded");
    };
    const onLeave = () => {
      cursor?.classList.remove("expanded");
      ring?.classList.remove("expanded");
    };

    interactive.forEach((el) => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" },
    );

    const revealNodes = document.querySelectorAll(".reveal");
    revealNodes.forEach((el) => observer.observe(el));

    const petalTimers: number[] = [];
    const createPetal = () => {
      const petal = document.createElement("div");
      petal.className = "petal float-elem";
      petal.style.left = `${Math.random() * 100}vw`;
      petal.style.animationDuration = `${8 + Math.random() * 8}s`;
      petal.style.animationDelay = `${Math.random() * 4}s`;
      petal.style.width = `${4 + Math.random() * 6}px`;
      petal.style.height = `${10 + Math.random() * 12}px`;
      petal.style.opacity = `${0.2 + Math.random() * 0.3}`;
      petal.style.background = Math.random() > 0.5 ? "var(--mint-light)" : "var(--olive-light)";
      document.body.appendChild(petal);
      const removeId = window.setTimeout(() => petal.remove(), 20000);
      petalTimers.push(removeId);
    };

    const petalInterval = window.setInterval(createPetal, 2500);

    return () => {
      document.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      });
      observer.disconnect();
      window.clearInterval(petalInterval);
      petalTimers.forEach((id) => window.clearTimeout(id));
      document.querySelectorAll(".petal.float-elem").forEach((el) => el.remove());
    };
  }, []);

  return (
    <>
      <div className="cursor" id="cursor" />
      <div className="cursor-ring" id="cursorRing" />

      <nav id="navbar" className="mono-nav">
        <a href="#home" className="nav-logo" aria-label="MONO flowers">
          <span className="logo-word">MONO</span>
          <span className="logo-sub">flowers</span>
        </a>
        <ul className="nav-links">
          <li>
            <a href="#about">Про нас</a>
          </li>
          <li>
            <a href="#services">Послуги</a>
          </li>
          <li>
            <a href="#gallery">Роботи</a>
          </li>
          <li>
            <a href="#process">Процес</a>
          </li>
        </ul>
        <button className="nav-btn" onClick={() => document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" })}>
          Замовити
        </button>
      </nav>

      <main id="home">
        <section className="hero">
          <div className="hero-left">
            <div className="hero-tag">MONO flowers · Квіткова студія</div>
            <h1 className="hero-title">
              Ваше свято —<br />
              <em>наша пристрасть</em>
              <br />
              <strong>до краси</strong>
            </h1>
            <p className="hero-desc">
              Створюємо неповторні флористичні простори для весіль, днів народження та корпоративних подій.
              Кожна деталь, від фотозони до оформлення столів, продумана з любовʼю.
            </p>
            <div className="hero-actions">
              <a href="#services" className="btn-primary">
                <span>Наші послуги</span>
              </a>
              <a href="#gallery" className="btn-outline">
                Переглянути роботи
              </a>
            </div>
            <div className="scroll-hint">
              <div className="scroll-line" />
              Гортати
            </div>
          </div>

          <div className="hero-right">
            <div className="hero-img-grid">
              <div className="hero-img">
                <div className="img-placeholder img-p1">Весільна фотозона</div>
              </div>
              <div className="hero-img">
                <div className="img-placeholder img-p2">Оформлення столів</div>
              </div>
              <div className="hero-img">
                <div className="img-placeholder img-p3">Декор залу</div>
              </div>
            </div>
          </div>
        </section>

        <div className="marquee-section">
          <div className="marquee-track">
            {marqueeItems.concat(marqueeItems).map((item, idx) => (
              <div key={`${item}-${idx}`} className="marquee-item">
                {item}
              </div>
            ))}
          </div>
        </div>

        <section className="about" id="about">
          <div className="about-visual reveal">
            <div className="about-main-img" />
            <div className="about-float-card">
              <div className="num">7+</div>
              <p>Років досвіду у флористиці</p>
            </div>
          </div>
          <div className="about-content">
            <div className="section-tag reveal">Наша історія</div>
            <h2 className="about-title reveal">
              Ми перетворюємо
              <br />
              мрії на <em>живі квіткові</em>
              <br />
              шедеври
            </h2>
            <p className="about-text reveal reveal-delay-1">
              MONO flowers — команда флористів-художників, які вірять, що кожне свято заслуговує на особливий
              квітковий образ.
            </p>
            <p className="about-text reveal reveal-delay-2">
              Від ніжних весільних арок до яскравих інсталяцій на день народження, ми беремо на себе кожну деталь,
              щоб ваш захід залишився в памʼяті назавжди.
            </p>
            <div className="about-stats reveal reveal-delay-3">
              <div className="stat-item">
                <div className="n">340+</div>
                <div className="l">Подій оформлено</div>
              </div>
              <div className="stat-item">
                <div className="n">98%</div>
                <div className="l">Задоволених клієнтів</div>
              </div>
              <div className="stat-item">
                <div className="n">12</div>
                <div className="l">Флористів у команді</div>
              </div>
            </div>
          </div>
        </section>

        <section className="services" id="services">
          <div className="section-header">
            <div className="section-tag reveal">Що ми пропонуємо</div>
            <h2 className="section-title reveal">
              Наші <em>послуги</em>
            </h2>
          </div>
          <div className="services-grid">
            {services.map((service, idx) => (
              <article key={service.name} className={`service-card reveal reveal-delay-${idx % 3}`}>
                <div className="service-img">
                  <div className={`simg ${service.tone}`}>
                    <div className="service-img-icon">
                      <div className="icon-svg">{service.icon}</div>
                      <span>{service.kind}</span>
                    </div>
                  </div>
                </div>
                <div className="service-body">
                  <div className="service-num">{service.num}</div>
                  <div className="service-name">{service.name}</div>
                  <p className="service-desc">{service.desc}</p>
                  <a href="#cta" className="service-arrow">
                    Дізнатись більше →
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="gallery" id="gallery">
          <div className="section-header">
            <div className="section-tag reveal">Наші роботи</div>
            <h2 className="section-title reveal">
              Галерея <em>проєктів</em>
            </h2>
          </div>
          <div className="gallery-grid">
            {gallery.map((item, idx) => (
              <article key={item.label} className={`gal-item reveal reveal-delay-${idx % 3}`}>
                <div className={`gal-inner ${item.cls}`}>
                  <div className="gal-overlay" />
                  <div className="gal-label">{item.label}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="process" id="process">
          <div className="section-header">
            <div className="section-tag reveal">Як ми працюємо</div>
            <h2 className="section-title reveal">
              Від ідеї до <em>втілення</em>
            </h2>
          </div>
          <div className="process-steps">
            {process.map((step, idx) => (
              <article key={step.num} className={`step-card reveal reveal-delay-${idx}`}>
                <div className="step-num">{step.num}</div>
                <div className="step-title">{step.title}</div>
                <p className="step-text">{step.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="cta" id="cta">
          <div className="cta-bg" />
          <div className="cta-content">
            <div className="cta-tag reveal">Ваше свято чекає</div>
            <h2 className="cta-title reveal">
              Готові створити
              <br />
              <em>щось неповторне</em>
              <br />
              разом?
            </h2>
            <p className="cta-sub reveal">
              Звʼяжіться з нами, щоб отримати безкоштовну консультацію та індивідуальну пропозицію для вашого заходу.
            </p>
            <div className="cta-actions reveal">
              <a href="tel:+380991234567" className="btn-large btn-large-filled">
                Зателефонувати
              </a>
              <a href="mailto:hello@monoflowers.ua" className="btn-large btn-large-ghost">
                Написати нам
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="logo">
              MONO <span>flowers</span>
            </span>
            <p>Квіткова студія для особливих моментів вашого життя. Створюємо красу, що залишається в серці.</p>
          </div>
          <div className="footer-col">
            <h4>Послуги</h4>
            <a href="#services">Весільне оформлення</a>
            <a href="#services">День народження</a>
            <a href="#services">Фотозони</a>
            <a href="#services">Оформлення столів</a>
          </div>
          <div className="footer-col">
            <h4>Компанія</h4>
            <a href="#about">Про нас</a>
            <a href="#gallery">Роботи</a>
            <a href="#process">Як ми працюємо</a>
          </div>
          <div className="footer-col">
            <h4>Контакти</h4>
            <p>вул. Хрещатик 15, Київ, Україна</p>
            <a href="tel:+380991234567">+38 099 123 45 67</a>
            <a href="mailto:hello@monoflowers.ua">hello@monoflowers.ua</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 MONO flowers. Усі права захищені.</p>
          <div className="social-links">
            <a href="#" aria-label="Instagram">
              Ig
            </a>
            <a href="#" aria-label="Facebook">
              Fb
            </a>
            <a href="#" aria-label="TikTok">
              Tk
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
