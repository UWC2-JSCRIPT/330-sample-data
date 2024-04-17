const _ = require("lodash");
const MongoClient = require("mongodb").MongoClient;

function randomDate() {
  const start = new Date(2010, 0, 1);
  const end = new Date();
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );
}

function randomTransaction(userId) {
  const date = randomDate();
  return {
    date,
    charge: _.random(-1000, 1000),
    userId,
  };
}

const dbName = "330-sample-data";
const url = "mongodb://127.0.0.1:27017";

MongoClient.connect(url)
  .then(async (client) => {
    const db = client.db(dbName);
    for (let i = 0; i < 200000; i++) {
      const numTransactions = _.random(0, 20);
      await db.collection("users").insertOne({
        name: `User ${_.random(1, 100)} ${i}`,
        userId: String(i),
        settings: {
          useDarkMode: Math.random() > 0.5,
          language: Math.random() > 0.75 ? "spanish" : "english",
        },
        contact: {
          email: "user_" + i + "@gmail.com",
        },
      });
      await db
        .collection("transactions")
        .insertMany(
          _.times(numTransactions + 1, () => randomTransaction(String(i)))
        );
    }

    client.close();
  })
  .catch((e) => console.error(e))
  .finally(() => {
    console.log("Script completed");
    process.exit(0);
  });
