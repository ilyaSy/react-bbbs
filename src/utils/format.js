import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function (date, formatStr = 'PP') {
  return format(date, formatStr, { locale: ru });
}
