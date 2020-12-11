export interface Message {
  type: MsgType;
  text: string;
  expiration: number;
}

export enum MsgType {
  SUCCESS = "success", ERROR = "error"
}
