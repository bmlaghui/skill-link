export interface Log {
    currentPage: number
    totalPages: number
    logs: LogData[]
  }
  
  export interface LogData {
    level: string
    message: string
    timestamp: string
  }
  