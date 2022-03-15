import { WeekDayInterface } from '../../interfaces/week-day-interface';
import { ButtonInterface } from '../../interfaces/button-interface';
import { DefaultButton } from '../../constants/default-button';
const days: Array<string> = ['D', 'L', 'M', 'M', 'J', 'V', 'S'];

const weekDays: Array<WeekDayInterface> = [];

days.forEach((day: string, index: number) => {
  const weekDay: WeekDayInterface = { id: index, name: day, selected: false };
  weekDays.push(weekDay);
});

const buttonRepeat: ButtonInterface = JSON.parse(JSON.stringify(DefaultButton));
buttonRepeat.text = 'Repetir';
buttonRepeat.style = { height: '100%' };

export const Constants = { weekDays, buttonRepeat };
