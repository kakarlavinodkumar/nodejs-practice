import axios from "axios";

const {getDBConnection} = require("../src/database");
const data = require("../data/data.json");

interface Organizer {
    name: string
}

// Import the data in json format and save in database
export const importData = async () => {
    try {
        const db = getDBConnection();
        console.log("inside the importData function");
        // create organizers table
        const query = `CREATE TABLE IF NOT EXISTS notes(
            conent TEXT,
            title TEXT
        );`;
          //const query = `DROP TABLE organizers`;
          //const query = `DROP TABLE event`;

        // Execute Query
        db.run(query, async (err:any) => {
            if(err) {
               throw err;
            } 
            else {
              console.log("Table Created Successfully!!");
              let organizer_name = ''
            
              let organizers:Organizer[] = [];
              for(let event of data) { 
                const index = organizers.findIndex((organizer) => organizer.name == event.organizer.name);
                if(index == -1) {
                    organizers.push({
                        name: event.organizer.name
                    });
                    
                }
              }
              
              for(let organizer of organizers) {
                  organizer_name = organizer.name;
                  const insert_qeury = `INSERT INTO organizers (organizer_name) 
                   VALUES ('${organizer_name}')`;

                  db.run(insert_qeury, (err:any) => {
                    if(err) {
                      throw err;
                    } else {
                      console.log("organizer inserted successfully!!");
                    }
                  });
              }

              const find_query = `SELECT rowid,* FROM organizers`;
              //get the organizers data for foreign id's
              db.all(find_query, (err: any, organizer_data: any) => {
                  if(err) {
                      throw err;
                  } else {
                    console.log("data : ", organizer_data);
                    organizer_data.map((element: any) => {
                        console.log("record : ", element);
                    });           
                    // Create event table
                    const create_table_query = `CREATE TABLE IF NOT EXISTS event(
                        name TEXT,
                        location TEXT,
                        date INTEGER,
                        is_outside INTEGER,
                        attendees TEXT,
                        weather TEXT,
                        organizer INTEGER,
                        FOREIGN KEY(organizer) REFERENCES organizers(rowid)
                    );`;         
                    db.run(create_table_query, async(err: any) => {
                        if(err) {
                            throw err;
                        } else {
                            console.log("event table created successfully");
                            // insert event data
                            for(let event of data) {
                                // weather api integration
                                let weather = ''
                                if(event.isOutside) {
                                    console.log("outside event!!");
                                    const date1:any = new Date();
                                    const date2:any = new Date(event.date);
                                    const diff_time:number = Math.abs(date2 - date1);
                                    const diff_days = Math.ceil(diff_time / (1000 * 60 * 60 * 24));
                                    console.log("diffDays : ", diff_days);
                                    if(diff_days <= 7) {
                                        
                                        let city = event.location;
                                        const weather_api_end_point = `http://api.weatherapi.com/v1/forecast.json?key=026c48c727e843649d7222917221406&q=${city}&days=7&aqi=no&alerts=no`
                                        const weather_response:any =<any> await axios.get(weather_api_end_point);
                                        //console.log("weather api response : ", weather_response);
                                        const future_data = weather_response.data.forecast.forecastday;
                                        const event_date = new Date(event.date).toISOString().split('T')[0];
                                        //console.log("future data : ", future_data);
                                        const date_index = future_data?.findIndex((data:any) => data.date == event_date);
                                        console.log("date index : ", date_index);
                                        if(date_index > -1) {
                                            let weather_obj = {
                                                temperature_in_celcius: future_data[date_index].day.avgtemp_c,
                                                chance_of_rain: future_data[date_index].day.daily_chance_of_rain
                                            }
                                            weather = JSON.stringify(weather_obj);
                                            console.log("weather : ", weather);
                                        } 
                                    }    
                                }
                                
                                const date = event.date;
                                const index = organizer_data.findIndex((organizer:any) => organizer.organizer_name == event.organizer.name);
                                let organizer_id = organizer_data[index].rowid;
                                const insert_event_query =  `INSERT INTO event (name,location,date,is_outside,attendees,weather,organizer) 
                                VALUES ('${event.name}','${event.location}','${date}',${event.isOutside},'','${weather}','${organizer_id}')`;
                                db.run(insert_event_query, (err:any) => {
                                    if(err) {
                                        throw err;
                                    } else {
                                        console.log("event record added successfully!!");
                                    }
                                })
                            }
                        }
                    })
                  }
              });
            }
        })
    } catch(err) {
        throw err;
    }

}

importData()
