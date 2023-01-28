import React from 'react';

export default function Recommendation(props) {

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
