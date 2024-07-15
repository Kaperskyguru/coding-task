const users = [
  {
    name: "Jakob",
    gender: "Male",
    age: 32,
  },

  {
    name: "Mary",
    age: 28,
    gender: "female",
  },

  {
    name: "Niko",
    gender: "Male",
    age: 29,
  },

  {
    name: "Jane",
    gender: "Female",
    age: 35,
  },
];

const friendsList = [
  {
    Jakob: "Niko",
  },

  {
    Niko: "Jane",
  },
];

const interestList = [
  {
    Dancing: ["Niko", "Mary"],
  },

  {
    Chess: ["Jakob", "Jane", "Mary"],
  },
  {
    Football: ["Jane", "Mary", "Jakob"],
  },
];

function register(user) {
  if (!user.name) throw new Error("Name field is required");
  if (!user.gender) throw new Error("Gender field is required");
  if (!user.age) throw new Error("Age field is required");

  users.push(user);

  return {
    message: "User created successfully",
    user,
  };
}
function addFriend(userName, friendName) {
  // get the Friend user
  const friend = users.find((user) => user.name == friendName);
  // Get the User
  const user = users.find((user) => user.name == userName);
  // Add it friendsList
  friendsList.push({
    [user.name]: friend.name,
  });
}

function recommend(userName, interest) {
  const user = users.find((user) => user.name == userName);
  if (!user) return [];

  const recommendedFriends = new Set();
  for (let friendName of friendsList) {
    const friend = users.find((user) => user.name == friendName);

    for (let user of users) {
      if (user.name !== friend?.name) {
        if (hasInterest(user.name, userName, interest)) {
          if (user?.name !== userName) recommendedFriends.add(user.name);
        }
      }
    }
  }
  return recommendedFriends;
}

function hasInterest(user1, user2, interest) {
  for (let interests of interestList) {
    if (
      interests[interest]?.includes(user1) &&
      interests[interest]?.includes(user2)
    ) {
      return true;
    }
  }
  return false;
}

console.log(recommend("Jakob", "Chess"));
