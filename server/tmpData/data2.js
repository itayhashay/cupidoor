const temp = {
  tenant: {
    answers: [1, 0, 0, 1, 1],
    priority: [5, 3, 2, 4, 2], // 250 + 10 + 1 + 50 + 1 = 312
  },
  landlord: {
    answers: [0, 0, 0, 1, 1],
    priority: [5, 1, 1, 5, 1], // 250 + 0 +0 + 250 + 0 = 500
  },
  score: [0, 1, 10, 50, 250],
  // 0/250 -> 10/260 -> 11/261 -> 61/311 -> 62/312 = 20% = Landlord's score in the eyes of the tenant

  // 0/250 -> 0/250 -> 0/250 -> 250/500 -> 250/500 = 50%

  // 32% final score
};
