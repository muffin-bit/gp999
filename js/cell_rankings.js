"use strict";

// Imports
import * as k from './constants.js'
import { Person } from './person.js';
import { RankingRep } from './ranking_rep.js';

// Constants and variables
const cellsRaw = new Set();
const ranksProcessed = new Set();
const contestants = {};

const ranksRaw = {}; // Mapping from rank to people at that rank
const planetPass = []; // Folks who got the planet pass, where applicable
const top9 = {}; // Folks who got the planet pass, where applicable

// Ranking type
const rt = {
    SIGNAL_SONG_BY_GROUP: 'SIGNAL_SONG_BY_GROUP',
    AUDITION_TOP_NINE: 'AUDITION_TOP_NINE',
    CONNECT_CELL_PRELIM: 'CONNECT_CELL_PRELIM',
    CONNECT_CELL_FINAL: 'CONNECT_CELL_FINAL',
    CONNECT_INDIVIDUAL_BY_GROUP: 'CONNECT_INDIVIDUAL_BY_GROUP',
    COMBINATION_BY_GROUP: 'COMBINATION_BY_GROUP',
    COMBINATION_OVERALL: 'COMBINATION_OVERALL',
}

const cellsSurviving = {
    CONNECT_CELL_PRELIM: 18,
    CONNECT_CELL_FINAL: 18,
    CONNECT_INDIVIDUAL_BY_GROUP: 18,
    COMBINATION_BY_GROUP: 9,
    COMBINATION_OVERALL: 9
}

function getTop9NumberofVotes(person) {
  if (getRankingType() == rt.CONNECT_INDIVIDUAL_BY_GROUP) {
    return person.connectPerformance.individualFinalRank.votesTotalPoints;
  } else if (getRankingType() == rt.COMBINATION_BY_GROUP) {
    if (person.combinationPerformance !== undefined) {
      return person.combinationPerformance.finalRank.votesTotalPoints;
    }
  }
  return 0;
}

function getRankingType() {
  var n = window.location.pathname.lastIndexOf('/');
  var page = window.location.pathname.substring(n + 1);

  if (page == "connect_prelim_rankings.html") {
    return rt.CONNECT_CELL_PRELIM;
  } else if (page == "connect_final_rankings.html") {
    return rt.CONNECT_CELL_FINAL;
  } else if (page == "connect_rankings.html") {
    return rt.CONNECT_INDIVIDUAL_BY_GROUP;
  } else if (page == "combination_rankings.html") {
    return rt.COMBINATION_BY_GROUP;
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
  } else if (getRankingType() == rt.COMBINATION_BY_GROUP) {
    if (person.combinationPerformance !== undefined) {
      return person.combinationPerformance.finalRank.rankWithinGroup;
    }
  }
  return 0;
}

function getPlanetPass(person) {
  if ([rt.CONNECT_CELL_PRELIM, rt.CONNECT_CELL_FINAL].includes(getRankingType())) {
    return person.connectPerformance.cellFinalRank.eliminated == "Planet Pass";
  } else if ([rt.COMBINATION_OVERALL, rt.COMBINATION_BY_GROUP].includes(getRankingType())) {
    if (person.combinationPerformance !== undefined) {
      return person.combinationPerformance.finalRank.eliminated == "Planet Pass";
    }
  }
  return false
}

function getTop9Rank(person) {
  var top9Rank = ""
  if (getRankingType() == rt.CONNECT_INDIVIDUAL_BY_GROUP) {
    top9Rank = person.connectPerformance.individualFinalRank.rankOverall;
  } else if (getRankingType() == rt.COMBINATION_BY_GROUP) {
    if (person.combinationPerformance !== undefined) {
      top9Rank = person.combinationPerformance.finalRank.rankOverall;
    }
  }
  if (top9Rank != "" && top9Rank !== undefined) {
    return parseInt(top9Rank);
  }
  return -1;
}

