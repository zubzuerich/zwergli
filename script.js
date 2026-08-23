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
// Inserat-Formular: läuft nur auf inserat-erstellen.html, weil
// das Formular-Element (id="inserat-form") nur dort existiert.
// -----------------------------------------------------------
const inseratForm = document.querySelector("#inserat-form");

if (inseratForm) {
  const fotosInput = document.querySelector("#fotos");
  const fotoPreview = document.querySelector("#foto-preview");
  const bestaetigung = document.querySelector("#bestaetigung");
  const bestaetigungText = document.querySelector("#bestaetigung-text");
  const kategorieSelect = document.querySelector("#kategorie");
  const sicherheitsHinweis = document.querySelector("#sicherheits-hinweis");

  // Sicherheitshinweis nur einblenden, wenn "Ausstattung" gewählt ist
  // (dort finden sich Autositze, Kinderwagen, Hochstühle etc.)
  kategorieSelect.addEventListener("change", () => {
    sicherheitsHinweis.style.display = kategorieSelect.value === "ausstattung" ? "flex" : "none";
  });

  // Sobald Fotos ausgewählt werden, zeigen wir sie direkt im Browser an.
  // FileReader liest die Datei ein und wandelt sie in eine Vorschau um,
  // OHNE sie irgendwohin hochzuladen – das passiert komplett lokal.
  fotosInput.addEventListener("change", () => {
    fotoPreview.innerHTML = ""; // vorherige Vorschau leeren

    // Nur die ersten 3 ausgewählten Dateien anzeigen
    const dateien = Array.from(fotosInput.files).slice(0, 3);

    dateien.forEach((datei) => {
      const reader = new FileReader();
      reader.addEventListener("load", () => {
        const bild = document.createElement("img");
        bild.src = reader.result;
        fotoPreview.appendChild(bild);
      });
      reader.readAsDataURL(datei);
    });
  });

  // Beim Absenden: Seite NICHT neu laden (das würde der Browser sonst
  // automatisch tun), sondern stattdessen die Bestätigung einblenden.
  inseratForm.addEventListener("submit", (ereignis) => {
    ereignis.preventDefault();

    const titel = document.querySelector("#titel").value;
    bestaetigungText.textContent = titel
      ? `"${titel}" wäre jetzt für andere Familien auf Zwergli sichtbar.`
      : "Dein Artikel wäre jetzt für andere Familien auf Zwergli sichtbar.";

    inseratForm.style.display = "none";
    bestaetigung.style.display = "block";
  });
}

// -----------------------------------------------------------
// Marktplatz-Filter: läuft nur auf marktplatz.html, weil das
// #listing-grid Element nur dort existiert.
// -----------------------------------------------------------
const listingGrid = document.querySelector("#listing-grid");

if (listingGrid) {
  const filterGroesse = document.querySelector("#filter-groesse");
  const filterKategorie = document.querySelector("#filter-kategorie");
  const filterRegion = document.querySelector("#filter-region");
  const filterZustand = document.querySelector("#filter-zustand");
  const sortierung = document.querySelector("#sortierung");
  const suche = document.querySelector("#suche");
  const filterCount = document.querySelector("#filter-count");
  const keineTreffer = document.querySelector("#keine-treffer");

  // Alle Inserate-Karten einmal in eine Liste holen, damit wir
  // sie bei Bedarf immer wieder neu sortieren/anzeigen können.
  const alleKarten = Array.from(listingGrid.querySelectorAll(".listing-card"));

  // Diese Funktion wird bei jeder Filter-Änderung neu aufgerufen.
  function filternUndSortieren() {
    const suchtext = suche.value.trim().toLowerCase();
    let sichtbareAnzahl = 0;

    alleKarten.forEach((karte) => {
      const titel = karte.querySelector(".listing-title").textContent.toLowerCase();

      // Jede Karte muss ALLE aktiven Filter gleichzeitig erfüllen (UND-Verknüpfung)
      const passtGroesse = filterGroesse.value === "alle" || karte.dataset.groesse === filterGroesse.value;
      const passtKategorie = filterKategorie.value === "alle" || karte.dataset.kategorie === filterKategorie.value;
      const passtRegion = filterRegion.value === "alle" || karte.dataset.region === filterRegion.value;
      const passtZustand = filterZustand.value === "alle" || karte.dataset.zustand === filterZustand.value;
      const passtSuche = suchtext === "" || titel.includes(suchtext);

      const sichtbar = passtGroesse && passtKategorie && passtRegion && passtZustand && passtSuche;

      karte.style.display = sichtbar ? "" : "none";
      if (sichtbar) sichtbareAnzahl++;
    });

    // Sortierung: nur die sichtbaren Karten neu anordnen, nach Preis
    if (sortierung.value !== "neueste") {
      const sichtbareKarten = alleKarten.filter((k) => k.style.display !== "none");
      sichtbareKarten.sort((a, b) => {
        const preisA = Number(a.dataset.preis);
        const preisB = Number(b.dataset.preis);
        return sortierung.value === "preis-auf" ? preisA - preisB : preisB - preisA;
      });
      // appendChild verschiebt ein existierendes Element an die neue Position,
      // statt es zu duplizieren
      sichtbareKarten.forEach((karte) => listingGrid.appendChild(karte));
    }

    filterCount.textContent = `${sichtbareAnzahl} Artikel`;
    keineTreffer.style.display = sichtbareAnzahl === 0 ? "block" : "none";
  }

  // Auf jede Filter-Änderung reagieren
  [filterGroesse, filterKategorie, filterRegion, filterZustand, sortierung].forEach((element) => {
    element.addEventListener("change", filternUndSortieren);
  });
  // "input" statt "change", damit die Suche schon beim Tippen reagiert
  suche.addEventListener("input", filternUndSortieren);
}

// -----------------------------------------------------------
// Spar-Rechner: reagiert auf den Schieberegler (id="artikel-slider")
// und rechnet live aus, wie viel CO2 und Wasser gespart wird.
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
