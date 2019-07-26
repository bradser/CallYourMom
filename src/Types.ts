// tslint:disable:max-classes-per-file
import { Contact, PhoneEntry } from 'react-native-select-contact';
import { NavigationParams } from 'react-navigation';

export class Person {
  constructor(
    public contact: Contact,
    public frequency: Frequency,
    public added: Call[],
    public removed: Call[],
    public nonCall: DateItem[],
    public note: string,
  ) {}
}

export enum Frequency {
  twice_A_Week,
  once_A_Week,
  once_Every_Two_Weeks,
  once_Every_Three_Weeks,
  once_Every_Month,
  once_Every_Two_Months,
  once_Every_Quarter_Year,
}

export const FrequencyText = [
  '2/week',
  '1 week',
  '2 weeks',
  '3 weeks',
  '1 month',
  '2 months',
  '1/4 year',
];

export interface SelectedItem {
  getLabel(): string;
  getId(): string;
}

export class Call implements SelectedItem {
  constructor(
    public dateTime: string,
    public duration: number,
    public name: string,
    public phoneNumber: string,
    public rawType: number,
    public timestamp: string,
    public type: CallType,
  ) {}

  public getLabel = () => this.dateTime;
  public getId = () => this.timestamp;
}

export enum CallType {
  INCOMING = 'INCOMING',
  OUTGOING = 'OUTGOING',
  MISSED = 'MISSED',
  UNKNOWN = 'UNKNOWN',
}

export class Found {
  constructor(public phone: PhoneEntry, public call: Call | undefined) {}
}

export type NotifyCallback = (details: object) => void;

export type GetLogCallback = () => Promise<Call[]>;

export class ViewPerson {
  constructor(
    public contact: Contact,
    public frequency: Frequency,
    public daysLeftTillCallNeeded: number,
  ) {}
}

export class CheckOutput {
  constructor(public viewPeople: ViewPerson[], public log: Call[]) {}
}

export class DetailsNavigationProps implements NavigationParams {
  constructor(public log: Call[], public contact: Contact) {}
}

export class DateItem extends Date implements SelectedItem {
  public getLabel = () => this.toDateString();
  public getId = () => this.valueOf().toString();
}
