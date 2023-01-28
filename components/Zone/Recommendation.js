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
        
        finalscore = (score / subjComb.length) * 100
        scoresArr[i].push(finalscore)
    }
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
