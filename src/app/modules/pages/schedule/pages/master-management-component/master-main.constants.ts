import { DefaultTitlePage } from 'src/app/modules/shared/constants/default-title-page';
import { TitlePageInterface } from 'src/app/modules/shared/interfaces/title-page-interface';

const titlePage: TitlePageInterface = JSON.parse(
  JSON.stringify(DefaultTitlePage)
);
titlePage.titlePage = 'Gestionar Programación de Cursos';

export const Constants = {
  titlePage,
};
