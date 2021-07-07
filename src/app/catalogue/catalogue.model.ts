export enum Status {
  Read = 'Read',
  ReadLater = 'ReadLater',
}

export enum WhenToRead {
  Tomorrow = 'Tomorrow',
  ThisWeek = 'ThisWeek',
  ThisMonth = 'ThisMonth',
  ThisYear = 'ThisYear',
}

export interface WhenToReadSelect {
  label: string;
  value: WhenToRead;
}

export const WHEN_TO_READ: WhenToReadSelect[] = [
  {
    label: 'catalogue.add_book.whenToRead.TOMORROW',
    value: WhenToRead.Tomorrow,
  },
  {
    label: 'catalogue.add_book.whenToRead.THIS_WEEK',
    value: WhenToRead.ThisWeek,
  },
  {
    label: 'catalogue.add_book.whenToRead.THIS_MONTH',
    value: WhenToRead.ThisMonth,
  },
  {
    label: 'catalogue.add_book.whenToRead.THIS_YEAR',
    value: WhenToRead.ThisYear,
  },
];

export const RATINGS = [1, 2, 3, 4, 5];

export interface BookBody {
  title: string;
  uid: string;
  rating: number;
  review: string;
  status: Status;
  whenToRead: WhenToRead;
}
