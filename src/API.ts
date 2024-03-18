import {FDDR_TYPE, WORKS_TYPE} from './types';

export async function getSearchedBookTitle(
  searchText: string,
): Promise<WORKS_TYPE[]> {
  const search = searchText.trim().split(' ').join('+');
  const data = await fetch(
    `https://openlibrary.org/search.json?title=${search}`,
  );
  const jsonData = await data.json();
  return jsonData.docs;
}

export async function getInitialDetails(): Promise<FDDR_TYPE> {
  const data = await fetch(
    'https://openlibrary.org/subjects/sci-fi.json?details=true',
  );

  const json_data = await data.json();

  return {
    works: json_data.works,
    authors: json_data.authors,
  };
}

export async function getBookDetail(key: string): Promise<WORKS_TYPE> {
  const data = await fetch(`https://openlibrary.org/works/${key}.json`);

  const json_data = await data.json();

  return json_data;
}
