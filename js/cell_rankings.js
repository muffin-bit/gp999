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
function getRankingType() {
  if (window.location.pathname == "/connect_prelim_rankings.html") {
    return rt.CONNECT_CELL_PRELIM;
  } else if (window.location.pathname == "/connect_final_rankings.html") {
    return rt.CONNECT_CELL_FINAL;
  } else if (window.location.pathname == "/connect_rankings.html") {
    return rt.CONNECT_INDIVIDUAL_BY_GROUP;
  } else {
    debugger;
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
    return;
}

function processAndShowRankings() {
  if (ranksRaw.size == 0) {
    console.error("WARNING: No rankings to show!");
    debugger;
  }

  for (const [rank, people] of Object.entries(ranksRaw)) {
    // sort the people into C, K, J order
    var sortedPeople = Array.from(people).sort(function(a, b) {
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
    });

    var rankBuilder = {
      members: sortedPeople,
      rank: rank,
      showBackground:  getRankingType() in [rt.CONNECT_CELL_PRELIM, rt.CONNECT_CELL_FINAL]
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

// Generate visual elements
function showRankings() {
  var rankingsList = document.getElementById("rankingsList");
  rankingsList.className = "centeredColumn";

  if (getRankingType() == rt.CONNECT_INDIVIDUAL_BY_GROUP) {
    // Show the "C K J" header
    rankingsList.appendChild(getCountryHeader());

  }

  for (let cell of ranksProcessed) {
    if (cell.rank == cellsSurviving) {
      var eliminationDivider = document.createElement('hr');
      eliminationDivider.className = "eliminationDivider";
      eliminationDivider.style.marginTop = k.spacingMedium;
      eliminationDivider.style.marginBottom = k.spacingMedium;
      rankingsList.appendChild(eliminationDivider);

      var eliminationHeader = document.createElement('h3');
      eliminationHeader.textContent = "The following cells will be eliminated if their rank does not increase:";
      eliminationHeader.style.textAlign = 'center';
      eliminationHeader.style.fontSize = '20';
      eliminationHeader.style.marginBottom = k.spacingMedium;
      rankingsList.appendChild(eliminationHeader);
    }
    rankingsList.appendChild(cell.rep);
  }
}

function main() {
  d3.csv("https://muffin-bit.github.io/gp999/data.csv", parseLine, function (err, data) {
      processAndShowRankings();
  });
}

main()
