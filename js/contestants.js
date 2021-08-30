"use strict";

import * as k from './constants.js'

// Parse line of csv into an object
function parseLine(row) {
    var person = {};
    person.id = row["Contestant ID (internal)"];
    person.group = row["Group Association"]
    person.nameEnglish = row["Name (English)"];
    person.nameJapanese = row["Name (Japanese)"];
    person.nameChinese = row["Name (Chinese)"];
    person.nameKorean = row["Name (Korean)"];
    person.profilePic1 = row["Profile Pic 1"]
    return person;
}

function showProfiles(data) {
    data.forEach(createProfileDivForPerson)
    return data;
}

function createProfileDivForPerson(person) {
    var div = document.createElement('div');
    div.className = 'smallProfile ' + person.group + 'Group'; // Two DOM classes

    var imageCropDiv = document.createElement('div');
    imageCropDiv.className = 'smallProfileImage';
    imageCropDiv.style.backgroundImage = 'url(img/ProfilePics/' + person.id + '_ProfilePic1.jpg)'
    imageCropDiv.style.marginBottom = k.spacingTiny;

    var a = document.createElement('a');
    a.href = 'profile.html?id=' + person.id
    a.appendChild(imageCropDiv);
    div.appendChild(a);

    var namesDiv = document.createElement('div');
    namesDiv.className = "smallProfileNameDiv";
    div.appendChild(namesDiv);

    // DESKTOP
    var nameEnglishDesktop = document.createElement('h3');
    nameEnglishDesktop.className = 'contestantNameTitle desktopOnly';
    nameEnglishDesktop.textContent = person.nameEnglish;
    nameEnglishDesktop.style.marginBottom = k.spacingTiny;
    namesDiv.appendChild(nameEnglishDesktop);

    // MOBILE
    var nameEnglishMobile = document.createElement('div');
    nameEnglishMobile.className = 'contestantNameTitle mobileOnly';
    nameEnglishMobile.style.marginBottom = k.spacingTiny;

    let splitName = person.nameEnglish.split(" ");
    var namePartOneMobile = document.createElement('h3');
    namePartOneMobile.textContent = splitName[0];
    var namePartTwoMobile = document.createElement('h3');
    namePartTwoMobile.textContent = splitName[1];

    nameEnglishMobile.appendChild(namePartOneMobile);
    nameEnglishMobile.appendChild(namePartTwoMobile);

    namesDiv.appendChild(nameEnglishMobile);

    var nameKorean = document.createElement('h3');
    nameKorean.className = 'contestantNameSubtitle';
    nameKorean.textContent = person.nameKorean;
    nameKorean.style.marginBottom = k.spacingTiny;
    namesDiv.appendChild(nameKorean);

    document.getElementById("contestantsGrid").appendChild(div);
}

function setupFilters() {
  var KFilterButton = document.getElementById("KFilterButton");
  KFilterButton.addEventListener('click', filterProfilesToK);

  var JFilterButton = document.getElementById("JFilterButton");
  JFilterButton.addEventListener('click', filterProfilesToJ);

  var CFilterButton = document.getElementById("CFilterButton");
  CFilterButton.addEventListener('click', filterProfilesToC);

  var resetFilterButton = document.getElementById("resetFilterButton");
  resetFilterButton.addEventListener('click', resetFilters);
}

function filterProfilesToK() {
  filterProfiles(true, false, false);
}

function filterProfilesToJ() {
  filterProfiles(false, false, true);
}

function filterProfilesToC() {
  filterProfiles(false, true, false);
}

function filterProfiles(KGroupShowing, CGroupShowing, JGroupShowing) {
  // Update appearance of filter buttons
  var KFilterButton = document.getElementById("KFilterButton");
  KFilterButton.classList.remove("activeFilterButton");
  var CFilterButton = document.getElementById("CFilterButton");
  CFilterButton.classList.remove("activeFilterButton");
  var JFilterButton = document.getElementById("JFilterButton");
  JFilterButton.classList.remove("activeFilterButton");
  var resetFilterButton = document.getElementById("resetFilterButton");
  resetFilterButton.classList.remove("activeFilterButton");

  if (KGroupShowing && CGroupShowing && JGroupShowing) {
    resetFilterButton.className += "activeFilterButton"
  } else if (KGroupShowing) {
    KFilterButton.className += "activeFilterButton"
  } else if (CGroupShowing) {
    CFilterButton.className += "activeFilterButton"
  } else if (JGroupShowing) {
    JFilterButton.className += "activeFilterButton"
  }

  // Do the actual filtering of visible profiles
  // K Group
  var KGroupProfiles = document.getElementsByClassName("KGroup");
  for (let person of KGroupProfiles) {
    person.style.display = (KGroupShowing ? 'inline-block' : 'none');
  }

  // C Group
  var CGroupProfiles = document.getElementsByClassName("CGroup");
  for (let person of CGroupProfiles) {
    person.style.display = (CGroupShowing ? 'inline-block' : 'none');
  }

  // J Group
  var JGroupProfiles = document.getElementsByClassName("JGroup");
  for (let person of JGroupProfiles) {
    person.style.display = (JGroupShowing ? 'inline-block' : 'none');
  }
}

function resetFilters() {
  filterProfiles(true, true, true);
}

window.addEventListener("resize", function(event) {
  configurefilters();
})

function configurefilters() {
  var KFilterButton = document.getElementById("KFilterButton");
  var JFilterButton = document.getElementById("JFilterButton");
  var CFilterButton = document.getElementById("CFilterButton");
  if (document.body.clientWidth <= 800) {
    KFilterButton.textContent = "K";
    JFilterButton.textContent = "J";
    CFilterButton.textContent = "C";
  } else {
    KFilterButton.textContent = "K Group";
    JFilterButton.textContent = "J Group";
    CFilterButton.textContent = "C Group";
  }
}

function main() {
  // Get data
  d3.csv("https://muffin-bit.github.io/gp999/data.csv", parseLine, function (err, data) {
      showProfiles(data);
  });
  setupFilters();
  configurefilters();
}

main()
