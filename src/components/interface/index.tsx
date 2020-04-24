export interface Askholiday {
  reason: string,
  name: string,
  startTime: string,
  endTime: string,
  status: string,
  account: string,
  code: string,
  department: string,
  classes: string,
  nickname: string,
  id: number
}

export interface Holiday extends Array<Askholiday> {}

export interface Setuped {
  account: number,
  name: string,
  startTime: string,
  endTime: string,
  geo: string,
  attendTime: string,
  code: string,
  department: string,
  classes: string
}

export interface Setupeds extends Array<Setuped> {}

export interface Setup {
    startTime: string,
    endTime: string,
    lng: number,
    lat: number,
    code: string,
    name: string,
    geo: string,
    account: number,
    prenum: string,
    id: number,
  }
  
  export interface Setups extends Array<Setup> {}
