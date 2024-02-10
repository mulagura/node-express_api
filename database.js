import mysql from 'mysql2';
import dotenv from 'dotenv'

// const pool = mysql.createPool({
//     host: '127.0.0.1',
//     user: 'root',
//     password: 'root',
//     database: 'notes_app',
//   }).promise();

  // env
dotenv.config();

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise();

// const result = await pool.query("select * from notes")
// console.log(result)

const result = await pool.query("select * from notes")
// const rows = result[0]
// console.log(rows)

async function getAllnotes() {
const rows = result[0];
return rows;
}

const notes = await getAllnotes();
console.log(notes);

//get all

export async function getNotes() {
    return notes;
}

// get
export async function getNote(id) {
    const [rows] = await pool.query(`
    SELECT * 
    FROM notes
    WHERE id = ?
    `, [id])
    return rows[0]
  }
  

  // insert
  export async function createNote(title, contents) {
    const [result] = await pool.query(`
    INSERT INTO notes (title, contents)
    VALUES (?, ?)
    `, [title, contents])
    const id = result.insertId;
    return getNote(id);
  }