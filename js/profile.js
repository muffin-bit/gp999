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

function showProfile(data, girlId) {
    data.forEach(function(d) {
      if (d.id == girlId) {
        var markup = "<tr><td>" + d.nameEnglish + "</td><td>" + d.group + "</td><td><a href='profile.html?id=" + d.id + "'><img <img style=\"display:block;\" width=\"100%\" height=\"100%\"src=img/ProfilePics/" + d.id + "_ProfilePic1.jpg></a></td></tr>";
        $("table tbody").append(markup);
      }
    })
    return data;
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
