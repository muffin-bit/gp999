"use strict";

// Imports
import * as k from './constants.js'
import { Person } from './person.js';
import { PerformanceRep } from './performance.js';
import { RankingRep } from './ranking_rep.js';

// Constants and variables


const contestants = {}
var performances = []

// Parse line of csv into an object
function parseLine(row) {
    var person = new Person(row);
    contestants[person.id] = person;
    return person;
}

// Generate visual elements
function showProfile(data, girlId) {
  let person = contestants[girlId];
  createProfileHeaderForPerson(person);
  createPerformancesRankingsCellsForPerson(person);
}

function createProfileHeaderForPerson(person) {
    var profileHeader = document.getElementById("profileHeader");
    profileHeader.className = 'centeredRow';

    var img = document.getElementById("profileHeaderImage")
    img.setAttribute('src', 'img/ProfilePics/' + person.id + '_ProfilePic1.jpg');

    var nameHeader = document.getElementById("profileHeaderTextNameEnglish")
    nameHeader.textContent = person.nameEnglish;

    var nameHeader = document.getElementById("profileHeaderNameChinese")
    nameHeader.textContent = person.nameChinese;

    var nameHeader = document.getElementById("profileHeaderNameKorean")
    nameHeader.textContent = person.nameKorean;

    var nameHeader = document.getElementById("profileHeaderNameJapanese")
    nameHeader.textContent = person.nameJapanese;

    var nameHeader = document.getElementById("profileGroupText")
    nameHeader.textContent = person.group;

    var nameHeader = document.getElementById("profileBirthday")
    nameHeader.textContent = "BIRTHDAY: " + person.birthday;

    var nameHeader = document.getElementById("profileZodiac")
    nameHeader.textContent = "Zodiac: " + person.zodiac;

    var nameHeader = document.getElementById("profileMBTI")
    nameHeader.textContent = "MBTI: " + person.mbti;

    var nameHeader = document.getElementById("profileHeight")
    nameHeader.textContent = "Height: " + person.heightIN;
}

function createPerformancesRankingsCellsForPerson(person) {
  var performancesList = document.getElementById("performancesList");
  performancesList.style.marginTop = k.spacingXLarge;
  performancesList.style.width = '100%';

  // const cellsDiv = createCellsDiv(person);
  // performancesList.appendChild(cellsDiv);

  const rankingsDiv = createRankingsDiv(person);
  performancesList.appendChild(rankingsDiv);

  // PERFORMANCES
  createPerformanceRep(person, PR);
  createPerformanceRep(person, k.videos.OOO);
  createPerformanceRep(person, k.videos.AUDITION);
  createPerformanceRep(person, k.videos.CONNECT);
  createPerformanceRep(person, k.videos.COMBINATION);
}

