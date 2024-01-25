export interface Probes{
    id: number,
    name: string,
    machine: string,
    tags: string,
    ip_console: string,
    test_connection_date: Date,
    test_connection_state: string,
    test_connection_code: number,
    state: string,
    task_execution_status: string
}