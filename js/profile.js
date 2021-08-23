"use strict";

// Imports
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
  let person = contestants[girlId]
  createProfileHeaderForPerson(person);
  createPerformanceRep(person, videos.AUDITION);
  createPerformanceRep(person, videos.CONNECT);
}

function createProfileHeaderForPerson(person) {
    var img = document.getElementById("profileHeaderImage")
    img.setAttribute('src', 'img/ProfilePics/' + person.id + '_ProfilePic1.jpg');
    img.style.display = 'block';
    img.style.height = '100%';
    img.style.borderRadius = '10%';
    img.style.marginBottom = '5px';

    var nameHeader = document.getElementById("profileHeaderNameEnglish")
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

    var nameHeader = document.getElementById("profileMBTI")
    nameHeader.textContent = "MBTI: " + person.mbti;
}

function createPerformanceRep(person, performance) {
  // Get performance info
  var perfBuilder = {};
  var perfProperty = "";
  switch(performance){
    case videos.AUDITION:
      perfBuilder.title = "Audition Mission";
      perfBuilder.subtitle = "\"" + person.auditionPerformance.name + "\"";
      perfBuilder.videoURL = person.auditionPerformance.url;
      perfProperty = "auditionPerformance";
      break;
    case videos.CONNECT:
      perfBuilder.title = "Connect Mission";
      perfBuilder.subtitle =  "\"" + person.connectPerformance.name + "\"";
      perfBuilder.videoURL = person.connectPerformance.url;
      perfProperty = "connectPerformance";
      break;
    default:
      console.error("WARNING: Unknown performance being rendered");
      debugger;
  }

  // Get teammates
  var teammates = []
  for (let c in contestants) {
    if (contestants[c][perfProperty].id == person[perfProperty].id) {
      teammates.push(contestants[c]);
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
    if (perf.videoURL) {
      let params = new URL(perf.videoURL).searchParams
      let videoId = params.get("v")

      if (perf.videoDomId) {
        var player = new YT.Player(perf.videoDomId, {
          height: '312',
          width: '512',
          videoId: videoId,
          playerVars: {
            'playsinline': 1
          }
        });
      }
    } else {
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
