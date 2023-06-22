const prompt = require('prompt-sync')();
const { MongoClient } = require('mongodb');

class Politician {
  constructor(name, votes, money) {
    this.name = name;
    this.votes = votes;
    this.money = money;
  }
}

class Party {
  constructor() {
    this.connectionString = "mongodb+srv://vidithscbsc:nomadviahints@cluster0.yaqcztj.mongodb.net/?retryWrites=true&w=majority";
    this.dbName = 'politician';
    this.collectionName = 'politician';
  }

  async connect() {
    this.client = await MongoClient.connect(this.connectionString);
    this.db = this.client.db('politician');
    this.collection = this.db.collection('politician');
  }

  async disconnect() {
    await this.client.close();
  }

  async createPolitician() {
    const name = prompt("Enter the politician's name: ");
    const votes = parseInt(prompt("Enter the politician's votes: "));
    const money = parseInt(prompt("Enter the politician's money: "));
    const politician = new Politician(name, votes, money);
    await this.collection.insertOne(politician);
    console.log('Politician created successfully!');
  }

  async readPoliticians() {
    const politicians = await this.collection.find().toArray();
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

    const result = await this.collection.updateOne(
      { name: name },
      { $set: { votes: newVotes } }
    );

    if (result.matchedCount === 0) {
      console.log('Politician not found!');
    } else {
      console.log('Politician votes updated successfully!');
    }
  }

  async deletePolitician() {
    const name = prompt("Enter the politician's name to delete: ");

    const result = await this.collection.deleteOne({ name: name });

    if (result.deletedCount === 0) {
      console.log('Politician not found!');
    } else {
      console.log('Politician deleted successfully!');
    }
  }

  getInputFromUser() {
    const numPoliticians = parseInt(prompt("Enter the number of politicians:"));
  
    for (let i = 0; i < numPoliticians; i++) {
      const name = prompt(`Enter politician ${i + 1}'s name:`);
      const votes = parseInt(prompt(`Enter politician ${i + 1}'s votes:`));
      const money = parseInt(prompt(`Enter politician ${i + 1}'s money:`));
      this.createPolitician(new Politician(name, votes, money));
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

async function main() {
  const party = new Party();
  await party.connect();

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
        console.log('Politician with maximum votes:');
        const maxVotePolitician = await party.collection.findOne({ votes: { $exists: true } }, { sort: { votes: -1 } });
        if (maxVotePolitician) {
          console.log(`Name: ${maxVotePolitician.name}`);
          console.log(`Votes: ${maxVotePolitician.votes}`);
        } else {
          console.log('No politicians found!');
        }
        break;
      case '6':
        console.log('Politician with maximum money:');
        const maxMoneyPolitician = await party.collection.findOne({ money: { $exists: true } }, { sort: { money: -1 } });
        if (maxMoneyPolitician) {
          console.log(`Name: ${maxMoneyPolitician.name}`);
          console.log(`Money: ${maxMoneyPolitician.money}`);
        } else {
          console.log('No politicians found!');
        }
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

  await party.disconnect();
}

main();
