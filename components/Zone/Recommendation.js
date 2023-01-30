import React, { useEffect, useState } from "react";

export default function Recommendation({ subjectType, selectedSubs, data }) {
  if (subjectType === "Custom") {
    return [];
  }

  const [finalArr, setFinalArr] = useState([]);

  const olevelSubs = [
    ["2058", "2059", "3247"],
    ["2058", "2059", "3248"],
    ["1123", "3247", "5054", "5070", "5090", "4024"],
    ["1123", "3248", "5054", "5070", "5090", "4024"],
    ["1123", "3248", "5054", "5070", "4024", "4037"],
    ["1123", "3248", "5054", "5070", "4024", "4037"],
    ["1123", "3247", "5054", "5070", "5090", "4024"],
    ["1123", "3247", "5054", "5070", "4024", "4037"],
    ["1123", "3247", "5054", "5070", "4024", "4037", "2210"],
    ["1123", "3247", "2281", "7115", "7707", "4024"],
    ["1123", "3247", "2281", "7115", "7707", "4024", "4037"],
    ["1123", "3248", "2281", "7115", "7707", "4024"],
    ["1123", "3248", "2281", "7115", "7707", "4024", "4037"],
  ];

  const igcseSubs = [
    ["0493", "0448", "0539"],
    ["0470", "0460"],
    ["0500", "0625", "0620", "0478", "0606", "0580"],
    ["0510", "0625", "0620", "0478", "0606", "0580"],
    ["0511", "0625", "0620", "0478", "0606", "0580"],
    ["0472", "0625", "0620", "0478", "0606", "0580"],
    ["0500", "0625", "0620", "0610", "0607"],
    ["0510", "0625", "0620", "0610", "0607"],
    ["0511", "0625", "0620", "0610", "0607"],
    ["0472", "0625", "0620", "0610", "0607"],
    ["0500", "0455", "0450", "0452", "0607", "0606"],
    ["0510", "0455", "0450", "0452", "0607", "0606"],
    ["0511", "0455", "0450", "0452", "0607", "0606"],
    ["0472", "0455", "0450", "0452", "0607", "0606"],
    ["0500", "0455", "0450", "0452", "0580", "0606"],
    ["0510", "0455", "0450", "0452", "0580", "0606"],
    ["0511", "0455", "0450", "0452", "0580", "0606"],
    ["0472", "0455", "0450", "0452", "0580", "0606"],
  ];

  const alevelSubs = [
    ["9709", "9702", "9703", "9231"],
    ["9709", "9702", "9608", "9231"],
    ["9709", "9702", "9703", "9608"],
    ["9709", "9702", "9608"],
    ["9709", "9702", "9703"],
    ["9709", "9702", "9703", "9700"],
    ["9702", "9703", "9700"],
    ["9702", "9703", "9700", "9990"],
    ["9709", "9708", "9706", "9609", "9231"],
    ["9709", "9708", "9706", "9609"],
    ["9685", "9608", "9609"],
    ["9695", "9990", "9389", "9708", "9155"],
    ["9704", "9995", "9988"],
    ["9152", "9155", "9609"],
  ];

  //score calculator function
  const scoringFunc = (subjComb, selectedSubjects) => {
    let scoresArr = [];
    let finalscore = 0;

    for (let i = 0; i < subjComb.length; i++) {
      let score = 0;
      for (let j = 0; j < selectedSubjects.length; j++) {
        if (subjComb[i].includes(selectedSubjects[j].code)) {
          score = score + 1;
        }
      }

      finalscore = (score / subjComb[i].length) * 100;

      //key-value pair where key is the index of the subject-combination array and value is score.
      scoresArr = [...scoresArr, { key: i, score: finalscore }];
    }

    //sorts the array according to scores (high to low)
    //function to remove zero-score values
    scoresArr = scoresArr
      .filter((currVal) => {
        if (currVal.score > 0) {
          return true;
        } else {
          return false;
        }
      })
      .sort((p1, p2) =>
        p1.score < p2.score ? 1 : p1.score > p2.score ? -1 : 0
      );

    // slice the array to keep the top 8 recommendations only
    scoresArr = scoresArr.slice(0, 8);

    return scoresArr;
  };

  let recArr = [];

  //function to filter, clean, sort and map data
  const valueFindFunc = (scoresArr, subjComb, selectedSubjects) => {
    //map the subject-combination array to the scores array
    recArr = scoresArr.map((score) => subjComb[score.key]);

    //flatten the array from 2d to 1d mantaining the original order
    recArr = recArr.flat();

    //remove repeated values from the data
    recArr = [...new Set(recArr)];

    //remove selected subjects values from the data
    recArr = recArr.filter((code) => {
      const found = selectedSubjects.find((sub) => sub.code === code);
      return !found;
    });

    //map the data to the subject-combination array
    let filteredSubjectData = recArr.map((code) => {
      const foundData = data.find((data) => data.code === code);
      return foundData;
    });

    //remove undefined values from the data and slice the array to keep the top 8 recommendations only
    filteredSubjectData = filteredSubjectData
      .filter((data) => data !== undefined)
      .slice(0, 8);

    setFinalArr(filteredSubjectData);
  };

  //conditional scoring based upon subjectType
  useEffect(() => {
    if (selectedSubs.length !== 0) {
      let currentLevelSubs = [];
      if (subjectType === "Cambridge IGCSE") currentLevelSubs = igcseSubs;
      else if (subjectType === "Cambridge O Level")
        currentLevelSubs = olevelSubs;
      else if (subjectType === "Cambridge International A Level")
        currentLevelSubs = alevelSubs;
      else currentLevelSubs = [];

      console.log(subjectType);

      let currentLevelScores = scoringFunc(currentLevelSubs, selectedSubs);
      valueFindFunc(currentLevelScores, currentLevelSubs, selectedSubs);
    } else {
      setFinalArr([]);
    }
  }, [selectedSubs]);

  return finalArr;
}
