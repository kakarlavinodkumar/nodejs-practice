//Event service file to provide event services
import { getEvents, getEventByID, createEvent } from '../db/dbservice';
import { getNotesPayload, getEventByIDPayload, Event } from "../struct";
// import validation service
import { typeCheckService } from "../../../validation/typecheck";
// import helper functions
import { timestampToDate } from "../../event/helper";
//import errorObj for error codes
import { errorObj } from "../error"

const { parameterErr } = errorObj; 

//getEventsService to get the events
export const getEventsService = async (payload: getNotesPayload) => {
    try {
        console.log("insides the getEventsService")
        // Payload
        console.log("payload : ", payload);

        // Parameter Validation

        // Business Logic

        // DB Call
        const response:any = await getEvents();
        console.log("events : ", response);
        
        // Response
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
        const response:any = await getEventByID(id);
        console.log("events : ", response);
        
        // Response
        console.log("response : ", response);
        return {
            ...response
        }
    } catch(err) {
        throw err; 
    }
}

export const createEventService =async (event:Event) => {
    // Payload 
    const { content, title } = event;

    // Parameter Validation
    if(!content) {
        throw {
            message:"content is required",
            code : parameterErr.code
        };
    }
    if(!title) {
        throw {
            message:"title is required",
            code : parameterErr.code
        };

    }


    // Business Logic
    // if requried convert ISO date to the Epoch milli seconds
    

    // DB call
    const response =await createEvent(event);

    // Response 
    return {
        message : `Event with title ${title} created successfully` 
    };
}