//Event service file to provide event services
import { getEvents, getEventByID, createEvent } from '../db/dbservice';
import { getEventsPayload, getEventByIDPayload, Event } from "../struct";
// import validation service
import { typeCheckService } from "../../../validation/typecheck";
// import helper functions
import { timestampToDate } from "../../event/helper";
//import errorObj for error codes
import { errorObj } from "../error"

const { parameterErr } = errorObj; 

//getEventsService to get the events
export const getEventsService = async (payload:getEventsPayload) => {
    try {
        console.log("insides the getEventsService")
        // Payload
        console.log("payload : ", payload);
        let { from, until, page, limit } = payload;

        // Parameter Validation
        if(from) {
            typeCheckService(from, "number");
        }
        if(until) {
            typeCheckService(until, "number");
        }
        if(page) {
            typeCheckService(page, "number");
        }
        if(limit) {
            typeCheckService(limit, "number");
        }

        // Business Logic
        if(!from) {
            console.log("from not provided");
            from = new Date().getTime();
        }
        if(!page) {
            page = 1;
        }
        if(!limit) {
            limit = 10;
        }
        let skip = (page-1)*limit;

        // DB Call
        const events:any = await getEvents(limit, skip, from, until);
        console.log("events : ", events);
        
        // Response
        let response:any = events.map((event:any) => {
            event.attendees = event.attendees ? event.attendees.split(',') : []
            event.is_outside = event.is_outside ? true : false
            event.date = timestampToDate(event.date);
            event.organizer = {
                id: event.organizer,
                name: event.organizer_name
            }
            delete event.organizer_name
            return {
                ...event
            }
        });
        console.log("response : ", response);
        return {
            results: response
        }
    } catch(err) {
        throw err; 
    }
}

//getEventsService to get the events
export const getEventByIDService = async (payload:getEventByIDPayload) => {
    try {
        console.log("insides the getEventByIDService")
        // Payload
        console.log("payload : ", payload);
        let { id } = payload;

        // Parameter Validation
        if(!id) {
           throw {
            message: "id is required",
            code: parameterErr.code,
           }
        }
        typeCheckService(id, "number");
        
        // Business Logic
        // Nothing for this service

        // DB Call
        const events:any = await getEventByID(id);
        console.log("events : ", events);
        
        // Response
        let response:any = events.map((event:any) => {
            event.attendees = event.attendees ? event.attendees.split(',') : []
            event.is_outside = event.is_outside ? true : false
            event.date = timestampToDate(event.date);
            event.weather = event.weather ? JSON.parse(event.weather) : null;
            event.organizer = {
                id: event.organizer,
                name: event.organizer_name
            }
            delete event.organizer_name
            return {
                ...event
            }
        });
        console.log("response : ", response);
        return {
            ...response[0]
        }
    } catch(err) {
        throw err; 
    }
}

export const createEventService =async (event:Event) => {
    // Payload 
    const {name, date, isOutside, attendees, location, organizer } = event;

    // Parameter Validation
    if(!name) {
        throw {
            message:"name is required",
            code : parameterErr.code
        };
    }
    if(!date) {
        throw {
            message:"date is required",
            code : parameterErr.code
        };

    }
    if(!isOutside) {
        throw {
            message:"isOutside is required",
            code : parameterErr.code
        };
    }
    if(!attendees) {
        throw {
            message:"attendees is required",
            code : parameterErr.code
        };
    }
    if(!organizer) {
        throw {
            message:"organizer is required",
            code : parameterErr.code
        };
    }

    // Business Logic
    // if requried convert ISO date to the Epoch milli seconds
    

    // DB call
    const response =await createEvent(event);

    // Response 
    return {
        message : `Event with name ${name} created successfully` 
    };
}