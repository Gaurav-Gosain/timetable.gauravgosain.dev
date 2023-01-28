import React from 'react';

export default function Recommendation(props) {

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

console.log(props.subjectType)
// console.log(props.selectedSubs)
// console.log(props.setSelectedSubs)
// console.log(props.filteredData)
// console.log(props.setFilteredData)


//score calculator function
const scoringFunc = (subjComb, selectedSubjects, scoresArr) => {

    let finalscore = 0;

    for (i = 0; i < subjComb.length; i++) {
        let score = 0
        for (j = 0; j<selectedSubjects.length; j++) {
            
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
        return scoresArr
}

//conditional scoring based upon subjectType
if (props.subjectType === "Cambridge IGCSE") {
    let igcseScores = []
    scoringFunc(igcseSubs, props.selectedSubjects, igcseScores)
}

else if (props.subjectType === "Cambridge O Level" ) {
    let olevelScores = []
    scoringFunc(olevelSubs, props.selectedSubjects, olevelScores)

}

else if (props.subjectType === "Cambridge International A Level") {
    let alevelScores = []
    scoringFunc(alevelSubs, props.selectedSubjects, alevelScores)
}


  
    return (
    <>
    
    
    </>
  )
}
