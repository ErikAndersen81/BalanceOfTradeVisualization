import {Record } from './types';

const recordMatch = (a: Record, b: Record): boolean => (
  a.ReportingEconomyCode === b.ReportingEconomyCode
);
  export default recordMatch;