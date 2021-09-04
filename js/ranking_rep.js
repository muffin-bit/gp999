"use strict";

import * as k from './constants.js'
import { Person } from './person.js';

export class RankingRep {

  constructor(builder) {
    this.members = builder.members;
    this.rank = parseInt(builder.rank);
    this.showBackground = builder.showBackground;
  }

  get rep() {
    var div = document.createElement('div');
    div.className = 'cell centeredRow'

    // Rank
    if (this.rank != -1) { // If its -1, we won't show it at all
      var rankText = document.createElement('h3');
      rankText.id = "rankText";
      div.appendChild(rankText);
      if (!isNaN(this.rank)) { // If its NaN, we'll hold space for it
        rankText.textContent = this.rank;
      }
    }

    // People
    var peopleDiv = document.createElement('div');
    peopleDiv.className = 'centeredRow';
    peopleDiv.className += this.showBackground ? ' RankingRepPeopleBackground' : ' RankingRepPeopleNoBackground';
    div.appendChild(peopleDiv);

    for (let person of this.members) {
      var personRep = person.getSmallRep();
      peopleDiv.appendChild(personRep);
    }

    return div;
  }
}
