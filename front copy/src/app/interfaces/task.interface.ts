export interface Task {
    NbCommands: number;
    States:     States;
}

export interface States {
    READY:           number;
    TO_RUN:          number;
    RUNNING:         number;
    SUCCESS:         number;
    FAILED:          number;
    UNKNOWN_TIMEOUT: number;
}
