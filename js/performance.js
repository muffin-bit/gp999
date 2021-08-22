"use strict";

export class Performance {
  constructor(title, subtitle, teammates, videoURL) {
    this.title = title;
    this.subtitle = subtitle;
    this.teammates = teammates;
    this.videoURL = videoURL;
    this.videoDomId = title + "-video";
  }

  get rep() {
    var div = document.createElement('div');
    div.className = 'performance'

    var title;
    if (this.title != "") {
      title = document.createElement('h3');
      title.textContent = this.title;
      title.style.textAlign = 'center';
      title.style.marginBottom = '5px';
      title.style.fontSize = '40';
      div.appendChild(title);
    }

    var leftAndRightSides = document.createElement('div');
    leftAndRightSides.className = 'centeredRow';

    // LEFT
    var leftSide = document.createElement('div');
    leftSide.className = 'centeredColumn';

    var subtitle;
    if (this.subtitle != "") {
      subtitle = document.createElement('h3');
      subtitle.textContent = "\"" + this.subtitle + "\"";
      subtitle.style.textAlign = 'center';
      subtitle.style.marginBottom = '5px';
      subtitle.style.fontSize = '30';
      leftSide.appendChild(subtitle);
    }

    var team;
    if (this.teammates.length > 0) {
      team = document.createElement('div');
      team.style.display = 'flex'
      for (let person of this.teammates) {
        team.appendChild(person.smallRep);
      }
      leftSide.appendChild(team)
    }

    leftAndRightSides.appendChild(leftSide);

    // RIGHT
    var rightSide = document.createElement('div')
    rightSide.className = 'centeredColumn'

    var videoPlayer;
    if (this.videoURL != "") {
      videoPlayer = document.createElement('div')
      videoPlayer.id = this.videoDomId
      videoPlayer.style.backgroundColor = "#FE0f23";
      rightSide.appendChild(videoPlayer);
    }

    leftAndRightSides.appendChild(rightSide);

    div.appendChild(leftAndRightSides);

    return div;
  }
}