function createRankingsDiv(person) {
  var rankingsDiv = document.createElement("div")
  rankingsDiv.className = "centeredColumn";
  rankingsDiv.style.width = "100%";
  rankingsDiv.style.marginBottom = k.spacingMedium;;

  var rankingsTitle = document.createElement('h3');
  rankingsTitle.textContent = "Rankings";
  rankingsTitle.style.textAlign = 'center';
  rankingsTitle.style.marginBottom = k.spacingMedium;
  rankingsTitle.style.fontSize = '50';
  rankingsDiv.appendChild(rankingsTitle);

  var rankingsContentDiv = document.createElement("div")
  rankingsContentDiv.className = "leftAlignedColumn profileRankingsContent";
  rankingsContentDiv.style.marginBottom = k.spacingXLarge;
  rankingsDiv.appendChild(rankingsContentDiv);

  var signalSong = document.createElement("h3");
  signalSong.textContent = "Signal Song (O.O.O):    " + person.group + person.signalSong.rank;
  signalSong.style.marginBottom = k.spacingSmall;
  signalSong.style.fontFamily = "DXWooriGoStd";
  rankingsContentDiv.appendChild(signalSong);

  var top9Candidate = document.createElement("h3");
  top9Candidate.textContent = "Audition Mission Top 9 candidate:    " + (person.auditionPerformance.top9Candidate == "Y" ? "Yes" : "No");
  top9Candidate.style.marginBottom = k.spacingSmall;
  top9Candidate.style.fontFamily = "DXWooriGoStd";
  rankingsContentDiv.appendChild(top9Candidate);

  if (person.auditionPerformance.top9Rank != "" && person.auditionPerformance.top9Rank !== undefined) {
    var auditionTop9Rank = document.createElement("h3");
    auditionTop9Rank.textContent = "Audition Mission Top 9 rank:    " + person.auditionPerformance.top9Rank
    auditionTop9Rank.style.marginBottom = k.spacingSmall;
    auditionTop9Rank.style.fontFamily = "DXWooriGoStd";
    rankingsContentDiv.appendChild(auditionTop9Rank);
  }

  var connectCellPrelimRank = document.createElement("h3");
  connectCellPrelimRank.textContent = "First elimination prelim cell rank:    " + person.connectPerformance.cellPrelimRank.rank;
  connectCellPrelimRank.style.marginBottom = k.spacingSmall;
  connectCellPrelimRank.style.fontFamily = "DXWooriGoStd";
  rankingsContentDiv.appendChild(connectCellPrelimRank);

  var connectCellFinalRank = document.createElement("h3");
  connectCellFinalRank.textContent = "First elimination final cell rank:    " + person.connectPerformance.cellFinalRank.rank;
  connectCellFinalRank.style.marginBottom = k.spacingSmall;
  connectCellFinalRank.style.fontFamily = "DXWooriGoStd";
  rankingsContentDiv.appendChild(connectCellFinalRank);

  const connectTop9Rank = person.connectPerformance.individualFinalRank.rankOverall;
  if (connectTop9Rank != "" && connectTop9Rank !== undefined) {
    var connectTop9Ranking = document.createElement("h3");
    connectTop9Ranking.textContent = "First elimination individual top 9 rank:    " + connectTop9Rank;
    connectTop9Ranking.style.marginBottom = k.spacingSmall;
    connectTop9Ranking.style.fontFamily = "DXWooriGoStd";
    rankingsContentDiv.appendChild(connectTop9Ranking);
  }

  var connectCellFinalRank = document.createElement("h3");
  connectCellFinalRank.textContent = "First elimination individual rank:    " + person.group + person.connectPerformance.individualFinalRank.rankWithinGroup;
  connectCellFinalRank.style.marginBottom = k.spacingSmall;
  connectCellFinalRank.style.fontFamily = "DXWooriGoStd";
  rankingsContentDiv.appendChild(connectCellFinalRank);

  return rankingsDiv;
}

function createCellsDiv(person) {
  var cellsDiv = document.createElement("div");
  cellsDiv.className = "centeredRow";

  var auditionCell = document.createElement("div");
  var auditionCellHeader = document.createElement("h3");
  auditionCellHeader.textContent = "Audition Mission";
  auditionCell.appendChild(auditionCellHeader);
  var auditionCellBuilder = {
    members: sortedPeople,
    rank: -1,
    showBackground: true
  }
  const auditionCellRep = new RankingRep(auditionCellBuilder);
  auditionCell.add(auditionCellRep.rep);

  var connectCell = document.createElement("div");
  connectCell.className = "centeredColumn";
  var connectCellHeader = document.createElement("h3");
  connectCellHeader.textContent = "Audition Mission";
  connectCellHeader.style.textAlign = 'center';
  connectCellHeader.style.marginBottom = k.spacingMedium;
  connectCellHeader.style.fontSize = '30';
  connectCell.appendChild(connectCellHeader);
  let cellMatesRaw = person.connectPerformance.cellMates.split(", ");
  let cellMatesProcessed = [];
  for (let member of cellMatesRaw) {
    cellMatesProcessed.push(contestants[member]);
  }

  var connectCellBuilder = {
    members: cellMatesProcessed,
    rank: -1,
    showBackground: true
  }
  const connectCellRep = new RankingRep(connectCellBuilder);
  connectCell.appendChild(connectCellRep.rep);
  cellsDiv.appendChild(connectCell);

  return cellsDiv;
}

