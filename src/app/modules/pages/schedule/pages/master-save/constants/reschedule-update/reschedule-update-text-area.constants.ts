import { DefaultTextArea } from "src/app/modules/shared/constants/default-text-area";
import { TextAreaInterface } from "src/app/modules/shared/interfaces/text-area-interface";

const textAreaLink: TextAreaInterface = JSON.parse(JSON.stringify(DefaultTextArea));
textAreaLink.name = 'textArea';
textAreaLink.id = 'textArea';
textAreaLink.value = 'https://books.google.com.pe/books?id=NJAgAQAAIAAJ&pg=PA155&dq=programacion+angular&hl=es&sa=X&ved=2ahUKEwipz_fEr9b2AhWtHrkGHSwSAcwQ6AF6BAgKEAI#v=onepage&q=programacion%20angular&f=false'
textAreaLink.label = 'Link'
textAreaLink.placeHolder = 'Ingrese el link de la sesión';
textAreaLink.matFormStyle = {'margin-top':'1rem'};

export const ConstantsReUpTeAr = {
    textAreaLink
};