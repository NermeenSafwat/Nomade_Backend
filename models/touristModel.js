import db from '../config/database';

// find by email function

const findTouristByEmail = (Email) =>{
     return new Promise((resolve , reject) =>{

        // the qyery that will search 
        const sql =  `SELECT * FROM Users
        WHERE Email = ?
        `;

        db.qyery(sql , [Email] , (err , result) =>{

            if(err){
                reject(err);
            }else{
                resolve(result[0]);
            }
        });
     });
};


// create a user

const createTourist = (FName , LName , Email , Password) =>{

    return new Promise((resolve , reject) =>{

        // the qyery we will need

        const sql = `
        INSERT INTO Users
        (FName, LName, Email, Password)
        VALUES (?, ?, ?, ?)
        `;

        db.qyery(sql , [FName , LName , Email , Password] , (err , result) =>{
               
             if(err){
                reject(err);
            }else{
                resolve(result[0]);;
            }
        });
    });
};