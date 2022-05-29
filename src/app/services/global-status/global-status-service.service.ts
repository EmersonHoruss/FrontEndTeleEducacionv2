import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GlobalStatusServiceService {
  globalStatus = {};

  constructor() {}

  boot() {
    this.serialize({});
  }

  clean() {
    localStorage.removeItem('GlobalStatus');
  }

  get(): any {
    return this.deserialize();
  }

  set(globalStatus: any) {
    this.serialize(globalStatus);
  }

  serialize(globalStatus: any = this.globalStatus) {
    localStorage.setItem('GlobalStatus', JSON.stringify(globalStatus));
  }

  deserialize(): any {
    const GlobalStatus: any = localStorage.getItem('GlobalStatus');
    return JSON.parse(GlobalStatus);
  }

  createEntity(entity: string): any {
    const globalStatus: any = this.deserialize();

    if (!globalStatus.hasOwnProperty(entity)) {
      globalStatus[entity] = {};
      this.serialize(globalStatus);
    }

    return globalStatus;
  }

  createOrUpdatePageOfEntity(
    entity: string,
    page: string,
    valuePage: any = {
      InitState: {},
      CurrentState: {},
      ExecutedState: { Executed: false },
    }
  ): any {
    const globalStatus: any = this.createEntity(entity);

    globalStatus[entity][page] = valuePage;

    this.serialize(globalStatus);

    return globalStatus;
  }

  deletePageOfEntity(entity: string, page: string) {
    const globalStatus: any = this.createEntity(entity);
    delete globalStatus[entity][page];

    this.serialize(globalStatus);

    return globalStatus;
  }

  existsEntity(entity: string): boolean {
    const globalStatus = this.get();
    return globalStatus.hasOwnProperty(entity);
  }

  existsPage(entity: string, page: string): boolean {
    const existsEntity = this.existsEntity(entity);

    if (existsEntity) {
      const globalStatus = this.get();
      return globalStatus[entity].hasOwnProperty(page);
    }

    return false;
  }

  // if return a null value so entity has been created
  generateDefaultPages(entity: string): any {
    const defaultPages = ['Mantenimiento', 'Nuevo', 'Actualizar', 'Recuperar'];

    let globalStatus = null;

    if (!this.existsEntity(entity)) {
      defaultPages.forEach((e: any) => {
        this.createOrUpdatePageOfEntity(entity, e);
      });
      globalStatus = 'no null uwu';
    }

    return globalStatus === null ? null : this.deserialize();
  }

  hasExecutedPage(
    entity: string,
    page: string,
    state: string = 'ExecutedSate'
  ): boolean {
    const globalStatus = this.get();
    return globalStatus[entity][page].ExecutedState.Executed;
  }

  getPage(entity: string, page: string, onString: boolean = false): any {
    const globalStatus = this.get();

    return onString
      ? JSON.stringify(globalStatus[entity][page])
      : globalStatus[entity][page];
  }

  getState(
    entity: string,
    page: string,
    state: string,
    onString: boolean = false
  ) {
    const globalStatus = this.get();

    return onString
      ? JSON.stringify(globalStatus[entity][page][state])
      : globalStatus[entity][page][state];
  }

  getStateForm(
    entity: string,
    page: string,
    state: string,
    onString: boolean = false
  ) {
    const globalStatus = this.get();

    return onString
      ? JSON.stringify(globalStatus[entity][page][state].Form)
      : globalStatus[entity][page][state].Form;
  }

  getStructurePage() {
    return {
      InitState: {},
      CurrentState: {},
      ExecutedState: { Executed: false },
    };
  }
}
