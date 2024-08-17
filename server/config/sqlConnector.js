const sql = require('mssql');
let connectionPool = null;
const dbConfig = {
    server: process.env.SQL_SERVERNAME,
    database: process.env.SQL_DATABASENAME,
    port: parseInt(process.env.SQL_PORT),
    user: process.env.SQL_USER,
    password: process.env.SQL_PASSWORD,
    requestTimeout: 300000,
    options: {
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true,
    },
};


const connectDB = () => {
    return new Promise((res, rej)=>{
        if (!connectionPool) {
            new sql.ConnectionPool(dbConfig).connect().then(responsePool => {
                connectionPool = responsePool;
                res(connectionPool);
            }).catch(err => {
                rej(err);
            })
        } else {
            res(connectionPool);
        }
    })
}

exports.executeSqlQuery = async(queryString, inputs) => {
    connectionPool = await connectDB();
    if (!connectionPool) {
        throw new Error("SQL Down")
    }
    let req = new sql.Request(connectionPool);
    var i, currInput;
    for (i = 0; i < inputs.length; i++) {
        currInput = inputs[i];
        if (currInput.value === null || currInput.value === undefined) {
            req.input(currInput.name, currInput.value);
        } else if (currInput.type === undefined) {
            req.input(currInput.name, currInput.value);
        } else {
            req.input(currInput.name, currInput.type, currInput.value);
        }
    }
    return new Promise((res, rej)=>{
        req.query(queryString, function (err, result) {
            if (result === undefined) {
                rej(err.message);
            } else {
                res(result.recordset);
            }
        })
    })
}

exports.executeStoredProcedure = async(procedureName, inputs) => {
    try {
        connectionPool = await connectDB();
        if (!connectionPool) {
            throw new Error("SQL Down");
        }
        let request = new sql.Request(connectionPool);
        let i, currInput;
        for (i = 0; i < inputs.length; i++) {
            currInput = inputs[i];
            request.input(currInput.name, currInput.type, currInput.value)
        }
        return new Promise((res, rej)=>{
            request.execute(procedureName).then(function (results) {
                res(results.recordset);
            }).catch(function (err) {
                rej(err.message);
            });
        })
    } catch(error){
        throw new Error(error);
    }
}