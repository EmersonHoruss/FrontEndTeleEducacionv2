export interface SelectInterface {
  label: string;
  // selectedValue: string;
  // name's attribute that user can see in the display of select
  viewValue: string;
  // name's attribute that program takes when is selected an item
  itemValue: string;
  //selected item value
  selectedValue ?: string | number;
  // list of items
  items: Array<any>;
  // as name says
  enableDefaultSelectedItem: boolean;
  // as name says
  disableOptionCentering: boolean;
  // as name says
  defaultSelectedValue: string;
  ngStyle: any;
  optionsToDisable?: Array<any>;
  isAsync: boolean;
  getHttp?: any;
}
