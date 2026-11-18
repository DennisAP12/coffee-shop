import DataTable from 'react-data-table-component';
import { customStyles } from './AdminTableStyles';
import './SalesTable.css';

const columns = [
  {
    name: 'Semana',
    selector: row => row.semana,
    sortable: true,
    width: '130px'
  },
  {
    name: 'Producto',
    selector: row => row.producto,
    sortable: true,
    grow: 2
  },
  {
    name: 'Cantidad Vendida',
    selector: row => row.cantidad,
    sortable: true,
    width: '150px',
    cell: row => <span className="sales-cell-cantidad">{Number(row.cantidad || 0)}</span>
  },
  {
    name: 'Total Venta',
    selector: row => row.total,
    sortable: true,
    width: '150px',
    cell: row => <span className="sales-cell-total">${Number(row.total || 0).toFixed(2)}</span>
  }
];

export default function SalesTable({ salesData }) {
  return (
    <div className="admin-table-section">
      <div className="section-title">
        <i className="fa-solid fa-chart-line"></i> Reporte de Ventas
      </div>
      
      <div className="table-responsive sales-table-responsive">
        <DataTable
          columns={columns}
          data={salesData}
          pagination
          paginationPerPage={10}
          paginationRowsPerPageOptions={[5, 10, 15, 20]}
          paginationComponentOptions={{
            rowsPerPageText: 'Filas por página:',
            rangeTextFrom: 'de',
            noRowsPerPage: false,
            selectAllRowsItem: false,
          }}
          highlightOnHover
          pointerOnHover
          customStyles={customStyles}
          noDataComponent={
            <div className="sales-no-data">
              No hay datos de ventas disponibles.
            </div>
          }
        />
      </div>
    </div>
  );
}
