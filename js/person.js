"use strict";

import * as k from './constants.js'

export class Person {
  constructor(row) {
    this.id = row["Contestant ID (internal)"];
    this.group = row["Group Association"]
    this.nameEnglish = row["Name (English)"];
    this.nameJapanese = row["Name (Japanese)"];
    this.nameChinese = row["Name (Chinese)"];
    this.nameKorean = row["Name (Korean)"];
    this.profilePic1 = row["Profile Pic 1"];
    this.birthday = row["Birthday"];
    this.zodiac = row["Zodiac"];
    this.mbti = row["MBTI"];
    this.heightCM = row["Height (cm)"];
    this.heightIN = row["Height (in)"];
    this.eliminated = row["Connect Eliminated Y/N/Planet Pass"] == "Y";
    this.signalSong = {
      id: row["Signal Song Video URL"],
      fancamURL: row["Signal Song Video URL"],
      rank: row["Signal Song Rank"]
    },
    this.prVideo = {
      id: row["PR Video URL"],
      fancamURL: row["PR Video URL"],
    },
    this.auditionPerformance = {
      id: row["Audition Song"],
      name: row["Audition Song"],
      perfURL: row["Audition URL"],
      top9Candidate: row["Audition Top 9 Candidate"],
      top9Rank: row["Audition Top 9 Ranking"]
    };
    this.connectPerformance = {
      id: row["Connect URL"],
      name: row["Connect Song"],
      teamNumber: row["Connect Team (1 or 2)"],
      teamName: row["Connect Team Name"],
      position: row["Connect Position"],
      perfURL: row["Connect URL"],
      fancamURL: row["Connect Fancam URL"],
      cellMates: row["Connect Cell Mates"],
      cellPrelimRank: {
        rank: row["Connect Cell Prelim Rank"],
        votesKorea: row["Connect Cell Prelim Votes (Korea)"],
        votesInternational: row["Connect Cell Prelim Votes (International)"],
        votesTotalPoints: row["Connect Cell Prelim Total Points"],

      },
      cellFinalRank: {
        rank: row["Connect Cell Final Rank"],
        votesKorea: row["Connect Cell Final Votes (Korea)"],
        votesInternational: row["Connect Cell Final Votes (International)"],
        votesTotalPoints: row["Connect Cell Final Total Points"],
        eliminated: row["Connect Eliminated Y/N/Planet Pass"]
      },
      individualFinalRank: {
        rankWithinGroup: row["Connect Individual Rank within K/J/C Group"],
        rankOverall: row["Connect Individual Top 9 Rank"],
        votesKorea: row["Connect Individual Votes Korea"],
        votesInternational: row["Connect Individual Votes International"],
        votesTotalPoints: row["Connect Individual Votes Total Points"],
      },
    };
    if (row["Combination Song"] != "" && row["Combination Song"] !== undefined) {
      this.combinationPerformance = {
        id: row["Combination Song"],
        name: row["Combination Song"],
        teamName: row["Combination Team Name"],
        songType: row["Combination Type"],
        position: row["Combination Position"],
        perfURL: row["Combination URL"],
        fancamURL: row["Combination Fancam URL"],
        prelimRank: {
          rank: row["Combination Prelim Rank"],
          votesKorea: row["Combination Prelim Votes (Korea)"],
          votesInternational: row["Combination Prelim Votes (International)"],
          votesTotalPoints: row["Combination Prelim Total Points"],

        },
        finalRank: {
          rank: row["Combination Final Rank"],
          votesKorea: row["Combination Final Votes (Korea)"],
          votesInternational: row["Combination Final Votes (International)"],
          votesTotalPoints: row["Combination Final Total Points"],
          eliminated: row["Combination Eliminated Y/N/Planet Pass"]
        }
      };
    }
    this.newCell = {
      prelimRank: row["New Cell Prelim Rank"],
      finalRank: row["New Cell Final Rank"]
    };
  }

  getSmallRep(withRanking = -1, withPoints = -1) {
    var div = document.createElement('div');
    div.className = 'smallPersonRep'
    const theID = this.id;
    div.onclick = function(){ window.location = 'profile.html?id=' + theID;};
    div.style.cursor = 'pointer';

    var imageCropDiv = document.createElement('div');
    imageCropDiv.className = 'image-cropper-circle';
    imageCropDiv.style.backgroundImage = 'url(img/ProfilePics/' + this.id + '_ProfilePic1.jpg)';
    imageCropDiv.style.backgroundSize = 'cover';
    imageCropDiv.style.backgroundRepeat = 'contain';
    imageCropDiv.style.backgroundPosition = '50% 25%';
    imageCropDiv.style.backgroundSize = '160%';
    imageCropDiv.style.marginBottom = '8px';
    div.appendChild(imageCropDiv)

    if (withRanking != -1) {
      var rankingDiv = document.createElement('div');
      rankingDiv.className = 'rankingNumber centeredRow';
      var rankingDivText = document.createElement('h3');
      rankingDivText.textContent = withRanking;
      rankingDiv.appendChild(rankingDivText);
      imageCropDiv.appendChild(rankingDiv);
    }

    var nameEnglish = document.createElement('h3');
    nameEnglish.textContent = this.nameEnglish;
    nameEnglish.style.textAlign = 'center';
    nameEnglish.style.marginBottom = k.spacingTiny;
    nameEnglish.style.height = '26px';
    div.appendChild(nameEnglish)

    if (withPoints != -1) {
      var points = document.createElement('h3');
      points.textContent = withPoints;
      points.style.textAlign = 'center';
      points.style.marginBottom = k.spacingTiny;
      points.style.fontFamily = "DXWooriGoStd";
      points.style.color = "#404040";
      // points.style.height = '30px';
      div.appendChild(points)
    }

    return div;
  }
}
