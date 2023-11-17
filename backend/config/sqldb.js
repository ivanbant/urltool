import "dotenv/config";
import mysql from "mysql2";

const sqlDB = mysql.createPool(
  process.env.SQL_URI ||
    'mysql://ysi325ks87qzh2hlthzs:pscale_pw_Xc6Xk92HP87gPs4CCWVRX2voglMFMICFX1LmKJ6KWpY@aws.connect.psdb.cloud/mydb?ssl={"rejectUnauthorized":true}'
);

sqlDB.on("connection", (connection) => {
  console.log(`Connected to SQL DB `.cyan.underline);
});

sqlDB.getConnection((err, connection) => {
  if (err) {
    console.error(
      `Error Connecting to SQL DB: ${err.stack}`.red.underline.bold
    );
    return;
  }
});

export default sqlDB;