function getCountryHeader() {
  var countryHeader = document.createElement("div");
  countryHeader.className = "centeredRow";
  countryHeader.id = "rankingsCountryHeader";
  countryHeader.style.justifyContent = "space-between";

  var countryHeaderC = document.createElement("h3");
  countryHeaderC.textContent = "C"
  countryHeaderC.style.textAlign = 'center';
  countryHeader.appendChild(countryHeaderC);

  var countryHeaderK = document.createElement("h3");
  countryHeaderK.textContent = "K"
  countryHeaderK.style.textAlign = 'center';
  countryHeader.appendChild(countryHeaderK);

  var countryHeaderJ = document.createElement("h3");
  countryHeaderJ.textContent = "J"
  countryHeaderJ.style.textAlign = 'center';
  countryHeader.appendChild(countryHeaderJ);

  return countryHeader;
}

function getPlanetPassHeader() {
  // Explain the Planet Pass situation
  var planetPassHeader = document.createElement('h3');
  planetPassHeader.textContent = "Saved from elimination by being given a 'Planet Pass' from the mentors:";
  planetPassHeader.style.textAlign = 'center';
  planetPassHeader.style.fontSize = '20';
  planetPassHeader.style.margin = k.spacingMedium;
  return planetPassHeader;
}

function getPlanetPassCell() {
  // Make a fake "cell"
  var sortedPeople = Array.from(planetPass).sort(k.sortByCKJ());
  var rankBuilder = {
    members: sortedPeople,
    // No rank
    showBackground: false
  }
  const rankingRep = new RankingRep(rankBuilder);
  return rankingRep.rep;
}

function getEliminationDivider() {
  var eliminationDivider = document.createElement('hr');
  eliminationDivider.className = "eliminationDivider";
  eliminationDivider.style.margin = k.spacingMedium;
  return eliminationDivider;
}

function getEliminationHeader() {
  var eliminationHeader = document.createElement('h3');
  if (getRankingType() == rt.CONNECT_CELL_FINAL) {
    eliminationHeader.textContent = "Eliminated:";
  } else if (getRankingType() == rt.CONNECT_CELL_PRELIM) {
    eliminationHeader.textContent = "In danger of elimination:";
  }
  eliminationHeader.style.textAlign = 'center';
  eliminationHeader.style.fontSize = '20';
  eliminationHeader.style.marginBottom = k.spacingMedium;
  return eliminationHeader;
}

function getTop9Div() {
  if (getRankingType() != rt.CONNECT_INDIVIDUAL_BY_GROUP) {
    console.error("Warning: Showing a top 9 for something other than the connect mission final!");
  }

  var top9Div = document.createElement('div');
  top9Div.className = "centeredColumn";

  var top9FirstRow = document.createElement('div');
  top9FirstRow.className = "centeredRow fullWidth";
  top9FirstRow.appendChild(top9[1].getSmallRep(1, getTop9NumberofVotes(top9[1])));
  top9Div.appendChild(top9FirstRow);

  // DESKTOP
  var top9SecondRow = document.createElement('div');
  top9SecondRow.className = "centeredRow fullWidth desktopOnly";
  top9SecondRow.appendChild(top9[2].getSmallRep(2, getTop9NumberofVotes(top9[2])));
  top9SecondRow.appendChild(top9[3].getSmallRep(3, getTop9NumberofVotes(top9[3])));
  top9SecondRow.appendChild(top9[4].getSmallRep(4, getTop9NumberofVotes(top9[4])));
  top9Div.appendChild(top9SecondRow);

  var top9ThirdRow = document.createElement('div');
  top9ThirdRow.className = "centeredRow fullWidth desktopOnly";
  top9ThirdRow.appendChild(top9[5].getSmallRep(5, getTop9NumberofVotes(top9[5])));
  top9ThirdRow.appendChild(top9[6].getSmallRep(6, getTop9NumberofVotes(top9[6])));
  top9ThirdRow.appendChild(top9[7].getSmallRep(7, getTop9NumberofVotes(top9[7])));
  top9ThirdRow.appendChild(top9[8].getSmallRep(8, getTop9NumberofVotes(top9[8])));
  top9ThirdRow.appendChild(top9[9].getSmallRep(9, getTop9NumberofVotes(top9[9])));
  top9Div.appendChild(top9ThirdRow);

  // MOBILE
  var top9SecondRowMobile = document.createElement('div');
  top9SecondRowMobile.className = "centeredRow mobileOnly fullWidth";
  top9SecondRowMobile.appendChild(top9[2].getSmallRep(2, getTop9NumberofVotes(top9[2])));
  top9SecondRowMobile.appendChild(top9[3].getSmallRep(3, getTop9NumberofVotes(top9[3])));
  top9Div.appendChild(top9SecondRowMobile);

  var top9ThirdRowMobile = document.createElement('div');
  top9ThirdRowMobile.className = "centeredRow mobileOnly fullWidth";
  top9ThirdRowMobile.appendChild(top9[4].getSmallRep(4, getTop9NumberofVotes(top9[4])));
  top9ThirdRowMobile.appendChild(top9[5].getSmallRep(5, getTop9NumberofVotes(top9[5])));
  top9ThirdRowMobile.appendChild(top9[6].getSmallRep(6, getTop9NumberofVotes(top9[6])));
  top9Div.appendChild(top9ThirdRowMobile);

  var top9FourthRowMobile = document.createElement('div');
  top9FourthRowMobile.className = "centeredRow mobileOnly fullWidth";
  const rep1 = top9[7].getSmallRep(7, getTop9NumberofVotes(top9[7]));
  rep1.style.marginRight = '30px';
  top9FourthRowMobile.appendChild(rep1);
  top9FourthRowMobile.appendChild(top9[8].getSmallRep(8, getTop9NumberofVotes(top9[8])));
  const rep2 = top9[9].getSmallRep(9, getTop9NumberofVotes(top9[9]));
  rep2.style.marginLeft = '30px';
  top9FourthRowMobile.appendChild(rep2);
  top9Div.appendChild(top9FourthRowMobile);

  return top9Div;
}

