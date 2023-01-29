import React from 'react';
import { useState, useEffect } from 'react';

export default function Recommendation(props) {

const [finalRecArr, setFinalRecArr] = useState([])
let finalArr = []


const olevelSubs = [
    [ '2058', '2059', '3247' ],
    [ '2058', '2059', '3248' ],
    [ '1123', '3247', '5054', '5070', '5090', '4024' ],
    [ '1123', '3248', '5054', '5070', '5090', '4024' ],
    [ '1123', '3248', '5054', '5070', '4024', '4037' ],
    [ '1123', '3248', '5054', '5070', '4024', '4037' ],
    [ '1123', '3247', '5054', '5070', '5090', '4024' ],
    [ '1123', '3247', '5054', '5070', '4024', '4037' ],
    ['1123', '3247','5054', '5070','4024', '4037','2210'],
    [ '1123', '3247', '2281', '7115', '7707', '4024' ],
    ['1123', '3247','2281', '7115','7707', '4024','4037'],
    [ '1123', '3248', '2281', '7115', '7707', '4024' ],
    ['1123', '3248','2281', '7115','7707', '4024','4037']
  ]

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
    ["0472", "0455", "0450", "0452", "0580", "0606"]
    ]

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
    ["9152", "9155", "9609"]
    ]



// const [subjectType, setSubjectType] = useState("");

//console.log(props.subjectType)
// console.log(props.selectedSubs)
// console.log(props.setSelectedSubs)
//console.log(props.filteredData)
// console.log(props.setFilteredData)


//score calculator function
const scoringFunc = (subjComb, selectedSubjects, scoresArr) => {

    let finalscore = 0;

    for (let i = 0; i < subjComb.length; i++) {
        let score = 0
        for (let j = 0; j<selectedSubjects.length; j++) {
            
            if ( subjComb[i].includes(selectedSubjects[j].code )) {
                score = score  + 1
            }
                    
        }
        
        finalscore = (score / subjComb[i].length) * 100
        //scoresArr[i].push(finalscore)

        //key-value pair where key is the index of the subject-combination array and value is score.
        scoresArr = [...scoresArr, {key:i, score:finalscore}]
    }
        //sorts the array according to scores (high to low)
        scoresArr = scoresArr.sort(
        (p1, p2) => (p1.score < p2.score) ? 1 : (p1.score > p2.score) ? -1 : 0);
        
        //function to remove zero-score values
        scoresArr = scoresArr.filter( (currVal) => {
            if (currVal.score > 0) {
                return true
            }
            else {
                return false
            }
        })
        
        //function to keep the top 8 recommendations only
        for (let i=0; i<scoresArr.length; i++) {
            if (scoresArr.length <= 8) {
                break
            }
            else {
                scoresArr.pop()
            }
        }
        
        return scoresArr
}


let recArr = []

//function to filter, clean, sort and map data
const valueFindFunc = (scoresArr, subjComb, selectedSubjects) => {
    for (let i=0; i<scoresArr.length; i++) {
        
        
        recArr = [...recArr, subjComb[scoresArr[i].key] ]
 
    }
    //flatten the array from 2d to 1d mantaining the original order
    recArr = recArr.flat()

    //remove repeated values from the data
    recArr = [...new Set(recArr)]
    
    //remove selected subjects values from the data
    recArr = recArr.filter(code => {
      for (let i = 0; i < selectedSubjects.length; i++) {
        if (selectedSubjects[i].code === code) {
          return false;
        }
      }
      return true;
    });

    recArr.forEach(code => {
        const foundData = props.filteredData.find(data => data.code === code);
        if (foundData) {
          //console.log(foundData.commonSubstring);
          finalArr = [...finalArr, {subject:foundData.commonSubstring,code:foundData.code}]
        }
      });

      
    return finalArr
    //console.log(recArr)
}



//conditional scoring based upon subjectType

if (props.selectedSubs.length !== 0) {
    if (props.subjectType === "Cambridge IGCSE") {

        let igcseScores = []
        igcseScores = scoringFunc(igcseSubs, props.selectedSubs, igcseScores)
        finalArr = valueFindFunc(igcseScores, igcseSubs, props.selectedSubs)
    }

    else if (props.subjectType === "Cambridge O Level" ) {
        let olevelScores = []
        olevelScores = scoringFunc(olevelSubs, props.selectedSubs, olevelScores)
        finalArr = valueFindFunc(olevelScores, olevelSubs, props.selectedSubs)
    }

    else if (props.subjectType === "Cambridge International A Level") {
        let alevelScores = []
        alevelScores = scoringFunc(alevelSubs, props.selectedSubs, alevelScores)
        finalArr = valueFindFunc(alevelScores, alevelSubs, props.selectedSubs)
    }
}

    {/**
    ERROR :
    Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, 
    but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render.
    */}
    useEffect(() => {
        setFinalRecArr(finalArr)
    }, [finalArr])

  
    return (
    <>
    {finalRecArr.map((currVal) =>
        <div key={currVal.code} className="text-yellow-400">
        <h1>{currVal.commonSubstring}</h1>
        <h1>{currVal.code}</h1>
        </div>
      )}
    
    </>
  )
}
