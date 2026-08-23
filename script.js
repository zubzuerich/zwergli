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
// Daten aller 9 Beispiel-Inserate an einer Stelle, damit sowohl
// die Marktplatz-Filter als auch die Detailseite darauf zugreifen
// können, ohne die Angaben zweimal pflegen zu müssen.
// -----------------------------------------------------------
const INSERATE_DATEN = {
  1: { titel: "Winter-Schneeanzug", preis: 28, zustand: "Gut erhalten", groesse: "86–92", region: "Winterthur", kategorie: "Kleidung", beschreibung: "Warmer, wasserdichter Schneeanzug von Reima. Wurde einen Winter lang getragen, keine Flecken oder Risse, Reissverschluss funktioniert einwandfrei." },
  2: { titel: "3er-Set Bodies langarm", preis: 12, zustand: "Neuwertig", groesse: "62", region: "Zürich", kategorie: "Kleidung", beschreibung: "Drei langärmlige Bodies aus Bio-Baumwolle, kaum getragen weil zu schnell herausgewachsen. Keine Flecken, alle Knöpfe intakt." },
  3: { titel: "Kinderwagen 3-in-1", preis: 240, zustand: "Gut erhalten", groesse: "Ab Geburt", region: "Uster", kategorie: "Ausstattung", beschreibung: "3-in-1 System inklusive Babyschale, Wanne und Sportsitz. Normale Gebrauchsspuren an den Rädern, Gestell und Stoffe in gutem Zustand." },
  4: { titel: "Lauflernschuhe", preis: 8, zustand: "Sichtbar getragen", groesse: "21", region: "Winterthur", kategorie: "Schuhe", beschreibung: "Echtleder-Lauflernschuhe, sichtbar getragen aber Sohle noch in Ordnung. Ideal als Übergangsschuh für die kurze Lauflern-Phase." },
  5: { titel: "Holzbausteine, 40-teilig", preis: 18, zustand: "Gut erhalten", groesse: "Ab 1 Jahr", region: "Bern", kategorie: "Spielzeug", beschreibung: "FSC-zertifizierte Holzbausteine in verschiedenen Formen und Farben, in stabiler Aufbewahrungskiste. Alle 40 Teile vollständig vorhanden." },
  6: { titel: "Reboard-Autositz", preis: 95, zustand: "Neuwertig", groesse: "0–18 kg", region: "Aarau", kategorie: "Ausstattung", beschreibung: "Kaum genutzter Reboard-Autositz, Baujahr 2024. Kein Unfall, keine Stürze. Ablaufdatum am Sitz vermerkt, bitte vor Kauf selbst prüfen." },
  7: { titel: "Frühling-Jacke", preis: 15, zustand: "Gut erhalten", groesse: "104", region: "Zürich", kategorie: "Kleidung", beschreibung: "Wasserdichte Übergangsjacke, gut erhalten mit leichten Gebrauchsspuren an den Ärmelbündchen. Reissverschluss und Kapuze intakt." },
  8: { titel: "Bilderbuch-Kiste, 12 Stück", preis: 20, zustand: "Sichtbar getragen", groesse: "Ab 2 Jahre", region: "Winterthur", kategorie: "Spielzeug", beschreibung: "Gemischte Sammlung von 12 Bilderbüchern, unterschiedliche Themen. Normale Lese-Gebrauchsspuren, alle Seiten vollständig." },
  9: { titel: "Hochstuhl mitwachsend", preis: 60, zustand: "Neuwertig", groesse: "Ab 6 Monaten", region: "St. Gallen", kategorie: "Ausstattung", beschreibung: "Mitwachsender Holz-Hochstuhl, kaum benutzt. Sitzhöhe und Fussstütze verstellbar, wächst vom Baby- bis ins Kindesalter mit." },
};

// -----------------------------------------------------------
// Inserat-Detailseite: läuft nur auf inserat-detail.html
// -----------------------------------------------------------
const detailContainer = document.querySelector("#inserat-detail");

