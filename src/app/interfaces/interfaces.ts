interface IEncounter {
  date: string;
}

interface IIdentifier {
  type: {
    coding: {
      system: string;
      code: string;
    }[];
  };
  value: string;
}

interface IContext {
  identifier: IIdentifier;
}

interface ICode {
  coding: {
    system: string;
    code: string;
  }[];
}

interface ICondition {
  id: string;
  context: IContext;
  code: ICode;
  notes?: string;
  onset_date: string;
}

export interface IObjEncounter {
  encounter: IEncounter;
  conditions: ICondition[];
}


export interface Option {
  id: number;
  chapterNumber: number | null;
  chapterName: string;
  blockNumber: string;
  blockName: string;
  code: string;
  name: string;
  shortName: string;
  isPublic: boolean;
}

export interface Condition {
  onset_date: string;
  code: { coding: { system: string; code: string }[] };
  notes: string;
  context: { identifier: { type: { coding: { system: string; code: string }[] }; value: number } };
  id: string
}