// Business Logic
function parseLine(row) {
    var person = new Person(row);
    contestants[person.id] = person;

    // Add their cell to the cell set
    if ([rt.CONNECT_CELL_PRELIM, rt.CONNECT_CELL_FINAL].includes(getRankingType())) {
      cellsRaw.add(person.connectPerformance.cellMates);
    }

    // Add the cell to the ranks dictionary
    let rank = getRank(person);
    if (rank != 0) {
      if (! (rank in ranksRaw)) { // if the key doesn't exist
        ranksRaw[rank] = [person];
      } else {
        ranksRaw[rank].push(person);
      }
    }

    // Add them to planet pass if necessary
    if (getPlanetPass(person)) {
      planetPass.push(person);
    }

    // Add them to the top9 if necessary
    const top9Rank = getTop9Rank(person);
    if (top9Rank != -1 && top9Rank <= 9) {
      top9[top9Rank] = person;
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
    var sortedPeople = Array.from(people).sort(k.sortByCKJ());

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

// Generate visual elements
function showRankings() {
  // Show top 9 if needed
  var rankingsTop9 = document.getElementById("rankingsListTop9");
  if (!!rankingsTop9 && Object.keys(top9).length == 9) {
    rankingsTop9.appendChild(getTop9Div());

    document.getElementById("rankingsListHeader").style.marginTop = '40px';
  }

  // Proceed to longform rankings
  var rankingsList = document.getElementById("rankingsList");
  rankingsList.className = "centeredColumn";

  if (getRankingType() in [rt.CONNECT_INDIVIDUAL_BY_GROUP, rt. COMBINATION_BY_GROUP]) {
    rankingsList.appendChild(getCountryHeader()); // Show the "C K J" header
  }

  for (let trio of ranksProcessed) {
    // Show elimination and planet pass info when needed
    const hasAnElimination = [rt.CONNECT_CELL_PRELIM, rt.CONNECT_CELL_FINAL, rt.COMBINATION_BY_GROUP].includes(getRankingType())
    if (hasAnElimination && trio.rank == cellsSurviving[getRankingType()]) {
      debugger;
      if ([rt.CONNECT_CELL_FINAL, rt.COMBINATION_BY_GROUP].includes(getRankingType()) && planetPass.length > 0) {
        rankingsList.appendChild(getPlanetPassHeader());
        rankingsList.appendChild(getPlanetPassCell());
      }
      rankingsList.appendChild(getEliminationDivider());
      rankingsList.appendChild(getEliminationHeader());
    }

    // Add the next cell
    rankingsList.appendChild(trio.rep);
  }
}

function main() {
  d3.csv("https://muffin-bit.github.io/gp999/data.csv", parseLine, function (err, data) {
      processAndShowRankings();
  });
}

main()
