// route file for the event api's 
import express from "express"
// import custom defined interfaces
import {errorObj} from "../struct"
// import required services only(not all)
import { getEventsService, getEventByIDService, createEventService } from '../service/eventservice'
import { getEventsPayload, getEventByIDPayload } from '../struct'
const router = express.Router();

// GET Events
router.get("/", async(req, res) => {
    try {
        console.log("inside the events api");
        // Payload 
        const payload: getEventsPayload = <any>req.query;

        // Service Call
        const response = await getEventsService(payload);

        // Response
        return res.json(response);
    } catch(err: any) {
        res.status(err.code || 400).json({message: err.message || "Error occured while getting data"});
    }
})


// GET EventByID
router.get("/:eventId", async(req, res) => {
    try {
        console.log("inside the getevent by id api");
        
        // Payload 
        const event_id = <any>req.params.eventId;
        const payload: getEventByIDPayload = {
            id: event_id
        } 

        // Service Call
        const response = await getEventByIDService(payload);

        // Response
        return res.json(response);
    } catch(err: any) {
        res.status(err.code || 400).json({message: err.message || "Error occured while getting data"});
    }
})

// router.post("/create", async(req, res) => {
//     try {
//         // Payload 
//         const payload = req.body;

//         // Service Call
//         const response = await 

//         // Response 
//         return res.json(response);
//     } catch(err: any) {
//         res.status(err.code || 400).json({message: err.message || "Unknown error occured"});
//     }
// })

router.post("/create", async(req, res) => {
    try {
        // Paylaod
        const payload = req.body;

        // Service Call
        const response = await createEventService(payload);

        // Response 

        return res.status(200).json(response);
    } catch(err: any) {
        res.status(err.code || 400).json({message: err.message || "Unknown error occured"});
    }
})

export default router;