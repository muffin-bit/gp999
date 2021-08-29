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
      perfURL: row["Signal Song Video URL"],
      rank: row["Signal Song Rank"]
    },
    this.auditionPerformance = {
      id: row["Audition Song"],
      name: row["Audition Song"],
      perfURL: row["Audition URL"],
      top9candidate: row["Audition Top 9 Candidate"],
      top9rank: row["Ep 2 Top 9 Ranking"]
    };
    this.connectPerformance = {
      id: row["Connect URL"],
      name: row["Connect Song"],
      teamNumber: row["Connect Team (1 or 2)"],
      teamName: row["Connect Team Name"],
      position: row["Connect Position"],
      perfURL: row["Connect URL"],
      fancamURL: row["Connect Fancam URL"],
      cellMates: row["New Cell Mates"],
      cellPrelimRank: row["New Cell Prelim Rank"]
    };
    this.newCell = {
      prelimRank: row["New Cell Prelim Rank"],
      finalRank: row["New Cell Final Rank"]
    };
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
