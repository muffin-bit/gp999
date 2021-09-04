"use strict";

// Imports
import * as k from './constants.js'
import { Person } from './person.js';
import { RankingRep } from './ranking_rep.js';

// Constants and variables
const cellsRaw = new Set();
const ranksProcessed = new Set();
const contestants = {};
const cellsSurviving = 18;

const ranksRaw = {}; // Mapping from rank to people at that rank
const planetPass = []; // Folks who got the planet pass, where applicable

// Ranking type
const rt = {
    SIGNAL_SONG_BY_GROUP: 'SIGNAL_SONG_BY_GROUP',
    AUDITION_TOP_NINE: 'AUDITION_TOP_NINE',
    CONNECT_CELL_PRELIM: 'CONNECT_CELL_PRELIM',
    CONNECT_CELL_FINAL: 'CONNECT_CELL_FINAL',
    CONNECT_TOP_NINE: 'CONNECT_TOP_NINE',
    CONNECT_INDIVIDUAL_BY_GROUP: 'CONNECT_INDIVIDUAL_BY_GROUP',
}

// Utility functions
function sortByCKJ() {
  return function(a, b) {
    const lookup = {
      "C": 0,
      "K": 1,
      "J": 2
    }
    const aVal = lookup[a.group];
    const bVal = lookup[b.group];
    if (aVal < bVal) {
      return -1;
    }
    if (aVal > bVal) {
      return 1;
    }
    return 0;
  }
}

function getRankingType() {
  if (window.location.pathname == "/connect_prelim_rankings.html") {
    return rt.CONNECT_CELL_PRELIM;
  } else if (window.location.pathname == "/connect_final_rankings.html") {
    return rt.CONNECT_CELL_FINAL;
  } else if (window.location.pathname == "/connect_rankings.html") {
    return rt.CONNECT_INDIVIDUAL_BY_GROUP;
  } else {
    return 0;
  }
}

function getRank(person) {
  if (getRankingType() == rt.CONNECT_CELL_PRELIM) {
    return person.connectPerformance.cellPrelimRank.rank;
  } else if (getRankingType() == rt.CONNECT_CELL_FINAL) {
    return person.connectPerformance.cellFinalRank.rank;
  } else if (getRankingType() == rt.CONNECT_INDIVIDUAL_BY_GROUP) {
    return person.connectPerformance.individualFinalRank.rankWithinGroup;
  } else {
    debugger;
    return 0;
  }
}

function getPlanetPass(person) {
  return person.connectPerformance.cellFinalRank.eliminated == "Planet Pass";
}

function parseLine(row) {
    var person = new Person(row);
    contestants[person.id] = person;

    // Add their cell to the cell set
    cellsRaw.add(person.connectPerformance.cellMates);

    // Add the cell to the ranks dictionary
    let rank = getRank(person);
    if (! (rank in ranksRaw)) { // if the key doesn't exist
      ranksRaw[rank] = [person];
    } else {
      ranksRaw[rank].push(person);
    }

    // Add them to planet pass if necessary
    if (getPlanetPass(person)) {
      planetPass.push(person);
    }
    return;
}

function processAndShowRankings() {
  if (ranksRaw.size == 0) {
    console.error("WARNING: No rankings to show!");
    debugger;
  }

  for (const [rank, people] of Object.entries(ranksRaw)) {
    // sort the people into C, K, J order
    var sortedPeople = Array.from(people).sort(sortByCKJ());

    var rankBuilder = {
      members: sortedPeople,
      rank: rank,
      showBackground:  [rt.CONNECT_CELL_PRELIM, rt.CONNECT_CELL_FINAL].includes(getRankingType())
    }
    const rankingRep = new RankingRep(rankBuilder);
    ranksProcessed.add(rankingRep);
  }

  showRankings();
}

function getCountryHeader() {
  var countryHeader = document.createElement("div");
  countryHeader.className = "centeredRow";
  countryHeader.style.width = "310px";
  countryHeader.style.justifyContent = "space-between";
  countryHeader.style.marginLeft = "24px";

  var countryHeaderC = document.createElement("h3");
  countryHeaderC.textContent = "C"
  countryHeaderC.style.textAlign = 'center';
  countryHeaderC.style.fontSize = '40';
  countryHeader.appendChild(countryHeaderC);

  var countryHeaderK = document.createElement("h3");
  countryHeaderK.textContent = "K"
  countryHeaderK.style.textAlign = 'center';
  countryHeaderK.style.fontSize = '40';
  countryHeader.appendChild(countryHeaderK);

  var countryHeaderJ = document.createElement("h3");
  countryHeaderJ.textContent = "J"
  countryHeaderJ.style.textAlign = 'center';
  countryHeaderJ.style.fontSize = '40';
  countryHeader.appendChild(countryHeaderJ);

  return countryHeader;
}

function getPlanetPassHeader() {
  // Explain the Planet Pass situation
  var planetPassHeader = document.createElement('h3');
  planetPassHeader.textContent = "Saved from elimination by being given a 'Planet Pass' from the mentors:";
  planetPassHeader.style.textAlign = 'center';
  planetPassHeader.style.fontSize = '20';
  planetPassHeader.style.marginTop = k.spacingMedium;
  planetPassHeader.style.marginBottom = k.spacingMedium;
  return planetPassHeader;
}

function getPlanetPassCell() {
  // Make a fake "cell"
  var sortedPeople = Array.from(planetPass).sort(sortByCKJ());
  var rankBuilder = {
    members: sortedPeople,
    // No rank
    showBackground: false
  }
  const rankingRep = new RankingRep(rankBuilder);
  return rankingRep.rep;
}

// Generate visual elements
function showRankings() {
  var rankingsList = document.getElementById("rankingsList");
  rankingsList.className = "centeredColumn";

  if (getRankingType() == rt.CONNECT_INDIVIDUAL_BY_GROUP) {
    // Show the "C K J" header
    rankingsList.appendChild(getCountryHeader());
  }

  const hasAnElimination = [rt.CONNECT_CELL_PRELIM, rt.CONNECT_CELL_FINAL].includes(getRankingType())
  for (let cell of ranksProcessed) {
    if (hasAnElimination && cell.rank == cellsSurviving) {
      // Show planet pass if necessary
      if (getRankingType() == rt.CONNECT_CELL_FINAL && planetPass.length > 0) {
        rankingsList.appendChild(getPlanetPassHeader());
        rankingsList.appendChild(getPlanetPassCell());
      }

      // Create a divider line
      var eliminationDivider = document.createElement('hr');
      eliminationDivider.className = "eliminationDivider";
      eliminationDivider.style.marginTop = k.spacingMedium;
      eliminationDivider.style.marginBottom = k.spacingMedium;
      rankingsList.appendChild(eliminationDivider);

      // Explain the elimination situation
      var eliminationHeader = document.createElement('h3');
      if (getRankingType() == rt.CONNECT_CELL_FINAL) {
        eliminationHeader.textContent = "Eliminated:";
      } else if (getRankingType() == rt.CONNECT_CELL_PRELIM) {
        eliminationHeader.textContent = "In danger of elimination:";
      }
      eliminationHeader.style.textAlign = 'center';
      eliminationHeader.style.fontSize = '20';
      eliminationHeader.style.marginBottom = k.spacingMedium;
      rankingsList.appendChild(eliminationHeader);
    }

    // Add the next cell
    rankingsList.appendChild(cell.rep);
  }
}

function main() {
  d3.csv("https://muffin-bit.github.io/gp999/data.csv", parseLine, function (err, data) {
      processAndShowRankings();
  });
}

main()
