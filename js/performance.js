"use strict";

import * as k from './constants.js'
import { RankingRep } from './ranking_rep.js';

export class PerformanceRep {

  constructor(builder) {
    this.title = builder.title;
    this.subtitle = builder.subtitle;
    this.teammates = builder.teammates;
    this.cells = builder.cells;
    this.teamName = builder.teamName;
    this.perfURL = builder.perfURL;
    this.fancamURL = builder.fancamURL;
    this.perfDomId = builder.title + "-perfVideo";
    this.fancamDomId = builder.title + "-fancamVideo";
  }

  get rep() {
    var div = document.createElement('div');
    div.className = 'performance'
    div.style.marginBottom = k.spacingXLarge

    var leftAndRightSides = document.createElement('div');
    leftAndRightSides.className = 'centeredRow';
    leftAndRightSides.style.alignItems = 'flex-start';

    // LEFT
    var leftSide = document.createElement('div');
    leftSide.className = 'centeredColumn performanceCard';
    // leftSide.style.marginRight = k.spacingLarge;
    // leftSide.style.maxWidth = '560px';

    var title;
    if (this.title != "" && this.title !== undefined) {
      title = document.createElement('h3');
      title.textContent = this.title;
      title.style.textAlign = 'center';
      title.style.marginBottom = k.spacingSmall;
      title.classList.add('sectionHeading');
      leftSide.appendChild(title);
    }

    var subtitle;
    if (this.subtitle != "" && this.subtitle !== undefined) {
      subtitle = document.createElement('h3');
      subtitle.textContent = this.subtitle;
      subtitle.style.textAlign = 'center';
      subtitle.style.marginBottom = k.spacingSmall;
      subtitle.style.fontFamily = "DXWooriGoStd";
      subtitle.classList.add('sectionSubHeading');
      leftSide.appendChild(subtitle);
    }

    var teamName;
    if (this.teamName != "" && this.teamName !== undefined) {
      teamName = document.createElement('h4');
      teamName.textContent = "Team: " + this.teamName;
      teamName.style.textAlign = 'center';
      teamName.style.marginBottom = k.spacingMedium;
      teamName.style.fontFamily = "DXWooriGoStd";
      teamName.classList.add('sectionSubHeading');
      leftSide.appendChild(teamName);
    }

    var team;
    if (this.teammates !== undefined && this.teammates.length > 0) {
      team = document.createElement('div');
      team.className = 'centeredRow';
      team.style.alignItems = 'flex-start';
      team.style.display = 'flex'
      team.style.marginBottom = k.spacingMedium
      for (let person of this.teammates) {
        team.appendChild(person.getSmallRep());
      }

      let l = this.teammates.length;
      if (l in [5, 6] || l == 9) {
        leftSide.style.maxWidth = '500px';
      } else if (l <= 4 || l >= 7) {
        leftSide.style.maxWidth = '560px';
      }
      leftSide.appendChild(team);
    } else if (this.cells !== undefined && Object.keys(this.cells).length > 0) {
      team = document.createElement('div');
      team.className = 'centeredColumn';
      team.style.display = 'flex'
      team.style.alignItems = 'flex-start';
      team.style.marginBottom = k.spacingMedium
      for (const [ids, people] of Object.entries(this.cells)) {
        var connectCellBuilder = {
          members: Array.from(people).sort(k.sortByCKJ()),
          rank: -1,
          showBackground: true
        }
        const connectCellRepModel = new RankingRep(connectCellBuilder);
        var connectCellRep = connectCellRepModel.rep;
        connectCellRep.style.marginBottom = k.spacingSmall;
        team.appendChild(connectCellRep);
      }
      leftSide.appendChild(team)
    }

    leftAndRightSides.appendChild(leftSide);

    // RIGHT
    var rightSide = document.createElement('div')
    rightSide.className = 'centeredColumn performanceCard'
    // rightSide.style.marginRight = k.spacingLarge;
    // rightSide.style.maxWidth = '50%'

    var perfVideoPlayer;
    if (this.perfURL != "" && this.perfURL !== undefined) {
      perfVideoPlayer = document.createElement('div')
      perfVideoPlayer.id = this.perfDomId
      perfVideoPlayer.className += "youtubeVideo";
      perfVideoPlayer.style.backgroundColor = "grey";
      rightSide.appendChild(perfVideoPlayer);
    }

    var fancamVideoPlayer;
    if (this.fancamURL != "" && this.fancamURL !== undefined) {
      fancamVideoPlayer = document.createElement('div')
      fancamVideoPlayer.id = this.fancamDomId
      fancamVideoPlayer.className += "youtubeVideo";
      fancamVideoPlayer.style.backgroundColor = "grey";
      if (perfVideoPlayer !== undefined) {
        fancamVideoPlayer.style.marginTop = k.spacingMedium;
      }
      rightSide.appendChild(fancamVideoPlayer);
    }


    leftAndRightSides.appendChild(rightSide);

    div.appendChild(leftAndRightSides);

    return div;
  }
}
