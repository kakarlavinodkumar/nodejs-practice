// Event DB service to perform DB operations on events
import {getDBConnection} from "../../../database";
import { Event } from "../struct";
const db = getDBConnection();

// Get events db service to get the events
export async function getEvents(limit: number, skip: number, from?: number, until?: number) {
    console.log("inside the getEvents DB service");
    let query = `SELECT e.rowid, e.name,e.location,e.date,e.is_outside,
        e.attendees, e.organizer, o.organizer_name FROM event e 
        JOIN organizers o ON e.organizer = o.rowid 
        WHERE date >= ${from}`;
    if(until) {
        query = query + ` AND date <= ${until}`;
    }
    query = query + ` LIMIT ${limit} OFFSET ${skip}`
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
    let query = `SELECT e.rowid, e.name,e.location,e.date,
        e.is_outside,e.attendees,e.organizer,e.weather, o.organizer_name FROM event e 
        JOIN organizers o ON e.organizer = o.rowid 
        WHERE e.rowid = ${id}`;
    
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
    const weather = 'hot';
    const organizer_id = '1';
    const insert_event_query =  `INSERT INTO event (name,location,date,is_outside,attendees,weather,organizer) 
        VALUES ('${event.name}','${event.location}','${event.date}',${event.isOutside},'','${weather}','${organizer_id}')`;
    return new Promise((resolve, reject)=> {
        db.run(insert_event_query, (err:any) => {
            if(err) {
               return reject(err);
            } else {
                console.log("event record added successfully!!");
                return resolve("success");
            }
        });
    });
    
}