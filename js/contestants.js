"use strict";

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

    var img = document.createElement('img');
    img.setAttribute('src', 'img/ProfilePics/' + person.id + '_ProfilePic1.jpg');
    img.style.display = 'block';
    img.style.width = '100%';
    img.style.borderRadius = '10%';
    img.style.marginBottom = '5px';

    var a = document.createElement('a');
    a.href = 'profile.html?id=' + person.id
    a.appendChild(img)
    div.appendChild(a);

    var nameEnglish = document.createElement('h3');
    nameEnglish.textContent = person.nameEnglish;
    nameEnglish.style.textAlign = 'center';
    nameEnglish.style.marginBottom = '5px';
    div.appendChild(nameEnglish);

    var nameKorean = document.createElement('h3');
    nameKorean.textContent = person.nameKorean;
    nameKorean.style.textAlign = 'center';
    nameKorean.style.marginBottom = '5px';
    div.appendChild(nameKorean);

    document.getElementById("contestantsGrid").appendChild(div);
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

function main() {
  // Get data
  d3.csv("https://muffin-bit.github.io/gp999/data.csv", parseLine, function (err, data) {
      showProfiles(data);
  });
}

main()
