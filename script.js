// =========================================================
// ZWERGLI – script.js
// Hier lernst du die 3 Grundbausteine von JavaScript im Browser:
// 1) Ein Element im HTML "finden"      -> document.querySelector
// 2) Auf ein Ereignis reagieren        -> addEventListener
// 3) Etwas am Bildschirm verändern     -> classList / style / textContent
// =========================================================

// 1) Element finden: den Button mit der id="menu-toggle"
const menuToggle = document.querySelector("#menu-toggle");
const mainNav = document.querySelector("#main-nav");

// 2) Auf Klick reagieren
menuToggle.addEventListener("click", () => {
  // 3) Etwas verändern: eine CSS-Klasse an- und ausschalten
  //    "toggle" schaut selbst nach, ob die Klasse schon da ist,
  //    und entfernt sie dann, statt sie hinzuzufügen.
  const istOffen = mainNav.classList.toggle("nav-open");

  // Für Screenreader/Barrierefreiheit sagen wir auch dem Button,
  // ob das Menü gerade offen ist.
  menuToggle.setAttribute("aria-expanded", istOffen);
});

// -----------------------------------------------------------
// Spar-Rechner: reagiert auf den Schieberegler (id="artikel-slider")
// und rechnet live aus, wie viel Geld und Wasser gespart wird.
// -----------------------------------------------------------
const slider = document.querySelector("#artikel-slider");

if (slider) {
  const artikelWert = document.querySelector("#artikel-wert");
  const co2Wert = document.querySelector("#co2-wert");
  const wasserWert = document.querySelector("#wasser-wert");

  // Quellen: EuRIC (2023) – 3 kg CO2 gespart pro wiederverwendetem
  // Kleidungsstück. WWF – durchschnittlicher Wasserfussabdruck eines
  // Kleidungsstücks (Anbau, Färben, Verarbeitung) von 2'700 Litern.
  const CO2_PRO_ARTIKEL = 3; // kg
  const WASSER_PRO_ARTIKEL = 2700; // Liter

  // Diese Funktion liest den aktuellen Schieberegler-Wert und
  // schreibt die berechneten Zahlen in die drei Anzeige-Felder.
  function rechnerAktualisieren() {
    const anzahl = Number(slider.value);

    artikelWert.textContent = anzahl;
    co2Wert.textContent = `${anzahl * CO2_PRO_ARTIKEL} kg`;

    const wasserGesamt = anzahl * WASSER_PRO_ARTIKEL;
    // toLocaleString formatiert grosse Zahlen mit Tausender-Trennzeichen,
    // z.B. aus 27000 wird "27'000"
    wasserWert.textContent = `${wasserGesamt.toLocaleString("de-CH")} l`;
  }

  // "input" feuert bei jeder Mausbewegung des Reglers, nicht erst beim Loslassen
  slider.addEventListener("input", rechnerAktualisieren);

  // Einmal beim Laden der Seite ausführen, damit die Startwerte stimmen
  rechnerAktualisieren();
}

// -----------------------------------------------------------
// Kleines Extra: Wenn jemand auf einen Anker-Link (#kategorien etc.)
// klickt, während das mobile Menü offen ist, soll es sich schliessen.
// Das ist ein Beispiel dafür, wie man auf MEHRERE Elemente gleichzeitig
// hört (querySelectorAll statt querySelector).
// -----------------------------------------------------------
const navLinks = document.querySelectorAll("#main-nav a");

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("nav-open");
    menuToggle.setAttribute("aria-expanded", false);
  });
});
