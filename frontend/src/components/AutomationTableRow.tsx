import { TableRow, TableCell, Typography } from '@mui/material';
import UpdateAndDeleteButtonGroup from './UpdateAndDeleteButtonGroup';
import type { AutomationGridItem } from '../models/automations';

interface AutomationTableRowProps {
  automation: AutomationGridItem;
  onOpenConfirmChangesModal: () => void;
  onOpenEditModal: (automation: AutomationGridItem) => void;
  setApplyChangesFunction: (
    func: ((obj: AutomationGridItem) => void) | null
  ) => void;
  setAutomationToChange: (automation: AutomationGridItem) => void;
}

const AutomationTableRow = ({
  automation,
  setApplyChangesFunction,
  setAutomationToChange,
  onOpenConfirmChangesModal,
  onOpenEditModal,
}: AutomationTableRowProps) => {
  return (
    <TableRow hover>

      <TableCell>
        <b>{automation.name}</b>
      </TableCell>

      <TableCell>
        {automation.status ? (
          <Typography color="green" fontStyle={'italic'} fontSize={'.6rem'}>
            Active
          </Typography>
        ) : (
          <Typography color="red" fontStyle={'italic'} fontSize={'.6rem'}>
            Inactive
          </Typography>
        )}
      </TableCell>

      <TableCell>
        <Typography fontSize={'.6rem'}>
          {`${automation.schedule.frequency} at ${new Date(automation.schedule.start_date).toLocaleTimeString()}`}
        </Typography>
      </TableCell>

      <TableCell>
        {automation.last_run.timestamp ? (
          <>
            <Typography
              fontSize={'.6rem'}
            >{`${new Date(automation.last_run.timestamp).toLocaleString()}`}</Typography>
            <Typography fontSize={'.6rem'} color={automation.last_run.status ? 'green' : 'red'}>
              {' '}
              - {automation.last_run.status ? 'Success' : 'Failed'}
            </Typography>
          </>
        ) : (
          '-'
        )}
      </TableCell>

      <TableCell>
        <Typography fontSize={'.6rem'}>
          {new Date(automation.next_run).toLocaleString()}
        </Typography>
      </TableCell>

      <TableCell>
        <UpdateAndDeleteButtonGroup
          automationObject={automation}
          setApplyChangesFunction={setApplyChangesFunction}
          setAutomationToChange={setAutomationToChange}
          onOpenConfirmChangesModal={onOpenConfirmChangesModal}
          onOpenEditModal={onOpenEditModal}
        />
      </TableCell>
    </TableRow>
  );
};

export default AutomationTableRow;
