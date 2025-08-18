export interface IAddDivision {
  data: string;
  file: File;
}

export interface File {
  name: string;
  lastModified: number;
  lastModifiedDate: string;
  webkitRelativePath: string;
  size: number;
}

export interface IDivision {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}
