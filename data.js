
// THE VALUES BELOW ARE EXAMPLES PLEASE CHANGE THEM TO YOUR IDEAL INPUT.

export const inputs = {
    uri: "mongodb://127.0.0.1:27017/your-db",
    dbName: "your-db",
    collectionName: "mongo-collection",
    connections: 10,
    duration: 1200000,
    amount: 100000000,
    pipelining: 10
};

export const dataForInsertaion = {
    name: "hossein",
    family: "khodabandeh ",
    age: 23,
    timestamp: new Date(),
};

export const findOneQuery = { age: 23 };