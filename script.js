// ==========================================================
// SKYWALKER ENERGIE
// Navigation, Scroll-Reveal, Hero-Lichtpunkte und Kontaktformular
// ==========================================================

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const header = document.querySelector("[data-header]");
    const navToggle = document.querySelector("[data-nav-toggle]");
    const navPanel = document.querySelector("[data-nav-panel]");
    const navLinks = [...document.querySelectorAll("[data-nav-link]")];
    const progressBar = document.querySelector("[data-scroll-progress]");
    const backToTop = document.querySelector("[data-back-to-top]");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ----------------------------------------------------------
    // Header, Fortschrittsbalken und "Nach oben"-Button
    // ----------------------------------------------------------

    const updateScrollUi = () => {
        const scrollTop = window.scrollY;
        const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = scrollableHeight > 0 ? (scrollTop / scrollableHeight) * 100 : 0;

        header?.classList.toggle("is-scrolled", scrollTop > 20);
        backToTop?.classList.toggle("is-visible", scrollTop > 700);

        if (progressBar) {
            progressBar.style.width = `${Math.min(100, Math.max(0, progress))}%`;
        }
    };

    updateScrollUi();
    window.addEventListener("scroll", updateScrollUi, { passive: true });

    // ----------------------------------------------------------
    // Mobile Navigation
    // ----------------------------------------------------------

    const closeNavigation = () => {
        if (!navToggle || !navPanel) return;

        navToggle.setAttribute("aria-expanded", "false");
        navPanel.classList.remove("is-open");
        body.classList.remove("nav-open");
    };

    const openNavigation = () => {
        if (!navToggle || !navPanel) return;

        navToggle.setAttribute("aria-expanded", "true");
        navPanel.classList.add("is-open");
        body.classList.add("nav-open");
    };

    navToggle?.addEventListener("click", () => {
        const isOpen = navToggle.getAttribute("aria-expanded") === "true";
        isOpen ? closeNavigation() : openNavigation();
    });

    navPanel?.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", closeNavigation);
    });

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            closeNavigation();
        }
    });

    window.addEventListener("resize", () => {
        if (window.innerWidth > 960) {
            closeNavigation();
        }
    });


    // ----------------------------------------------------------
    // Zufällig aufleuchtende Punkte über Navigation und Hero
    // ----------------------------------------------------------

    const particleField = document.querySelector("[data-hero-particles]");
    const heroSection = document.querySelector(".hero");

    if (particleField && !prefersReducedMotion) {
        const particleCount = window.innerWidth < 700 ? 18 : 32;

        const randomizeParticle = (particle, initial = false) => {
            // Ein Teil der Punkte liegt bewusst im oberen Navigationsbereich.
            const inHeaderZone = Math.random() < 0.24;
            const left = 1 + Math.random() * 98;
            const top = inHeaderZone
                ? 1.5 + Math.random() * 8.5
                : 10 + Math.random() * 87;
            const size = 1.2 + Math.random() * 3.4;
            const duration = 4.8 + Math.random() * 7.4;
            const opacity = 0.18 + Math.random() * 0.42;
            const hue = 184 + Math.round(Math.random() * 34);
            const driftX = -14 + Math.random() * 28;
            const driftY = -12 + Math.random() * 24;

            particle.style.left = `${left.toFixed(2)}%`;
            particle.style.top = `${top.toFixed(2)}%`;
            particle.style.setProperty("--particle-size", `${size.toFixed(2)}px`);
            particle.style.setProperty("--particle-duration", `${duration.toFixed(2)}s`);
            particle.style.setProperty("--particle-opacity", opacity.toFixed(2));
            particle.style.setProperty("--particle-hue", String(hue));
            particle.style.setProperty("--particle-drift-x", `${driftX.toFixed(1)}px`);
            particle.style.setProperty("--particle-drift-y", `${driftY.toFixed(1)}px`);

            if (initial) {
                particle.style.setProperty("--particle-delay", `${(-Math.random() * duration).toFixed(2)}s`);
            }
        };

        for (let index = 0; index < particleCount; index += 1) {
            const particle = document.createElement("span");
            particle.className = "hero-particle";

            if (Math.random() < 0.2) {
                particle.classList.add("is-radiant");
            }

            randomizeParticle(particle, true);

            particle.addEventListener("animationiteration", () => {
                if (Math.random() > 0.2) {
                    randomizeParticle(particle);
                }
            });

            particleField.appendChild(particle);
        }

        const updateParticleVisibility = () => {
            if (!heroSection) return;
            const hideAfter = Math.max(window.innerHeight, heroSection.offsetHeight) - 80;
            particleField.classList.toggle("is-hidden", window.scrollY > hideAfter);
        };

        updateParticleVisibility();
        window.addEventListener("scroll", updateParticleVisibility, { passive: true });
    }

    // ----------------------------------------------------------
    // Scroll-Reveal
    // ----------------------------------------------------------

    const revealElements = [...document.querySelectorAll("[data-reveal]")];

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
        revealElements.forEach((element) => element.classList.add("is-visible"));
    } else {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                });
            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -60px"
            }
        );

        revealElements.forEach((element, index) => {
            element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
            revealObserver.observe(element);
        });
    }

    // ----------------------------------------------------------
    // Aktiven Navigationspunkt markieren
    // ----------------------------------------------------------

    const sections = [...document.querySelectorAll("[data-section]")];

    if ("IntersectionObserver" in window) {
        const sectionObserver = new IntersectionObserver(
            (entries) => {
                const visibleSections = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                if (!visibleSections.length) return;

                const activeId = visibleSections[0].target.id;

                navLinks.forEach((link) => {
                    const targetId = link.getAttribute("href")?.replace("#", "");
                    link.classList.toggle("is-active", targetId === activeId);
                });
            },
            {
                rootMargin: "-32% 0px -56% 0px",
                threshold: [0.01, 0.15, 0.35]
            }
        );

        sections.forEach((section) => sectionObserver.observe(section));
    }
