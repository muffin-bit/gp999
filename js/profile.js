"use strict";

// Imports
import * as k from './constants.js'
import { Person } from './person.js';
import { PerformanceRep } from './performance.js';

// Constants and variables
const videos = {
    OOO: 'ooo',
    PR: 'pr',
    HIDDENBOX: 'hiddenbox',
    AUDITION: 'summer',
    CONNECT: 'winter',
}

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
  createPerformancesAndRankingsForPerson(person);
}

function createProfileHeaderForPerson(person) {
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

function createPerformancesAndRankingsForPerson(person) {
  var performancesList = document.getElementById("performancesList");
  performancesList.style.marginTop = k.spacingXLarge

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
    var top9Rank = document.createElement("h3");
    top9Rank.textContent = "Audition Mission Top 9 rank:    " + person.auditionPerformance.top9Rank
    top9Rank.style.marginBottom = k.spacingSmall;
    top9Rank.style.fontFamily = "DXWooriGoStd";
    rankingsContentDiv.appendChild(top9Rank);
  }

  var ep3Ranking = document.createElement("h3");
  ep3Ranking.textContent = "First elimination prelim cell rank:    " + person.connectPerformance.cellPrelimRank;
  ep3Ranking.style.marginBottom = k.spacingSmall;
  ep3Ranking.style.fontFamily = "DXWooriGoStd";
  rankingsContentDiv.appendChild(ep3Ranking);

  document.getElementById("performancesList").appendChild(rankingsDiv);

  // PERFORMANCES
  createPerformanceRep(person, videos.PR);
  createPerformanceRep(person, videos.OOO);
  createPerformanceRep(person, videos.AUDITION);
  createPerformanceRep(person, videos.CONNECT);
}

function createPerformanceRep(person, performance) {
  // Get performance info
  var perfBuilder = {};
  var perfProperty = "";
  switch(performance){
    case videos.PR:
      perfBuilder.title = "PR Intro";
      perfBuilder.fancamURL = person.prVideo.fancamURL;
      perfProperty = "prVideo";
      break;
    case videos.OOO:
      perfBuilder.title = "Signal Song";
      perfBuilder.subtitle = "(O.O.O)";
      perfBuilder.fancamURL = person.signalSong.fancamURL;
      perfProperty = "signalSong";
      break;
    case videos.AUDITION:
      perfBuilder.title = "Audition Mission";
      perfBuilder.subtitle = "\"" + person.auditionPerformance.name + "\"";
      perfBuilder.perfURL = person.auditionPerformance.perfURL;
      perfProperty = "auditionPerformance";
      break;
    case videos.CONNECT:
      perfBuilder.title = "Connect Mission";
      perfBuilder.subtitle =  "\"" + person.connectPerformance.name + "\"";
      perfBuilder.teamName = person.connectPerformance.teamName;
      perfBuilder.perfURL = person.connectPerformance.perfURL;
      perfBuilder.fancamURL = person.connectPerformance.fancamURL;
      perfProperty = "connectPerformance";
      break;
    default:
      console.error("WARNING: Unknown performance being rendered");
      debugger;
  }

  // Get teammates
  var teammates = []
  if (performance != videos.OOO && performance != videos.PR) { // Awkward to show teammates for signal song solos
    for (let c in contestants) {
      if (contestants[c][perfProperty].id == person[perfProperty].id) {
        teammates.push(contestants[c]);
      }
    }
  }
  perfBuilder.teammates = teammates;
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
          height: '280',
          width: '460',
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
