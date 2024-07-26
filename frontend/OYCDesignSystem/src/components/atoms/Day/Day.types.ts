import { DayType } from '../../../utils/dayUtils';

export interface DayProps extends React.ComponentProps<'div'> {
  type: DayType;
  year: number;
  month: number;
  day: number;
  selected?: boolean;
}
