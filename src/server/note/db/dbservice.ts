// Event DB service to perform DB operations on events
import {getDBConnection} from "../../../database";
import { Event } from "../struct";
const db = getDBConnection();

// Get events db service to get the events
export async function getEvents() {
    console.log("inside the getEvents DB service");
    let query = `SELECT content, title FROM note`;
    // query = query + ` LIMIT ${limit} OFFSET ${skip}`


    return new Promise((resolve, reject) => {
        db.all(query, (err: any, data: any) => {
            if(err) {
                return reject(err);
            } else {
                console.log("data : ", data);
                return resolve(data);
            }
        });    
    })
}
// Get event by id db service to get the event
export async function getEventByID(id:number) {
    console.log("inside the getEventBYID DB service");
    let query = `SELECT content, title FROM note WHERE note.id = ${id}`;

    return new Promise((resolve, reject) => {
        db.all(query, (err: any, data: any) => {
            if(err) {
                return reject(err);
            } else {
                console.log("data : ", data);
                return resolve(data);
            }
        });    
    })
}

// Create Event
export async function createEvent(event:Event) {
    const insert_event_query =  `INSERT INTO note (content,title) 
        VALUES ('${event.content}','${event.title}')`;
    const create_table_query = `CREATE TABLE IF NOT EXISTS note(
        content TEXT,
        title TEXT
    );`;
    return new Promise((resolve, reject)=> {
        db.run(create_table_query, (err: any) => {
            if(err) {
                console.log("error : ", err);
                return reject(err);
            } 
            else {
                db.run(insert_event_query, (err:any) => {
                    if(err) {
                        console.log("error : ", err);
                       return reject(err);
                    } else {
                        console.log("event record added successfully!!");
                        return resolve("success");
                    }
                });    
            }
        })

    });
    
}