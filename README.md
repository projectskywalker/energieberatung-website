# Energieberatung für Wohngebäude – One-Page-Website

Die Website ist ohne Framework aufgebaut und kann direkt in Visual Studio Code bearbeitet werden. Die klassische Energieberatung und die Innovationsleistung von Skywalker Energie sind in der Gestaltung bewusst voneinander getrennt.

## Projektstruktur

- `index.html` – vollständige One-Page-Website
- `style.css` – Layout, Responsive Design, Navigation, Lichtpunkte und Pitchdeck-Darstellung
- `script.js` – Navigation, Scroll-Effekte, zufällige Lichtpunkte, seitenweises Pitchdeck und Kontaktformular
- `pitchdeck.pdf` – bereitgestelltes Original-Pitchdeck „Reduce Heat Demand“ zum Öffnen im neuen Tab
- `images/pitchdeck/page-01.webp` bis `page-12.webp` – für die horizontale, seitenweise Website-Darstellung gerenderte Pitchdeck-Seiten
- `images/energieberatung-label.svg` – dezentes Effizienzlabel-Symbol der allgemeinen Energieberatung
- `images/logo_skywalker.png` – Logo für den Navigationspunkt und den Abschnitt „Innovation“
- `images/hero-house.webp` – Hero-Motiv
- `images/profil.jpg` – Profilbild im Abschnitt „Über mich“
- `images/logo_groundbreakers.webp` – Groundbreakers-Logo
- `images/logo_gs_sh.svg` – Gründungsstipendium-SH-Logo
- `images/logo_plug-and-play.png` – Plug-and-Play-Logo
- `impressum.html` und `datenschutz.html` – rechtliche Musterseiten mit Platzhaltern

## Lokal starten

1. Den kompletten Projektordner in Visual Studio Code öffnen.
2. Optional die Erweiterung **Live Server** installieren.
3. In `index.html` rechtsklicken und **Open with Live Server** wählen.

Alternativ im Projektordner ausführen:

```bash
python -m http.server 8000
```

Danach im Browser `http://localhost:8000` öffnen.

## Aktueller Stand

- In der linken Navigation steht nun „Energieberatung für Wohngebäude“ mit einem kleinen, mehrfarbigen Effizienzlabel.
- Das Skywalker-Energie-Logo ersetzt den bisherigen Navigationspunkt „Innovation“ und erscheint zusätzlich oberhalb der Innovationsüberschrift mit dem Hinweis „Thermografische Quartiersanalysen von“.
- Zufällig aufleuchtende Lichtpunkte liegen dezent über Navigation und Hero und verschwinden außerhalb des Hero-Bereichs.
- Das Pitchdeck wird mit allen zwölf Originalseiten horizontal dargestellt.
- Mausrad, Pfeiltasten, Navigationspunkte, Schaltflächen und Wischgesten wechseln jeweils genau eine Pitchdeck-Seite. Am Anfang und Ende läuft das normale Scrollen der Website weiter.
- Das vollständige PDF bleibt über „PDF öffnen“ erreichbar.
- Ablauf der Quartiersanalyse, Profilbild und verlinkte Förder- beziehungsweise Partnerlogos bleiben eingebunden.

## Pitchdeck aktualisieren

Wird `pitchdeck.pdf` später ersetzt, müssen auch die Dateien in `images/pitchdeck/` neu aus dem PDF gerendert werden. Die HTML-Datei erwartet derzeit genau zwölf Seiten mit den Dateinamen `page-01.webp` bis `page-12.webp`.

## Vor Veröffentlichung anpassen

Im Projekt nach `TODO` und nach eckigen Platzhaltern wie `[Vorname Nachname]` suchen. Besonders wichtig sind:

- E-Mail-Adresse, Telefonnummer und Einsatzgebiet in `index.html`
- `data-recipient` am Kontaktformular
- Unternehmens- und Adressdaten in `impressum.html`
- Angaben zum Hosting in `datenschutz.html`
- fachliche und rechtliche Prüfung der Leistungsbeschreibungen sowie der luftrechtlichen und datenschutzrechtlichen Hinweise

## Kontaktformular

Das Formular benötigt keinen Server. Nach dem Absenden öffnet es das lokale E-Mail-Programm und übernimmt die Eingaben in eine vorbereitete Nachricht. Für einen echten Versand direkt aus der Website ist ein Formular-Backend erforderlich.

## Rechtlicher Hinweis

Impressum und Datenschutz sind technische Muster und keine Rechtsberatung. Vor Veröffentlichung sollten die Seiten an Unternehmen, Hosting, eingesetzte Dienste und die tatsächliche Tätigkeit angepasst und rechtlich geprüft werden.
