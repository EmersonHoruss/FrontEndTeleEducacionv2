export interface TextAreaInterface {
    //Associate the text with a label
    id : string;
    //Used to reference the form data afther the form is submit
    name : string;
    //Used to indicate the heigth of the text-area
    rows : number;
    //Used to indicate the width of the text-area
    cols : number;
    //as name say
    disable : boolean;
    //like a title 
    label : string;
    //as name say
    value : string;
    //as name say
    placeHolder : string;
    //to asign styles 
    ngStyle : Object;
    //to asign matform styles
    matFormStyle : Object;
}
  