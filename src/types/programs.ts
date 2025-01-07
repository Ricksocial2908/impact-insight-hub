export interface Metric {
  label: string;
  value: string;
  goal: string;
}

export interface SubProgram {
  name: string;
  metrics: Metric[];
}

export interface Program {
  name: string;
  ytdInvestment: string;
  subPrograms: SubProgram[];
}