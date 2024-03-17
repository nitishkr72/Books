export type AUTHOR_TYPE = {
  key: string;
  name: string;
};

export type WORKS_TYPE = {
  key: string;
  title: string;
  cover_id: string;
  subject: string[];
  authors: AUTHOR_TYPE[];
};

export type FDDR_TYPE = {
  works: WORKS_TYPE[];
  authors: AUTHOR_TYPE[];
};