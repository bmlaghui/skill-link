export interface LogProbes {
    TestConnectionState: TestConnectionState;
    TaskExecutionStatus: TaskExecutionStatus;
    State:               State;
  }
  
  export interface State {
    Details:   Details;
    FAILED:    Details;
    SUSPENDED: Details;
  }
  
  
  export interface TaskExecutionStatus {
    OK:     Details;
    FAILED: Details;
  }
  
  export interface TestConnectionState {
    TIME_OUT:  Details;
    FAILED:    Details;
    OK:        Details;
    SUSPENDED: Details;
  }
  
  export interface Details {
    nb:         number;
    probesList: string;
  }