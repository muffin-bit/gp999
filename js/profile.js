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
    person.profilePic1 = row["Profile Pic 1"];
    person.birthday = row["Birthday"];
    person.mbti = row["MBTI"];
    return person;
}

function showProfile(data, girlId) {
  data.forEach(function(d) {
    if (d.id == girlId) {
      createProfileHeaderForPerson(d)
    }
  })
}

function createProfileHeaderForPerson(person) {
    var img = document.getElementById("profileHeaderImage")
    img.setAttribute('src', 'img/ProfilePics/' + person.id + '_ProfilePic1.jpg');
    img.style.display = 'block';
    img.style.width = '100%';
    img.style.borderRadius = '10%';
    img.style.marginBottom = '5px';

    var nameHeader = document.getElementById("profileHeaderNameEnglish")
    nameHeader.textContent = person.nameEnglish;

    var nameHeader = document.getElementById("profileHeaderNameChinese")
    nameHeader.textContent = person.nameChinese;

    var nameHeader = document.getElementById("profileHeaderNameKorean")
    nameHeader.textContent = person.nameKorean;

    var nameHeader = document.getElementById("profileHeaderNameJapanese")
    nameHeader.textContent = person.nameJapanese;

    var nameHeader = document.getElementById("profileGroupText")
    nameHeader.textContent = person.group;

    var nameHeader = document.getElementById("profileBirthday")
    nameHeader.textContent = "BIRTHDAY: " + person.birthday;

    var nameHeader = document.getElementById("profileMBTI")
    nameHeader.textContent = "MBTI: " + person.mbti;
}

function getIdQueryParam() {
  var urlParams = new URLSearchParams(window.location.search)
  return urlParams.get('id')
}

function main() {
  // Get data
  var girlId = getIdQueryParam();
  d3.csv("https://muffin-bit.github.io/gp999/data.csv", parseLine, function (err, data) {
      showProfile(data, girlId);
  });
}

main()
