const prompt = require('prompt-sync')();
class Politician {
  constructor(name, votes, money) {
    this.name = name;
    this.votes = votes;
    this.money = money;
  }
}

class Party {
  constructor() {
    this.politicians = [];
  }

  getInputFromUser() {
    const numPoliticians = parseInt(prompt("Enter the number of politicians:"));
  
    for (let i = 0; i < numPoliticians; i++) {
      const name = prompt(`Enter politician ${i + 1}'s name:`);
      const votes = parseInt(prompt(`Enter politician ${i + 1}'s votes:`));
      const money = parseInt(prompt(`Enter politician ${i + 1}'s money:`));
      this.politicians.push(new Politician(name, votes, money));
    }
  }


  maxVote() {
    let maxVotes = 0;
    let maxPolitician = null;

    for (let i = 0; i < this.politicians.length; i++) {
      if (this.politicians[i].votes > maxVotes) {
        maxVotes = this.politicians[i].votes;
        maxPolitician = this.politicians[i];
      }
    }

    return maxPolitician;
  }

  maxMoney() {
    let maxMoney = 0;
    let maxPolitician = null;

    for (let i = 0; i < this.politicians.length; i++) {
      if (this.politicians[i].money > maxMoney) {
        maxMoney = this.politicians[i].money;
        maxPolitician = this.politicians[i];
      }
    }

    return maxPolitician;
  }
}

function main() {
  const party = new Party();
  party.getInputFromUser();

  const maxVotePolitician = party.maxVote();
  const maxMoneyPolitician = party.maxMoney();

  console.log("Politician with maximum votes:");
  console.log(`Name: ${maxVotePolitician.name}`);
  console.log(`Votes: ${maxVotePolitician.votes}`);

  console.log("\nPolitician with maximum money:");
  console.log(`Name: ${maxMoneyPolitician.name}`);
  console.log(`Money: ${maxMoneyPolitician.money}`);
}

main();
