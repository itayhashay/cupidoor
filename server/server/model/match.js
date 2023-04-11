const score = [0, 1, 10, 50, 250];

function match(tenant, landlord) {
  const tenantAnswers = tenant.answers;
  const tenantPriorities = tenant.priority;
  let tenantTotalScore = 0;
  let tenantScore = 0;

  const landlordAnswers = landlord.answers;
  const landlordPriorities = landlord.priority;
  let landlordTotalScore = 0;
  let landlordScore = 0;

  for (let i = 0; i < tenantPriorities.length; i++) {
    tenantTotalScore += score[tenantPriorities[i] - 1];
    landlordTotalScore += score[landlordPriorities[i] - 1];
  }

  for (let i = 0; i < tenantAnswers.length; i++) {
    if (tenantAnswers[i] == landlordAnswers[i]) {
      tenantScore += score[tenantPriorities[i] - 1];
      landlordScore += score[landlordPriorities[i] - 1];
    }
  }

  let matchPercentage = Math.round(
    100 *
      Math.sqrt(
        (tenantScore / tenantTotalScore) * (landlordScore / landlordTotalScore)
      )
  );

  console.log(matchPercentage + "%");

  return matchPercentage;
}

module.exports = match;
