import { OpenedRowData } from "./OpenedRowData"
export class LastRowResponse {
    isOpened: boolean
    openedRowData:OpenedRowData|null
    constructor(isOpened:boolean,
        openedRowData:OpenedRowData|null ) {
      this.isOpened = isOpened
      this.openedRowData = openedRowData
    }
  }