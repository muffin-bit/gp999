"use strict";

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
    this.mbti = row["MBTI"];
    this.auditionPerformance = {
      name: row["Audition Song"],
      url: row["Audition Performance URL"],
      top9candidate: row["Audition Top 9 Candidate"],
      top9rank: row["Ep 2 Top 9 Ranking"]
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
    imageCropDiv.style.backgroundPosition = '55% 25%';
    imageCropDiv.style.backgroundSize = '160%';

    // imageCropDiv.appendChild(img);
    var a = document.createElement('a');
    a.href = 'profile.html?id=' + this.id
    a.style.marginBottom = '8px';
    a.appendChild(imageCropDiv)
    div.appendChild(a);

    var nameEnglish = document.createElement('h3');
    nameEnglish.textContent = this.nameEnglish;
    nameEnglish.style.textAlign = 'center';
    nameEnglish.style.marginBottom = '5px';
    div.appendChild(nameEnglish);

    return div;
  }
}
