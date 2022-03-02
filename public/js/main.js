//////////////////////////// MAIN SCRIPT //////////////////////////////
import axios from 'https://cdn.skypack.dev/axios'; //communication between node express server (q100_info.js) and main.js via HTTP
//------------------------- COMMUNICATION -----------------------------
// ----------------- processing of incoming data ----------------------
const socket = io('localhost:8081');

let previousMessage;
let userMode = 'input';

socket.on('message', function (message) {
  // only log if it's different
  if (previousMessage != message) {
    const json = JSON.parse(message);
    console.log(json);
    const data = processData(json);
    updateClusterCharts(data);
    if (json.clusters) renderHouseInfo(json.clusters);

    if (json.mode){
      console.log(userMode)
      userMode = json.mode;
      switchUserMode(userMode);
    }
    updateImage();
    previousMessage = message;
  }
});

// ------------------------- DATA STRUCTS -----------------------------
let simulationData = {
  year: 2022,
  co2: '500',
  wärme: 'y',
  strom: 'z',
  förderung: 'n'
}

const sampleHouseInfo = [{
  "adresse": "Straßenname 19",
  "CO2": 0.2036314841,
  "anschluss": 0,
  "investment": 2,
  "versorgung": "konventionell",
  "Wärmeverbrauch 2017 [kWh]": 71921,
  "Stromverbrauch 2017 [kWh]": 10260
}, {
  "adresse": "Straßenname 15",
  "CO2": 0.2488510615,
  "anschluss": 1,
  "investment": 3,
  "versorgung": "gruen",
  "Wärmeverbrauch 2017 [kWh]": 161150,
  "Stromverbrauch 2017 [kWh]": 46197
}, {
  "adresse": "Straßenname 8",
  "CO2": 0.317290762,
  "anschluss": 0,
  "investment": 1,
  "versorgung": "medium",
  "Wärmeverbrauch 2017 [kWh]": 251721,
  "Stromverbrauch 2017 [kWh]": 71428
}]

const quartierData = [
  {
    "step": 0,
    "attributes": {
      "Verbrauch": 1000000,
      "CO2": 10.813611631,
      "Investment": 0.3,
      "EEH": 0.4458936055
    }
  },
  {
    "step": 1,
    "attributes": {
      "Verbrauch": 900000,
      "CO2": 9.813611631,
      "Investment": 0.4,
      "EEH": 0.5458936055
    }
  },
  {
    "step": 2,
    "attributes": {
      "Verbrauch": 800000,
      "CO2": 8.813611631,
      "Investment": 0.5,
      "EEH": 0.6458936055
    }
  },
  {
    "step": 3,
    "attributes": {
      "Verbrauch": 700000,
      "CO2": 7.813611631,
      "Investment": 0.6,
      "EEH": 0.7458936055
    }
  }
]

// fetch simulation_df from node express server /api/data endpoint
const dataSet = async function fetchData() {
  return await axios.get('/api/data');
}

async function fetchSimulationDataFrame() {
  const dataObject = await dataSet();
  const retval = dataObject.data
  return retval
}
const simulation_df = await fetchSimulationDataFrame()

// ------------------------ UPDATE FUNCTIONS --------------------------
console.log(simulation_df);
updateClusterCharts(clusterBefore);
updateTotalCharts(totalBefore);
renderHouseInfo(sampleHouseInfo);
renderSimulationVariables(simulationData); // replaces variables in simulation_template
renderSimulationScreen(simulation_df, quartierData);

// ---------------------------- KEY EVENTS ----------------------------
document.addEventListener('keydown', function (event) {
  console.log(userMode);
  if (event.key == " ") { // space
    userMode == 'input' ? userMode = 'simulation' : userMode = 'input';
    switchUserMode(userMode);
  }
});