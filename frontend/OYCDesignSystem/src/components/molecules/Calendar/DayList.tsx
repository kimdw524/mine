/** @jsxImportSource @emotion/react */
import { DateData } from '../../../utils/dayUtils';
import { Day } from '../../atoms/Day';
import { tableCss } from './Calendar.style';

interface DayList {
  days: DateData[][];
  selected?: string[];
  scheduled?: string[];
  onClick: (year: number, month: number, day: number) => void;
}

const DayList = ({ days, selected = [], scheduled = [], onClick }: DayList) => {
  return (
    <table css={tableCss}>
      <tbody>
        {days.map((week, index) => {
          return (
            <tr key={index}>
              {week.map((day, index) => (
                <td key={index}>
                  <Day
                    key={`${day.month}-${day.day}`}
                    {...day}
                    scheduled={
                      scheduled.indexOf(`${day.year}-${day.month}-${day.day}`) >
                      -1
                    }
                    selected={
                      selected.indexOf(`${day.year}-${day.month}-${day.day}`) >
                      -1
                    }
                    onClick={onClick}
                  />
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DayList;
