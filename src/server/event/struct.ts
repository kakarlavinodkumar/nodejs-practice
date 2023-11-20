//Interfaces for events
export interface errorObj {
    code: number
    message: string
} 

export interface Organizer {
    name: string
}

export interface Event {
    name: string,
    date: string,        
    isOutside: boolean,
    attendees: string
    location: string,
    organizer: Organizer
}

export interface getEventsPayload {
    from: number
    until: number
    page: number
    limit: number
}

export interface getEventByIDPayload {
    id: number
}
