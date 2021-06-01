import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

const formatDate = (date, formatStr = 'PP') => format(date, formatStr, { locale: ru });

export default formatDate;
