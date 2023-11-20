//Interfaces for events
export interface errorObj {
    code: number
    message: string
} 

export interface Organizer {
    name: string
}

export interface Event {
    content: string
    title: string
}

export interface getNotesPayload {
}

export interface getEventByIDPayload {
    id: number
}
