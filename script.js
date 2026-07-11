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
