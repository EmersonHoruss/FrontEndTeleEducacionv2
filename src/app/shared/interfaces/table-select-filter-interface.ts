import { ButtonInterface } from "./button-interface";

export interface TableSelectFilterInterface {
    // Name of the search input label
    searchLabel: string;
    // Name of the search input place holder
    searchPlaceHolder: string;
    // Button to list when the start date and end date are enter
    buttonList: ButtonInterface;
    // as name says
    tableTitle: string;
    // Name of the table columns
    columns: Array<string>;
    // Information will be put in the rows
    dataSource: Array<any>;
    //Buttons of the Actions
    buttonsActions : Array<ButtonInterface>;
    // as name says
    ngStyle: any;
    //Interface will be use to search 
    complete: boolean;
  }
  