"use strict";

import * as k from './constants.js'

export class PerformanceRep {

  constructor(builder) {
    this.title = builder.title;
    this.subtitle = builder.subtitle;
    this.teammates = builder.teammates;
    this.videoURL = builder.videoURL;
    this.videoDomId = builder.title + "-video";
  }

  get rep() {
    var div = document.createElement('div');
    div.className = 'performance'
    div.style.margin = k.spacingLarge

    var leftAndRightSides = document.createElement('div');
    leftAndRightSides.className = 'centeredRow';

    // LEFT
    var leftSide = document.createElement('div');
    leftSide.className = 'centeredColumn';
    leftSide.style.marginRight = k.spacingLarge;
    leftSide.style.maxWidth = '560px';

    var title;
    if (this.title != "") {
      title = document.createElement('h3');
      title.textContent = this.title;
      title.style.textAlign = 'center';
      title.style.marginBottom = k.spacingSmall;
      title.style.fontSize = '40';
      leftSide.appendChild(title);
    }

    var subtitle;
    if (this.subtitle != "") {
      subtitle = document.createElement('h3');
      subtitle.textContent = this.subtitle;
      subtitle.style.textAlign = 'center';
      subtitle.style.marginBottom = k.spacingMedium;
      subtitle.style.fontSize = '30';
      leftSide.appendChild(subtitle);
    }

    var team;
    if (this.teammates.length > 0) {
      team = document.createElement('div');
      team.className = 'centeredRow';
      team.style.display = 'flex'
      team.style.marginBottom = k.spacingMedium
      for (let person of this.teammates) {
        team.appendChild(person.smallRep);
      }

      let l = this.teammates.length;
      if (l in [5, 6] || l == 9) {
        team.style.flexBasis = '33.33333%';
      } else if (l <= 4 || l >= 7) {
        team.style.flexBasis = '25.0%';
      }
      leftSide.appendChild(team)
    }

    leftAndRightSides.appendChild(leftSide);

    // RIGHT
    var rightSide = document.createElement('div')
    rightSide.className = 'centeredColumn'
    rightSide.style.marginRight = k.spacingLarge;
    rightSide.style.maxWidth = '50%'

    var videoPlayer;
    videoPlayer = document.createElement('div')
    videoPlayer.id = this.videoDomId
    videoPlayer.style.backgroundColor = "#FE0f23";
    rightSide.appendChild(videoPlayer);

    leftAndRightSides.appendChild(rightSide);

    div.appendChild(leftAndRightSides);

    return div;
  }
}
