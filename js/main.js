"use strict";

// Parse line of csv into an object
function parseLine(row) {
    debugger;
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
    debugger;
    data.forEach(function(d) {
      // Make it show up on the page
      var markup = "<tr><td>" + d.nameEnglish + "</td><td>" + d.group + "</td><td><img <img style=\"display:block;\" width=\"100%\" height=\"100%\"src=" + d.profilePic1 + "></td></tr>";
            $("table tbody").append(markup);
    })
    return data;
}

function main() {
  // Get data
  d3.csv("https://muffin-bit.github.io/gp999/data/muffin-bit.github.io_gp999 - Profile Info.csv", parseLine, function (err, data) {
      showProfiles(data);
  });
}

main()
