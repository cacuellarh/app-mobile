import { CreateRecordCommand } from './EntityCommands/Common/CreateRecordCommand';
import { LoadRecords } from './EntityCommands/Common/LoadRecords';
import { SaveCurrentRecordsCommand } from './EntityCommands/Common/SaveCurrentRecordsCommand';

export const excludeCommands = [
  LoadRecords,
  SaveCurrentRecordsCommand,
  CreateRecordCommand,
];
