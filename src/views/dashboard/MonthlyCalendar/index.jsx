import React, { useEffect, useState } from 'react'
import MainCard from '../../../ui-component/cards/MainCard'
import { red, green, orange } from '@mui/material/colors';
import { TableContainer, Table, TableHead, TableRow, TableBody, TableCell } from '@mui/material';

const MonthlyCalendar = () => {
  const [listDate, setListDate] = useState([]);
  const listRooms = [
    {
      id: '1aroom',
      label: '1A'
    },
    {
      id: '1broom',
      label: '1B'
    },
    {
      id: '1croom',
      label: '1C'
    },
    {
      id: '2aroom',
      label: '2A'
    },
    {
      id: '2broom',
      label: '2B'
    }
  ];

  useEffect(() => {
    const res = [];
    for (let i = 1; i <= 31; i++) {
      res.push(i);
    }
    setListDate(res);
  }, [])

  const borderTable = '1px solid rgba(224, 224, 224, 1)';

  const setBackgroundColor = (roomId, date) => {

    if (roomId.includes('a') && date % 2 !== 0) {
      return red['500']
    }

    if (roomId.includes('b') && date % 2 === 0) {
      return green['A700']
    }

    if (roomId.includes('c') && date % 2 !== 0 && date > 5 && date < 20) {
      return orange['400']
    }

    return 'white'
  }
  
  return (
    <MainCard title="Kalender Bulanan">
      <div>

      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className="sticky-column" sx={{ minWidth: 80, border: borderTable }}>Date / Room</TableCell>
              { listDate.map(d => (
                <TableCell sx={{ minWidth: '80px', border: borderTable, textAlign: 'center' }} key={d}>{ d }</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            { listRooms.map(room => (
              <TableRow key={room.id}>
                <TableCell className="sticky-column" sx={{ minWidth: 80, border: borderTable }} color='primary' style={{ textAlign: 'center'}}>{ room.label }</TableCell>
                { listDate.map(d => (
                  <TableCell key={d} sx={{ border: borderTable, bgcolor: setBackgroundColor(room.id, d) }}>
                  </TableCell>
                )) }
              </TableRow>
            )) }
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  )
}

export default MonthlyCalendar