if (detailContainer) {
  // Die ID kommt aus der URL, z.B. inserat-detail.html?id=3
  const parameter = new URLSearchParams(window.location.search);
  const id = parameter.get("id");
  const artikel = INSERATE_DATEN[id];

  if (artikel) {
    document.title = `${artikel.titel} – Zwergli`;
    document.querySelector("#detail-titel").textContent = artikel.titel;
    document.querySelector("#detail-preis").textContent = `CHF ${artikel.preis}.–`;
    document.querySelector("#detail-zustand").textContent = artikel.zustand;
    document.querySelector("#detail-groesse").textContent = artikel.groesse;
    document.querySelector("#detail-region").textContent = artikel.region;
    document.querySelector("#detail-kategorie").textContent = artikel.kategorie;
    document.querySelector("#detail-beschreibung").textContent = artikel.beschreibung;
  } else {
    // Falls die ID in der URL fehlt oder ungültig ist
    detailContainer.innerHTML = "<p>Dieses Inserat wurde nicht gefunden.</p>";
  }
}

// -----------------------------------------------------------
// Grössen-Guide: läuft nur auf groessen-guide.html
// -----------------------------------------------------------
const geburtsdatumInput = document.querySelector("#geburtsdatum");

if (geburtsdatumInput) {
  const guideResults = document.querySelector("#guide-results");
  const aktuelleGroesse = document.querySelector("#aktuelle-groesse");
  const aktuelleSchuhgroesse = document.querySelector("#aktuelle-schuhgroesse");
  const naechsteGroesse = document.querySelector("#naechste-groesse");
  const naechsteSchuhgroesse = document.querySelector("#naechste-schuhgroesse");
  const autositzGruppe = document.querySelector("#autositz-gruppe");
  const gewichtInput = document.querySelector("#gewicht");
  const koerpergroesseInput = document.querySelector("#koerpergroesse");

  // Richtwerte für Autositz-Gruppen nach Alter. WICHTIG: gesetzlich zählt
  // eigentlich Gewicht/Körpergrösse, nicht das Alter - das steht auch so
  // im Hinweistext auf der Seite. Quellen: ASTRA, BFU (siehe Links im HTML).
  const AUTOSITZ_TABELLE = [
    { bis: 15, gruppe: "Babyschale (Gruppe 0+)", bereich: "bis ca. 13 kg, rückwärtsgerichtet" },
    { bis: 48, gruppe: "Kindersitz (Gruppe 1)", bereich: "ca. 9–18 kg" },
    { bis: 84, gruppe: "Sitzerhöhung (Gruppe 2)", bereich: "ca. 15–25 kg" },
    { bis: 144, gruppe: "Sitzerhöhung (Gruppe 3)", bereich: "ca. 22–36 kg, bis 150 cm oder 12 Jahre" },
  ];

  // Dieselben Gruppen, aber nach Gewicht statt Alter sortiert - wird
  // verwendet, sobald ein Gewicht eingegeben wird (genauer als eine
  // Alters-Schätzung, weil Kinder unterschiedlich schnell wachsen).
  const AUTOSITZ_NACH_GEWICHT = [
    { bisKg: 13, gruppe: "Babyschale (Gruppe 0+)", bereich: "bis ca. 13 kg, rückwärtsgerichtet" },
    { bisKg: 18, gruppe: "Kindersitz (Gruppe 1)", bereich: "ca. 9–18 kg" },
    { bisKg: 25, gruppe: "Sitzerhöhung (Gruppe 2)", bereich: "ca. 15–25 kg" },
    { bisKg: 36, gruppe: "Sitzerhöhung (Gruppe 3)", bereich: "ca. 22–36 kg" },
  ];

  function autositzBerechnen(alterInMonaten) {
    const gewicht = Number(gewichtInput.value);
    const groesseCm = Number(koerpergroesseInput.value);

    // Körpergrösse hat Vorrang: ab 150 cm ist gesetzlich gar kein
    // Kindersitz mehr vorgeschrieben, unabhängig von Gewicht oder Alter.
    if (groesseCm && groesseCm >= 150) {
      return { text: "Kein Kindersitz mehr nötig – Körpergrösse erreicht", basis: "Grösse" };
    }

    // Gewicht ist genauer als Alter, wenn vorhanden
    if (gewicht) {
      const zeile = AUTOSITZ_NACH_GEWICHT.find((z) => gewicht <= z.bisKg) ?? AUTOSITZ_NACH_GEWICHT[AUTOSITZ_NACH_GEWICHT.length - 1];
      return { text: `${zeile.gruppe} · ${zeile.bereich}`, basis: "Gewicht" };
    }

    // Sonst grobe Schätzung nach Alter
    const zeile = AUTOSITZ_TABELLE.find((z) => alterInMonaten < z.bis) ?? AUTOSITZ_TABELLE[AUTOSITZ_TABELLE.length - 1];
    return { text: `${zeile.gruppe} · ${zeile.bereich}`, basis: "Alter (grobe Schätzung)" };
  }

  // Richtwerte für gängige CH/EU-Kindergrössen nach Alter in Monaten.
  // "bis" ist exklusiv (z.B. 0-1 heisst: ab Geburt bis kurz vor 1 Monat)
  const GROESSEN_TABELLE = [
    { bis: 1, kleidung: "50–56", schuh: "–" },
    { bis: 3, kleidung: "56–62", schuh: "–" },
    { bis: 6, kleidung: "62–68", schuh: "16–17" },
    { bis: 9, kleidung: "68–74", schuh: "18–19" },
    { bis: 12, kleidung: "74–80", schuh: "19–20" },
    { bis: 18, kleidung: "80–86", schuh: "20–22" },
    { bis: 24, kleidung: "86–92", schuh: "23–24" },
    { bis: 36, kleidung: "92–98", schuh: "24–27" },
    { bis: 48, kleidung: "98–104", schuh: "27–29" },
    { bis: 60, kleidung: "104–110", schuh: "29–30" },
    { bis: 72, kleidung: "110–116", schuh: "30–32" },
    { bis: 84, kleidung: "116–122", schuh: "32–33" },
    { bis: 96, kleidung: "122–128", schuh: "33–34" },
  ];

  function guideAktualisieren() {
    if (!geburtsdatumInput.value) return;

    const geburtsdatum = new Date(geburtsdatumInput.value);
    const heute = new Date();

    // Alter in Monaten berechnen (grob, aber genau genug für Kleidergrössen)
    let alterInMonaten =
      (heute.getFullYear() - geburtsdatum.getFullYear()) * 12 +
      (heute.getMonth() - geburtsdatum.getMonth());
    if (alterInMonaten < 0) alterInMonaten = 0;

    // Passende Zeile in der Tabelle finden (die erste, deren "bis" grösser ist)
    const aktuellerIndex = GROESSEN_TABELLE.findIndex((zeile) => alterInMonaten < zeile.bis);
    const aktuelleZeile = GROESSEN_TABELLE[aktuellerIndex] ?? GROESSEN_TABELLE[GROESSEN_TABELLE.length - 1];
    const naechsteZeile = GROESSEN_TABELLE[aktuellerIndex + 1];

    aktuelleGroesse.textContent = aktuelleZeile.kleidung;
    aktuelleSchuhgroesse.textContent = `Schuhgrösse ${aktuelleZeile.schuh}`;

    if (naechsteZeile) {
      naechsteGroesse.textContent = naechsteZeile.kleidung;
      naechsteSchuhgroesse.textContent = `Schuhgrösse ${naechsteZeile.schuh}`;
    } else {
      naechsteGroesse.textContent = "–";
      naechsteSchuhgroesse.textContent = "Ausserhalb der Tabelle";
    }

    guideResults.classList.add("sichtbar");

    // Autositz-Richtwert berechnen (separat von der Kleidergrössen-Tabelle,
    // nutzt Gewicht/Grösse falls vorhanden, sonst nur das Alter)
    const autositzErgebnis = autositzBerechnen(alterInMonaten);
    autositzGruppe.textContent = autositzErgebnis.text;
    document.querySelector("#autositz-basis").textContent = `Berechnet nach: ${autositzErgebnis.basis}`;
  }

  // Bei jeder Änderung neu berechnen - Geburtsdatum ist Pflicht für die
  // Kleidergrössen, Gewicht/Grösse verfeinern zusätzlich die Autositz-Angabe
  geburtsdatumInput.addEventListener("change", guideAktualisieren);
  gewichtInput.addEventListener("input", guideAktualisieren);
  koerpergroesseInput.addEventListener("input", guideAktualisieren);
}

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
  const nurFavoriten = document.querySelector("#nur-favoriten");

  // Alle Inserate-Karten einmal in eine Liste holen, damit wir
  // sie bei Bedarf immer wieder neu sortieren/anzeigen können.
  const alleKarten = Array.from(listingGrid.querySelectorAll(".listing-card"));

  // -----------------------------------------------------------
  // Merkliste: gemerkte Artikel-IDs werden im localStorage
  // gespeichert, damit sie auch nach einem Neuladen der Seite
  // noch da sind (localStorage bleibt im Browser erhalten).
  // -----------------------------------------------------------
  function gemerkteIdsLesen() {
    const gespeichert = localStorage.getItem("zwergli-merkliste");
    return gespeichert ? JSON.parse(gespeichert) : [];
  }

  function gemerkteIdsSchreiben(ids) {
    localStorage.setItem("zwergli-merkliste", JSON.stringify(ids));
  }

  // Beim Laden: Herzen einfärben, falls der Artikel schon gemerkt ist
  const gemerkteIds = gemerkteIdsLesen();
  document.querySelectorAll(".favorit-btn").forEach((button) => {
    if (gemerkteIds.includes(button.dataset.id)) {
      button.classList.add("gemerkt");
    }

    button.addEventListener("click", (ereignis) => {
      // Verhindert, dass der Klick auch den umliegenden Link (zur Detailseite) auslöst
      ereignis.preventDefault();
      ereignis.stopPropagation();

      const aktuelleIds = gemerkteIdsLesen();
      const istGemerkt = aktuelleIds.includes(button.dataset.id);

      const neueIds = istGemerkt
        ? aktuelleIds.filter((id) => id !== button.dataset.id)
        : [...aktuelleIds, button.dataset.id];

      gemerkteIdsSchreiben(neueIds);
      button.classList.toggle("gemerkt", !istGemerkt);

      // Falls der "Nur Favoriten"-Filter aktiv ist, sofort neu filtern
      if (nurFavoriten && nurFavoriten.checked) filternUndSortieren();
    });
  });

  // Diese Funktion wird bei jeder Filter-Änderung neu aufgerufen.
  function filternUndSortieren() {
    const suchtext = suche.value.trim().toLowerCase();
    const aktuelleFavoriten = gemerkteIdsLesen();
    let sichtbareAnzahl = 0;

    alleKarten.forEach((karte) => {
      const titel = karte.querySelector(".listing-title").textContent.toLowerCase();

      // Jede Karte muss ALLE aktiven Filter gleichzeitig erfüllen (UND-Verknüpfung)
      const passtGroesse = filterGroesse.value === "alle" || karte.dataset.groesse === filterGroesse.value;
      const passtKategorie = filterKategorie.value === "alle" || karte.dataset.kategorie === filterKategorie.value;
      const passtRegion = filterRegion.value === "alle" || karte.dataset.region === filterRegion.value;
      const passtZustand = filterZustand.value === "alle" || karte.dataset.zustand === filterZustand.value;
      const passtSuche = suchtext === "" || titel.includes(suchtext);
      const passtFavorit = !nurFavoriten.checked || aktuelleFavoriten.includes(karte.dataset.id);

      const sichtbar = passtGroesse && passtKategorie && passtRegion && passtZustand && passtSuche && passtFavorit;

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
  [filterGroesse, filterKategorie, filterRegion, filterZustand, sortierung, nurFavoriten].forEach((element) => {
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
