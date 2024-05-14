import moment from "moment"

const DateFormat = (date) => {
  return date ? moment(date).format('DD-MM-YYYY') : '-'
}

export default DateFormat