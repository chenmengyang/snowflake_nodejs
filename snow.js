let snowflake = require("snowflake-sdk");
let credential = require("./key.json")
let connection = snowflake.createConnection({
  account: credential.account,
  username: credential.username,
  password: credential.password,
  database: "sf_tuts",
  schema: "public",
  warehouse: "sf_tuts_wh",
});

let connect = (cnn) => cnn.connect((err, conn) => {
  if (err) {
    console.error('Unable to connect: ' + err.message);
  } else {
    console.log('Successfully connected as id: ' + cnn.getId());
  }
});

// let exec = (cnn) => cnn.execute({
//     sqlText: 'select * from emp_basic',
//     complete: (err, stmt, rows) => {
//         if (err) {
//         console.error('Failed to execute statement due to the following error: ' + err.message);
//         } else {
//         console.log('Successfully got ' + rows.length + ' rows of records.');
//         }
//     }
// });

let exec = (cnn) => new Promise((resolve, reject) => {
    cnn.execute({
        sqlText: 'select * from emp_basic',
        complete: (err, stmt, rows) => {
            if (err) {
                console.error('Failed to execute statement due to the following error: ' + err.message);
                reject(err);
            } else {
                console.log('Successfully got ' + rows.length + ' rows of records.');
                resolve();
            }
        }
    })
})

let disconnect = (cnn) => cnn.destroy((err, conn) => {
    if (err) {
      console.error('Unable to disconnect: ' + err.message);
    } else {
      console.log('Disconnected connection with id: ' + cnn.getId());
    }
});

const main = async () => {
    connect(connection);
    await exec(connection);
    disconnect(connection);
}

main();