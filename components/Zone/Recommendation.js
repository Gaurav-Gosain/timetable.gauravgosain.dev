import React from 'react'

export default function Recommendation() {

// const [subjectType, setSubjectType] = useState("");

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
if (subjectType === "Cambridge IGCSE") {
    let igcseScores = []
    scoringFunc(igcseSubs, selectedSubjects, igcseScores)
}

else if (subjectType === "Cambridge O Level" ) {
    let olevelScores = []
    scoringFunc(olevelSubs, selectedSubjects, olevelScores)

}

else if (subjectType === "Cambridge International A Level") {
    let alevelScores = []
    scoringFunc(alevelSubs, selectedSubjects, alevelScores)
}


  
    return (
    <>
    
    
    </>
  )
}