const btn=document.getElementById("innovation-toggle");
const details=document.getElementById("innovation-details");

btn.addEventListener("click",()=>{

    details.classList.toggle("open");

    btn.textContent=
        details.classList.contains("open")
        ? "Weniger anzeigen"
        : "Mehr über Skywalker erfahren";

});
window.addEventListener("hashchange",()=>{

    if(location.hash==="#innovation"){

        details.classList.add("open");

    }

});
    // ----------------------------------------------------------
    // Pitchdeck: horizontal und seitenweise navigieren
    // ----------------------------------------------------------

    document.querySelectorAll("[data-pdf-deck]").forEach((deck) => {
        const track = deck.querySelector("[data-pdf-track]");
        const viewport = deck.querySelector(".pitchdeck-viewport");
        const pages = [...deck.querySelectorAll("[data-pdf-page]")];
        const previousButton = deck.querySelector("[data-pdf-prev]");
        const nextButton = deck.querySelector("[data-pdf-next]");
        const counter = deck.querySelector("[data-pdf-counter]");
        const dotsContainer = deck.querySelector("[data-pdf-dots]");

        if (!track || !viewport || !pages.length) return;

        let currentIndex = 0;
        let wheelLocked = false;
        let scrollFrame = null;
        let programmaticScroll = false;
        let programmaticScrollTimer = null;

        const dots = pages.map((_, index) => {
            const dot = document.createElement("button");
            dot.type = "button";
            dot.className = "deck-dot";
            dot.setAttribute("aria-label", `Pitchdeck-Seite ${index + 1} anzeigen`);
            dot.addEventListener("click", () => goToPage(index));
            dotsContainer?.appendChild(dot);
            return dot;
        });

        const updateState = (nextIndex) => {
            currentIndex = Math.max(0, Math.min(pages.length - 1, nextIndex));

            pages.forEach((page, index) => {
                const isCurrent = index === currentIndex;
                page.classList.toggle("is-current", isCurrent);
                page.setAttribute("aria-hidden", String(!isCurrent));
            });

            dots.forEach((dot, index) => {
                const isCurrent = index === currentIndex;
                dot.classList.toggle("is-active", isCurrent);
                dot.setAttribute("aria-current", isCurrent ? "page" : "false");
            });

            if (counter) {
                counter.textContent = `${String(currentIndex + 1).padStart(2, "0")} / ${String(pages.length).padStart(2, "0")}`;
            }

            if (previousButton) previousButton.disabled = currentIndex === 0;
            if (nextButton) nextButton.disabled = currentIndex === pages.length - 1;
        };

        const goToPage = (nextIndex, behavior = prefersReducedMotion ? "auto" : "smooth") => {
            const previousIndex = currentIndex;
            const clampedIndex = Math.max(0, Math.min(pages.length - 1, nextIndex));
            const effectiveBehavior = Math.abs(clampedIndex - previousIndex) > 1
                ? "auto"
                : behavior;

            updateState(clampedIndex);
            programmaticScroll = true;

            if (programmaticScrollTimer !== null) {
                window.clearTimeout(programmaticScrollTimer);
            }

            const targetLeft = clampedIndex * track.clientWidth;

            if (effectiveBehavior === "auto") {
                // JS-Option "auto" übernimmt sonst das CSS scroll-behavior: smooth.
                // Für Mausrad, Home/End und große Sprünge wird daher bewusst sofort gesetzt.
                track.style.scrollBehavior = "auto";
                track.scrollLeft = targetLeft;
                window.requestAnimationFrame(() => {
                    track.style.removeProperty("scroll-behavior");
                });
            } else {
                track.scrollTo({
                    left: targetLeft,
                    behavior: effectiveBehavior
                });
            }

            programmaticScrollTimer = window.setTimeout(() => {
                programmaticScroll = false;
                programmaticScrollTimer = null;
            }, effectiveBehavior === "auto" ? 60 : 900);
        };

        previousButton?.addEventListener("click", () => goToPage(currentIndex - 1));
        nextButton?.addEventListener("click", () => goToPage(currentIndex + 1));

        deck.addEventListener("keydown", (event) => {
            if (event.key === "ArrowLeft" || event.key === "PageUp") {
                event.preventDefault();
                goToPage(currentIndex - 1);
            }

            if (event.key === "ArrowRight" || event.key === "PageDown") {
                event.preventDefault();
                goToPage(currentIndex + 1);
            }

            if (event.key === "Home") {
                event.preventDefault();
                goToPage(0);
            }

            if (event.key === "End") {
                event.preventDefault();
                goToPage(pages.length - 1);
            }
        });

        track.addEventListener("scroll", () => {
            if (programmaticScroll || scrollFrame !== null) return;

            scrollFrame = window.requestAnimationFrame(() => {
                scrollFrame = null;
                const width = track.clientWidth || 1;
                const index = Math.round(track.scrollLeft / width);
                if (index !== currentIndex) updateState(index);
            });
        }, { passive: true });

        viewport.addEventListener("wheel", (event) => {
            const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX)
                ? event.deltaY
                : event.deltaX;

            if (Math.abs(delta) < 6) return;

            const direction = delta > 0 ? 1 : -1;
            const canAdvance = direction > 0
                ? currentIndex < pages.length - 1
                : currentIndex > 0;

            // Am Anfang beziehungsweise Ende darf die Website normal weiterscrollen.
            if (!canAdvance) return;

            event.preventDefault();
            event.stopPropagation();

            if (wheelLocked) return;
            wheelLocked = true;
            goToPage(currentIndex + direction, "auto");

            window.setTimeout(() => {
                wheelLocked = false;
            }, prefersReducedMotion ? 140 : 360);
        }, { passive: false, capture: true });

        window.addEventListener("resize", () => {
            goToPage(currentIndex, "auto");
        });

        updateState(0);
    });

    // ----------------------------------------------------------
    // Kontaktformular: Daten in eine neue E-Mail übernehmen
    // ----------------------------------------------------------

    const contactForm = document.querySelector("[data-contact-form]");

    contactForm?.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!contactForm.checkValidity()) {
            contactForm.reportValidity();
            return;
        }

        const formData = new FormData(contactForm);
        const recipient = contactForm.dataset.recipient || "kontakt@skywalker-energie.de";
        const status = contactForm.querySelector("[data-form-status]");

        const name = String(formData.get("name") || "").trim();
        const email = String(formData.get("email") || "").trim();
        const phone = String(formData.get("phone") || "").trim();
        const postalCode = String(formData.get("postalCode") || "").trim();
        const service = String(formData.get("service") || "").trim();
        const message = String(formData.get("message") || "").trim();

        const subject = `Website-Anfrage: ${service}`;
        const bodyText = [
            "Guten Tag,",
            "",
            "ich interessiere mich für folgende Leistung:",
            service,
            "",
            `Name: ${name}`,
            `E-Mail: ${email}`,
            `Telefon: ${phone || "nicht angegeben"}`,
            `Postleitzahl: ${postalCode || "nicht angegeben"}`,
            "",
            "Nachricht:",
            message,
            "",
            "Viele Grüße",
            name
        ].join("\n");

        if (status) {
            status.textContent = "Ihr E-Mail-Programm wird geöffnet …";
        }

        window.location.href =
            `mailto:${encodeURIComponent(recipient)}` +
            `?subject=${encodeURIComponent(subject)}` +
            `&body=${encodeURIComponent(bodyText)}`;
    });

    // ----------------------------------------------------------
    // Copyright-Jahr
    // ----------------------------------------------------------

    document.querySelectorAll("[data-current-year]").forEach((element) => {
        element.textContent = String(new Date().getFullYear());
    });
});
