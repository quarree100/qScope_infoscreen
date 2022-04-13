// ------------------------- DATA STRUCTS -----------------------------
let simulationData = {
  year: 2022,
  co2: '500',
  wärme: 'y',
  strom: 'z',
  förderung: 'n'
}

const sampleHouseInfo = [{
  "address": "Straßenname 19",
  "CO2": 0.2036314841,
  "connection_to_heat_grid": 0,
  "electricity_supplier": "gray",
  "heat_consumption": 71921,
  "electricity_consumption": 10260,
  "refurbished": false
}, {
  "address": "Straßenname 15",
  "CO2": 0.2488510615,
  "connection_to_heat_grid": 1,
  "electricity_supplier": "green",
  "heat_consumption": 161150,
  "electricity_consumption": 46197,
  "refurbished": false
}, {
  "address": "Straßenname 8",
  "CO2": 0.317290762,
  "connection_to_heat_grid": 0,
  "electricity_supplier": "mix",
  "heat_consumption": 251721,
  "electricity_consumption": 71428,
  "refurbished": true
}]

const quartierData = [
  {
    "step": 0,
    "attributes": {
      "Verbrauch": 1000000,
      "CO2": 10.813611631,
      "Investment": 0.3,
    }
  },
  {
    "step": 1,
    "attributes": {
      "Verbrauch": 900000,
      "CO2": 9.813611631,
      "Investment": 0.4,
    }
  },
  {
    "step": 2,
    "attributes": {
      "Verbrauch": 800000,
      "CO2": 8.813611631,
      "Investment": 0.5,
    }
  },
  {
    "step": 3,
    "attributes": {
      "Verbrauch": 700000,
      "CO2": 7.813611631,
      "Investment": 0.6,
    }
  }
]

const sampleQuestions = [
  "Die globale Erderwärmung wird durch von Menschen produzierte Emissionen verstärkt.",
  "Der Schutz der Umwelt ist ein Mittel zur Stärkung des Wirtschaftswachstums in Deutschland.",
  "Ich glaube, dass wir jedes Mal, wenn wir Kohle, Öl oder Gas verwenden, zum Klimawandel beitragen.",
  "Ich würde meinen Energieverbrauch reduzieren, wenn mein Haushalt mehr Energie verbraucht als ähnliche Haushalte.",
  "Wenn ein erneuerbarer Energietarif bei einem anderen Energieversorger verfügbar wäre, würde ich meinen Anbieter wechseln.",
]