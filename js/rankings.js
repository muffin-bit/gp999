"use strict";

// Imports
import * as k from './constants.js'
import { Person } from './person.js';
import { CellRep } from './cell.js';

// Constants and variables
const cellsRaw = new Set();
const cellsProcessed = new Set();
const contestants = {};
const cellsSurviving = 18;

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
      cellBuilder.rank = person.connectPerformance.cellPrelimRank;
    }
    let cellRep = new CellRep(cellBuilder);
    cellsProcessed.add(cellRep);
  }

}

// Generate visual elements
function showRankings() {
  var moreComingSoon = document.getElementById("rankingsMoreComing");
  moreComingSoon.style.marginBottom = k.spacingMedium;
  moreComingSoon.style.fontFamiliy = "DXWooriGoStd";

  var rankingsDescription = document.getElementById("rankingsDescription");
  rankingsDescription.style.marginBottom = k.spacingMedium;
  rankingsDescription.style.fontFamily = "DXWooriGoStd";

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
