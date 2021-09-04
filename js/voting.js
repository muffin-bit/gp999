"use strict";

// Imports
import * as k from './constants.js'

// Constants and variables

const validVotingPeriods = [];

function configureValidVotingPeriods() {
  // First elimination
  validVotingPeriods.push({
    start: new Date(Date.UTC(2021, 7, 1, 1)), // Thursday, August 1, 1:00am UTC+0  // Unknown, just picked a date
    end: new Date(Date.UTC(2021, 7, 28, 1)) // Thursday, August 28, 1:00am UTC+0
  });
  // Second elimination
  validVotingPeriods.push({
    start: new Date(Date.UTC(2021, 7, 1, 1)), // Thursday, August 1, 1:00am UTC+0  // Unknown, just picked a date
    end: new Date(Date.UTC(2021, 9, 18, 1)) // Thursday, September 18, 1:00am UTC+0
  });
}

// Generate visual elements
function isVotingOpen() {
  var currentDate = new Date();
  for (let dateRange of validVotingPeriods) {
    if (currentDate >= dateRange.start && currentDate < dateRange.end) {
      return true;
    }
  }
  return false;
}

function showVotingInfo() {
  var isOpen = isVotingOpen();

  var votingHeaderDiv = document.getElementById("votingHeaderDiv");
  votingHeaderDiv.style.padding = k.spacingMedium;
  votingHeaderDiv.style.borderStyle = 'solid';
  votingHeaderDiv.style.borderRadius = '20px';
  votingHeaderDiv.style.marginBottom = k.spacingMedium;

  var votingHeader = document.createElement("h3");
  votingHeader.className = "mediumText";
  votingHeader.textContent = "Voting is currently";
  votingHeader.style.textAlign = 'center';
  votingHeader.style.marginBottom = k.spacingMedium;
  votingHeader.style.marginTop = k.spacingSmall;
  votingHeaderDiv.appendChild(votingHeader);

  var votingOpenClosed = document.createElement("h3");
  votingOpenClosed.className = "largeText";
  votingOpenClosed.textContent = (isOpen ? "Open" : "Closed");
  votingOpenClosed.style.textAlign = 'center';
  votingHeaderDiv.appendChild(votingOpenClosed);

  // var votingDescription = document.getElementById("votingDescription");
  // votingDescription.style.lineHeight = k.psacingMedium;
  return true;
}

function main() {
  configureValidVotingPeriods();
  isVotingOpen();
  showVotingInfo();
}

main()