function createPerformanceRep(person, performance) {
  // Get performance info
  var perfBuilder = {};
  var perfProperty = "";
  switch(performance){
    case k.videos.PR:
      perfBuilder.title = "PR Intro";
      perfBuilder.fancamURL = person.prVideo.fancamURL;
      perfProperty = "prVideo";
      break;
    case k.videos.OOO:
      perfBuilder.title = "Signal Song";
      perfBuilder.subtitle = "(O.O.O)";
      perfBuilder.fancamURL = person.signalSong.fancamURL;
      perfProperty = "signalSong";
      break;
    case k.videos.AUDITION:
      perfBuilder.title = "Audition Mission";
      perfBuilder.subtitle = "\"" + person.auditionPerformance.name + "\"";
      perfBuilder.perfURL = person.auditionPerformance.perfURL;
      perfProperty = "auditionPerformance";
      break;
    case k.videos.CONNECT:
      perfBuilder.title = "Connect Mission";
      perfBuilder.subtitle =  "\"" + person.connectPerformance.name + "\"";
      perfBuilder.teamName = person.connectPerformance.teamName;
      perfBuilder.perfURL = person.connectPerformance.perfURL;
      perfBuilder.fancamURL = person.connectPerformance.fancamURL;
      perfProperty = "connectPerformance";
      break;
    case k.videos.COMBINATION:
      if (person.combinationPerformance == undefined) {
        return; // eliminated contestants from ep 5 won't have one
      }
      perfBuilder.title = "Combination Mission";
      perfBuilder.songType = person.combinationPerformance.songType;
      perfBuilder.subtitle =  "\"" + person.combinationPerformance.name + "\"";
      perfBuilder.teamName = person.combinationPerformance.teamName;
      perfBuilder.perfURL = person.combinationPerformance.perfURL;
      perfBuilder.fancamURL = person.combinationPerformance.fancamURL;
      perfProperty = "combinationPerformance";
      break;
    default:
      console.error("WARNING: Unknown performance being rendered");
      debugger;
  }

  // Get teammates / cells
  if (performance == k.videos.CONNECT) { // Use cells for connect mission
    var cells = {};
    for (let c in contestants) {
      if (contestants[c][perfProperty].id == person[perfProperty].id) {
        const contestantCellMates = contestants[c][perfProperty].cellMates;
        if (contestantCellMates in cells) {
          cells[contestantCellMates].push(contestants[c]); // Add on to an existing cell
        } else {
          cells[contestantCellMates] = [contestants[c]] // Start a new cell
        }
      }
    }
    perfBuilder.cells = cells;
  } else {
    var teammates = [];
    if (performance != k.videos.OOO && performance != k.videos.PR) { // Awkward to show teammates for signal song solos
      for (let c in contestants) {
        if (contestants[c][perfProperty] !== undefined && person[perfProperty] !== undefined && contestants[c][perfProperty].id == person[perfProperty].id) {
          teammates.push(contestants[c]);
        }
      }
    }
    perfBuilder.teammates = teammates;
  }

  let perfRep = new PerformanceRep(perfBuilder);
  performances.push(perfRep);

  // Layout out full team
  document.getElementById("performancesList").appendChild(perfRep.rep);
}

// video
function youtubeAPILoaded() {
  for (let perf of performances) {
    let videos = []
    if (perf.perfURL) {
      videos.push([perf.perfURL, perf.perfDomId]);
    }
    if (perf.fancamURL) {
      videos.push([perf.fancamURL, perf.fancamDomId]);
    }

    for (let tuple of videos) {
      let vidURL = tuple[0]
      let vidDomId = tuple[1]
      let params = new URL(vidURL).searchParams
      let videoId = params.get("v")

      if (vidDomId) {
        var player = new YT.Player(vidDomId, {
          height: '200',
          width: '300',
          videoId: videoId,
          playerVars: {
            'playsinline': 1
          }
        });
      }
    }
    if (videos.length == 0) {
      console.error("Warning, no video URL present");
      debugger;
    }
  }
}

// Core functionality
function getIdQueryParam() {
  var urlParams = new URLSearchParams(window.location.search)
  return urlParams.get('id')
}

function main() {
  var girlId = getIdQueryParam();
  d3.csv("https://muffin-bit.github.io/gp999/data.csv", parseLine, function (err, data) {
      showProfile(data, girlId);
  });
}

// Execute
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

window.onYouTubeIframeAPIReady = function() {
  youtubeAPILoaded();
}

main()
