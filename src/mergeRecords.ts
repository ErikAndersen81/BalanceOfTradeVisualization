import  {Record, DoubleRecord} from './types';
import recordMatch from './recordMatch';

const mergeRecords = (
    exportRecs: Array<Record>,
    importRecs: Array<Record>
  ): Array<DoubleRecord> => {
    const records: Array<DoubleRecord> = exportRecs
      .map((record) => {
        const match = importRecs.find((recordB) => recordMatch(record, recordB));
        if (!match) return null;
        return {
          ...record,
          importValue: match.Value,
          exportValue: record.Value,
        } as DoubleRecord;
      })
      .filter((x): x is DoubleRecord => x !== null);
    return records;
  };

  export default mergeRecords;