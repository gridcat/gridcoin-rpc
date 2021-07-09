export interface Project {
  version: number;
  displayName: string;
  url: string;
  baseUrl: string;
  displayUrl: string;
  statsUrl: string;
  time: string;
}

export interface Projects {
  [projectName: string]: Project;
}
