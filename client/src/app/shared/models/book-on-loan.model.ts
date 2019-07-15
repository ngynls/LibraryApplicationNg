export class BookOnLoan {
  _id?: string;
  copyId: string;
  memberId: string;
  dateIssued: Date;
  dueDate: Date;
  returnFine: number;
}
