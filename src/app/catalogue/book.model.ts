import { BookBody } from './catalogue.model';

export interface Pdf {
  isAvailable: boolean;
}

export interface AccessInfo {
  country: string;
  pdf: Pdf;
  webReaderLink: string;
}

export interface VolumeInfo {
  title: string;
  authors: Array<string>[];
  publisher: string;
  publishedDate: Date;
  description: string;
  printType: string;
  pageCount: number;
  contentVersion: string;
  language: string;
  previewLink: string;
  categories: string[];
  imageLinks: {
    thumbnail: string;
    smallThumbnail: string;
  };
}

export type BookWithId = BookBody & { id: string};

export interface SaleInfo {
  buyLink: string;
  isEbook: boolean;
  saleability: string;
}

export interface Book {
  id: string;
  accessInfo: {
    country: Country[];
    pdf: Pdf;
    webReaderLink: string;
  };
  textSnippet: string;
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
}

export interface BookResult {
  items: Array<BookData>;
}

export interface BookData {
  id: string;
  accessInfo: AccessInfo;
  searchInfo: {
    textSnippet: string;
  };
  volumeInfo: VolumeInfo;
  saleInfo: SaleInfo;
}

export interface Country {
  code: string;
  population: number;
}

export interface CountryResult {
  alpha2Code: string;
  population: number;
}

export interface BookListItem {
  data: BookWithId;
  book: BookData;
}
