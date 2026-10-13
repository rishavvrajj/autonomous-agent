export type MessageType = {
    id: string, 
    role: "user"|"agent"|"assistent",
    content: string,
    time: string
}