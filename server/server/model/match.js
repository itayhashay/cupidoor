const score = [0, 1, 10, 50, 250];

function match(tenantAnswers, landLordAnswers) {
  let tenantTotalScore = 0;
  let tenantScore = 0;

  let landlordTotalScore = 0;
  let landlordScore = 0;

  for (let tenantAnswer of tenantAnswers) {
    const landLordAnswer = landLordAnswers.filter((answer) => {
      return (
        answer.question._id.toString() === tenantAnswer.question._id.toString()
      );
    })[0];

    if (landLordAnswer) {
      tenantTotalScore += score[Math.max(tenantAnswer.priority - 1, 0)];
      landlordTotalScore += score[Math.max(landLordAnswer.priority - 1, 0)];

      if (landLordAnswer.answer === tenantAnswer.answer) {
        tenantScore += score[Math.max(tenantAnswer.priority - 1, 0)];
        landlordScore += score[Math.max(landLordAnswer.priority - 1, 0)];
      }
    }
  }

  console.log(tenantScore, tenantTotalScore, landlordScore, landlordTotalScore);

  let matchPercentage = Math.round(
    100 *
      Math.sqrt(
        (tenantScore / tenantTotalScore) * (landlordScore / landlordTotalScore)
      )
  );

  if (isNaN(matchPercentage)) {
    matchPercentage = 0;
  }

  console.log(matchPercentage + "%");

  return matchPercentage;
}

// function match(tenant, landlord) {
//   const tenantAnswers = tenant.answers;
//   const tenantPriorities = tenant.priority;
//   let tenantTotalScore = 0;
//   let tenantScore = 0;

//   const landLordAnswers = landlord.answers;
//   const landlordPriorities = landlord.priority;
//   let landlordTotalScore = 0;
//   let landlordScore = 0;

//   for (let i = 0; i < tenantPriorities.length; i++) {
//     tenantTotalScore += score[tenantPriorities[i] - 1];
//     landlordTotalScore += score[landlordPriorities[i] - 1];
//   }

//   for (let i = 0; i < tenantAnswers.length; i++) {
//     if (tenantAnswers[i] == landLordAnswers[i]) {
//       tenantScore += score[tenantPriorities[i] - 1];
//       landlordScore += score[landlordPriorities[i] - 1];
//     }
//   }

//   let matchPercentage = Math.round(
//     100 *
//       Math.sqrt(
//         (tenantScore / tenantTotalScore) * (landlordScore / landlordTotalScore)
//       )
//   );

//   console.log(matchPercentage + "%");

//   return matchPercentage;
// }

module.exports = match;
