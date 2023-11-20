//Master routing file to route all the api's
import express from "express"
import eventRoute from "./event/api/route";
import noteRoute from "./note/api/route";
const router = express.Router();

//Authorization check for event api's
// app.use("/event", isAuthorized)
// routing for event api's
router.use("/events", eventRoute);
router.use("/note", noteRoute);

// router.use("/another_route", anotherRoute); 

export default router;