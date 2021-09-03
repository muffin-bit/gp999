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
    this.newCell = {
      prelimRank: row["New Cell Prelim Rank"],
      finalRank: row["New Cell Final Rank"]
    };
    if (this.nameEnglish == "Choi Yujin") {
        debugger;
    }
  }

  get smallRep() {
    var div = document.createElement('div');
    div.className = 'smallPersonRep'
    div.style.width = '140px';
    div.style.height = '140px';

    var imageCropDiv = document.createElement('div');
    imageCropDiv.className = 'image-cropper-circle'
    imageCropDiv.style.backgroundImage = 'url(img/ProfilePics/' + this.id + '_ProfilePic1.jpg)'
    imageCropDiv.style.backgroundSize = 'cover';
    imageCropDiv.style.backgroundRepeat = 'contain';
    imageCropDiv.style.backgroundPosition = '50% 25%';
    imageCropDiv.style.backgroundSize = '160%';

    var a = document.createElement('a');
    a.href = 'profile.html?id=' + this.id
    a.style.marginBottom = '8px';
    a.appendChild(imageCropDiv)
    div.appendChild(a);

    var nameEnglish = document.createElement('h3');
    nameEnglish.textContent = this.nameEnglish;
    nameEnglish.style.textAlign = 'center';
    nameEnglish.style.marginBottom = k.spacingTiny;
    div.appendChild(nameEnglish);

    return div;
  }
}
