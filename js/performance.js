"use strict";

import * as k from './constants.js'

export class PerformanceRep {

  constructor(builder) {
    this.title = builder.title;
    this.subtitle = builder.subtitle;
    this.teammates = builder.teammates;
    this.teamName = builder.teamName;
    this.perfVideoURL = builder.perfVideoURL;
    this.fancamVideoURL = builder.fancamVideoURL;
    this.perfDomId = builder.title + "-perfVideo";
    this.fancamDomId = builder.title + "-fancamVideo";
  }

  get rep() {
    var div = document.createElement('div');
    div.className = 'performance'
    div.style.margin = k.spacingXLarge

    var leftAndRightSides = document.createElement('div');
    leftAndRightSides.className = 'centeredRow';

    // LEFT
    var leftSide = document.createElement('div');
    leftSide.className = 'centeredColumn';
    leftSide.style.marginRight = k.spacingLarge;
    leftSide.style.maxWidth = '560px';

    var title;
    if (this.title != "" && this.title !== undefined) {
      title = document.createElement('h3');
      title.textContent = this.title;
      title.style.textAlign = 'center';
      title.style.marginBottom = k.spacingSmall;
      title.style.fontSize = '50';
      leftSide.appendChild(title);
    }

    var subtitle;
    if (this.subtitle != "" && this.subtitle !== undefined) {
      subtitle = document.createElement('h3');
      subtitle.textContent = this.subtitle;
      subtitle.style.textAlign = 'center';
      subtitle.style.marginBottom = k.spacingSmall;
      subtitle.style.fontSize = '30';
      leftSide.appendChild(subtitle);
    }

    var teamName;
    if (this.teamName != "" && this.teamName !== undefined) {
      teamName = document.createElement('h3');
      teamName.textContent = "by team " + this.teamName;
      teamName.style.textAlign = 'center';
      teamName.style.marginBottom = k.spacingMedium;
      teamName.style.fontSize = '30';
      leftSide.appendChild(teamName);
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
        leftSide.style.maxWidth = '500px';
      } else if (l <= 4 || l >= 7) {
        leftSide.style.maxWidth = '560px';
      }
      leftSide.appendChild(team)
    }

    leftAndRightSides.appendChild(leftSide);

    // RIGHT
    var rightSide = document.createElement('div')
    rightSide.className = 'centeredColumn'
    rightSide.style.marginRight = k.spacingLarge;
    rightSide.style.maxWidth = '50%'

    var perfVideoPlayer;
    if (this.perfVideoURL != "" && this.perfVideoURL !== undefined) {
      perfVideoPlayer = document.createElement('div')
      perfVideoPlayer.id = this.perfDomId
      perfVideoPlayer.style.backgroundColor = "#FE0f23";
      rightSide.appendChild(perfVideoPlayer);
    }

    var fancamVideoPlayer;
    if (this.fancamVideoURL != "" && this.fancamVideoURL !== undefined) {
      fancamVideoPlayer = document.createElement('div')
      fancamVideoPlayer.id = this.fancamDomId
      fancamVideoPlayer.style.backgroundColor = "#FE0f23";
      fancamVideoPlayer.style.marginTop = k.spacingMedium;
      rightSide.appendChild(fancamVideoPlayer);
    }


    leftAndRightSides.appendChild(rightSide);

    div.appendChild(leftAndRightSides);

    return div;
  }
}
