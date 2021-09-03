"use strict";

// Imports
import * as k from './constants.js'
import { Person } from './person.js';
import { RankingRep } from './ranking_rep.js';

// Constants and variables
const cellsRaw = new Set();
const cellsProcessed = new Set();
const contestants = {};
const cellsSurviving = 18;

// Ranking type
const rt = {
    SIGNAL_SONG_BY_GROUP: 'SIGNAL_SONG_BY_GROUP',
    AUDITION_TOP_NINE: 'AUDITION_TOP_NINE',
    CONNECT_CELL_PRELIM: 'CONNECT_CELL_PRELIM',
    CONNECT_CELL_FINAL: 'CONNECT_CELL_FINAL',
    CONNECT_TOP_NINE: 'CONNECT_TOP_NINE',
    CONNECT_INDIVIDUAL_BY_GROUP: 'CONNECT_INDIVIDUAL_BY_GROUP',
}

function getRankingType() {
  if (window.location.pathname == "/connect_prelim_rankings.html") {
    return rt.CONNECT_CELL_PRELIM;
  } else if (window.location.pathname == "/connect_final_rankings.html") {
    return rt.CONNECT_CELL_FINAL;
  } else if (window.location.pathname == "/connect_individual_rankings.html") {
    return rt.CONNECT_INDIVIDUAL_BY_GROUP;
  } else {
    debugger;
    return 0;
  }
}

// Parse line of csv into an object
function parseLine(row) {
    var person = new Person(row);
    contestants[person.id] = person;

    // Add their cell to the cell set
    cellsRaw.add(person.connectPerformance.cellMates);
    return person;
}

function processCells() {
  if (cellsRaw.size == 0) {
    debugger;
  }

  for (let c of cellsRaw) {
    let cellBuilder = {};
    cellBuilder.members = [];
    cellBuilder.rank = -1;

    var cellMembersArr = c.split(', '); // get ids of cell members
    for (let memberId of cellMembersArr) {  // lookup the person by id
      let person = contestants[memberId];
      cellBuilder.members.push(person);
      cellBuilder.rank = getRank(person);
    }
    let rankingRep = new RankingRep(cellBuilder);
    cellsProcessed.add(rankingRep);
  }

}

function getRank(person) {
  if (window.location.pathname == "/connect_prelim_rankings.html") {
    return person.connectPerformance.cellPrelimRank.rank;
  } else if (window.location.pathname == "/connect_final_rankings.html") {
    return person.connectPerformance.cellFinalRank.rank;
  } else {
    debugger;
    return 0;
  }
}

// Generate visual elements
function showRankings() {
  var rankingsList = document.getElementById("rankingsList");
  rankingsList.className = "centeredColumn";

  var sortedCells = Array.from(cellsProcessed).sort(function(a, b) {
    if (a.rank < b.rank) {
      return -1;
    }
    if (a.rank > b.rank) {
      return 1;
    }
    return 0;
  });

  for (let cell of sortedCells) {
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
      processCells();
      showRankings();
  });
}

main()
