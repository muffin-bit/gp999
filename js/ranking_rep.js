"use strict";

import * as k from './constants.js'
import { Person } from './person.js';

export class RankingRep {

  constructor(builder) {
    this.members = builder.members;
    this.rank = parseInt(builder.rank);
    this.showBackground = parseInt(builder.rank);
  }

  get rep() {
    var div = document.createElement('div');
    div.className = 'cell centeredRow'
    div.style.margin = k.spacingSmall;
    div.style.marginRight = k.spacingLarge;

    // Rank
    var rankText = document.createElement('h3');
    rankText.textContent = this.rank;
    rankText.style.textAlign = 'center';
    rankText.style.fontSize = '30';
    rankText.style.width = 60;
    div.appendChild(rankText);

    // People
    var peopleDiv = document.createElement('div');
    peopleDiv.className = 'centeredRow';
    peopleDiv.className += this.showBackground ? ' RankingRepPeopleBackground' : ' RankingRepPeopleNoBackground';
    div.appendChild(peopleDiv);

    for (let person of this.members) {
      var personRep = person.smallRep;
      peopleDiv.appendChild(personRep);
    }
    return div;
  }
}
