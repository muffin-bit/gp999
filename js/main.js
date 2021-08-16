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
    div.className = 'smallProfile';

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

function main() {
  // Get data
  d3.csv("https://muffin-bit.github.io/gp999/data.csv", parseLine, function (err, data) {
      showProfiles(data);
  });
}

main()
