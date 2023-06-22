const prompt = require('prompt-sync')();
const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://vidithscbsc:nomadviahints@cluster0.yaqcztj.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const politicianSchema = new mongoose.Schema({
  name: String,
  votes: Number,
  money: Number,
});

const Politician = mongoose.model('Politician', politicianSchema);

class Party {
  constructor() {
    this.politicians = [];
  }

  async createPolitician() {
    const name = prompt("Enter the politician's name: ");
    const votes = parseInt(prompt("Enter the politician's votes: "));
    const money = parseInt(prompt("Enter the politician's money: "));

    const politician = new Politician({ name, votes, money });
    await politician.save();
    console.log('Politician created successfully!');
  }

  async readPoliticians() {
    const politicians = await Politician.find();
    console.log('All politicians:');
    politicians.forEach((politician) => {
      console.log(`Name: ${politician.name}`);
      console.log(`Votes: ${politician.votes}`);
      console.log(`Money: ${politician.money}`);
      console.log('------------');
    });
  }

  async updatePoliticianVotes() {
    const name = prompt("Enter the politician's name to update votes: ");
    const newVotes = parseInt(prompt('Enter the new vote count: '));

    const result = await Politician.updateOne({ name: name }, { votes: newVotes });

    if (result.nModified === 0) {
      console.log('Politician not found!');
    } else {
      console.log('Politician votes updated successfully!');
    }
  }

  async deletePolitician() {
    const name = prompt("Enter the politician's name to delete: ");

    const result = await Politician.deleteOne({ name: name });

    if (result.deletedCount === 0) {
      console.log('Politician not found!');
    } else {
      console.log('Politician deleted successfully!');
    }
  }

  async maxVote() {
    const maxVotePolitician = await Politician.findOne().sort('-votes');
    if (maxVotePolitician) {
      console.log('Politician with maximum votes:');
      console.log(`Name: ${maxVotePolitician.name}`);
      console.log(`Votes: ${maxVotePolitician.votes}`);
    } else {
      console.log('No politicians found!');
    }
  }

  async maxMoney() {
    const maxMoneyPolitician = await Politician.findOne().sort('-money');
    if (maxMoneyPolitician) {
      console.log('Politician with maximum money:');
      console.log(`Name: ${maxMoneyPolitician.name}`);
      console.log(`Money: ${maxMoneyPolitician.money}`);
    } else {
      console.log('No politicians found!');
    }
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

  maxVoteInMemory() {
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

  maxMoneyInMemory() {
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

async function main() {
  const party = new Party();

  console.log('--- Party Management System ---');
  console.log('1. Create politician');
  console.log('2. Read all politicians');
  console.log('3. Update politician votes');
  console.log('4. Delete politician');
  console.log('5. Calculate politician with maximum votes');
  console.log('6. Calculate politician with maximum money');
  console.log('0. Exit');

  let choice = -1;
  while (choice !== '0') {
    choice = prompt('Enter your choice (0-6): ');

    switch (choice) {
      case '1':
        await party.createPolitician();
        break;
      case '2':
        await party.readPoliticians();
        break;
      case '3':
        await party.updatePoliticianVotes();
        break;
      case '4':
        await party.deletePolitician();
        break;
      case '5':
        await party.maxVote();
        break;
      case '6':
        await party.maxMoney();
        break;
      case '0':
        console.log('Exiting...');
        break;
      default:
        console.log('Invalid choice. Please try again.');
        break;
    }

    console.log(); 
  }

  party.getInputFromUser();

  const maxVotePolitician = party.maxVoteInMemory();
  const maxMoneyPolitician = party.maxMoneyInMemory();

  console.log("Politician with maximum votes:");
  console.log(`Name: ${maxVotePolitician.name}`);
  console.log(`Votes: ${maxVotePolitician.votes}`);

  console.log("\nPolitician with maximum money:");
  console.log(`Name: ${maxMoneyPolitician.name}`);
  console.log(`Money: ${maxMoneyPolitician.money}`);

  mongoose.disconnect();
}

main();
