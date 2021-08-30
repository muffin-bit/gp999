"use strict";

// Imports
import * as k from './constants.js'

// Constants and variables

const validVotingPeriods = [];

function configureValidVotingPeriods() {
  // First elimination
  var firstVotingStart = new Date(Date.UTC(2021, 7, 1, 1)); // Thursday, August 1, 1:00am UTC+0  // Unknown, just picked a date
  var firstVotingEnd = new Date(Date.UTC(2021, 7, 28, 1)); // Thursday, August 28, 1:00am UTC+0
  validVotingPeriods.push({start: firstVotingStart, end: firstVotingEnd});
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
  votingHeaderDiv.style.marginBottom = k.spacingSmall;

  var votingHeader = document.createElement("h3");
  votingHeader.textContent = "Voting is currently";
  votingHeader.style.fontSize = '50';
  votingHeader.style.marginBottom = k.spacingSmall;
  votingHeaderDiv.appendChild(votingHeader);

  var votingOpenClosed = document.createElement("h3");
  votingOpenClosed.textContent = (isOpen ? "Open" : "Closed");
  votingOpenClosed.style.fontSize = '70';


  var votingDescription = document.getElementById("votingDescription");
  votingDescription.style.fontFamily = "DXWooriGoStd";
  votingDescription.style.lineHeight = k.spacingMedium;
  return true;
}

function main() {
  configureValidVotingPeriods();
  isVotingOpen();
  showVotingInfo();
}

main()
