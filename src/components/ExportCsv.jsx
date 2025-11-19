/* eslint-disable operator-linebreak */
/* eslint-disable prefer-template */
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import { Button } from '@mui/material';
import moment from 'moment-timezone';
import arrow from '../assets/images/arrow.svg';
import { Store } from '../StoreContext';

const fileName = `Activity Log Report - ASP - ${moment().format(
  'MM DD YYYY',
)}`;
// Component
export default function ExportServiceHistory({ serviceHistory }) {
  const { admin } = Store();

  // File Type
  // eslint-disable-next-line operator-linebreak
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

  const myHeader = [
    'Service Id',
    'Client Name',
    'Tank Size',
    'Date',
    'Service Start Time',
    'Service End Time',
    'Technician Name',
    'Products',
    'Duration',
    'Notes',
  ];
  // Extension
  const fileExtension = '.xlsx';

  // Exporting
  const exportToCSV = (csvData) => {
    // Sorting
    const ws = XLSX.utils.json_to_sheet(csvData, {
      header: myHeader,
    });

    const wb = {
      Sheets: { serviceHistory: ws },
      SheetNames: ['serviceHistory'],
    };

    const excelBuffer = XLSX.write(wb, {
      bookType: 'xlsx',
      type: 'array',
    });

    const e_data = new Blob([excelBuffer], { type: fileType });

    FileSaver.saveAs(e_data, fileName + fileExtension);
  };

  // exporting excel
  const handleSubmitExcel = () => {
    const updatedserviceHistory = serviceHistory.map((item) => {
      const duration = moment.duration(
        moment(item?.completed_at).diff(moment(item?.started_at)),
      );
      console.log(
        `${duration?.hours() || 0} h ${duration?.minutes() || 0} m`,
        'du',
      );
      return {
        'Service Id': (item.serviceId || '')
          .toString()
          .padStart(4, '0'),
        'Client Name': `${item.aquarium?.client?.first_name || ''} ${
          item.aquarium?.client?.last_name || ''
        }`,
        'Tank Size': item.aquarium?.tank_details.size || '',
        // eslint-disable-next-line no-underscore-dangle
        Date: moment(item.date).format('MM-DD-YYYY'),
        'Service Start Time': moment(item.start_time)
          .tz('America/Tijuana')
          .format('hh:mm A'),
        'Service End Time': moment(item.end_time)
          .tz('America/Tijuana')
          .format('hh:mm A'),
        'Technician Name':
          item.technician.first_name +
          ' ' +
          item.technician.first_name,
        Products: item.products
          .map((i) => `${i.product.name} (${i.quantity})`)
          .join(',\r\n '),
        ...(admin.role === 'superadmin' && {
          Questions: item.checklists
            .map((i) => i.title)
            .join(',\r\n'),
          Answers: item.checklists.map((i) => i.status).join(',\r\n'),
        }),
        Duration: `${duration?.hours() || 0} h ${
          duration?.minutes() || 0
        } m`,
        Notes: item?.comment,
      };
    });

    exportToCSV(updatedserviceHistory);
  };

  // Render
  return (
    <div className="btnContainer">
      <Button
        variant="contained"
        fullWidth
        className="addAdminBtn"
        onClick={handleSubmitExcel}
      >
        Export in CSV&nbsp; &nbsp;
        <img src={arrow} alt="arrow" />
      </Button>
    </div>
  );
}
