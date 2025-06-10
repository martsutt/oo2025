import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        Kümnevõistlus: "Decathlon",
        Sportlased: "Athletes",
        Võistlusalad: "Events",
        Tulemused: "Results",
        Kaart: "Map",
        Tõlge: "Translation",
        Nimi: "Name",
        Vanus: "Age",
        Riik: "Country",
        Haldus: "Actions",
        "Sportlaste tulemused": "Athletes' Results",
        "Sportlaste andmete haldus": "Athlete Data Management",
        Kogusumma: "Total score",
        Leht: "Page",
        "Vaata/Muuda": "View/Edit",
        Vaata: "View",
        "Kõik riigid": "All countries",
        "Lisa sportlane": "Add athlete",
        Tulemus: "Result",
        Salvesta: "Save",
      },
    },
    et: {
      translation: {
        Kümnevõistlus: "Kümnevõistlus",
        Sportlased: "Sportlased",
        Võistlusalad: "Võistlusalad",
        Tulemused: "Tulemused",
        Kaart: "Kaart",
        Tõlge: "Tõlge",
        Nimi: "Nimi",
        Vanus: "Vanus",
        Riik: "Riik",
        Haldus: "Haldus",
        "Sportlaste tulemused": "Sportlaste tulemused",
        "Sportlaste andmete haldus": "Sportlaste andmete haldus",
        Kogusumma: "Kogusumma",
        Leht: "Leht",
        "Vaata/Muuda": "Vaata/Muuda",
        Vaata: "Vaata",
        "Kõik riigid": "Kõik riigid",
        "Lisa sportlane": "Lisa sportlane",
        Tulemus: "Tulemus",
        Salvesta: "Salvesta",
      },
    },
  },
  lng: "et",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
