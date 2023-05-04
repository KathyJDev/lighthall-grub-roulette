

// pull both users' decisions from db as array

export const makeDecision = (firstUserDecisions, secondUserDecisions) => {
  // which decisions do they have in common
  const inCommon = firstUserDecisions.filter(value => secondUserDecisions.includes(value));
  if (inCommon.length > 0) {
    if (inCommon.length > 1) {
      return inCommon[Math.floor(Math.random() * inCommon.length)]; //select a random decision
    } else {
      return inCommon[0];
    }
  } else {
    const allDecisions = firstUserDecisions.concat(secondUserDecisions); //merge all the choices
    return allDecisions[Math.floor(Math.random() * allDecisions.length)]; //return a random choice
  }

};