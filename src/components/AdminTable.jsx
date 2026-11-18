import DataTable from 'react-data-table-component';
import { customStyles } from './AdminTableStyles';

export default function AdminTable({ products, searchTerm, onSearchChange, onAddProduct, onEditProduct, onDeleteProduct }) {
  
  // Definición de las columnas de la tabla
  const columns = [
    {
      name: 'Producto',
      selector: row => row.nombre,
      sortable: true,
      cell: row => (
        <div className="product-cell">
          <img src={row.imagen} alt={row.nombre} className="product-thumb" />
          <span style={{ fontWeight: 'bold' }}>{row.nombre}</span>
        </div>
      ),
      grow: 2,
    },
    {
      name: 'Categoría',
      selector: row => row.category,
      sortable: true,
      cell: row => (
        <span className={`badge-category badge-${row.category}`}>
          {row.category}
        </span>
      ),
    },
    {
      name: 'Precio',
      selector: row => row.precio,
      sortable: true,
      cell: row => <span style={{ fontWeight: 'bold' }}>${Number(row.precio || 0).toFixed(2)} MXN</span>,
    },
    {
      name: 'Stock',
      selector: row => row.stock,
      sortable: true,
      cell: row => (
        <span className={`badge-stock ${Number(row.stock) <= 5 ? 'stock-low' : 'stock-high'}`}>
          {Number(row.stock || 0)} unidades
        </span>
      )
    },

    {
      name: 'Acciones',
      cell: row => (
        <div className="action-buttons">
          <button className="btn-icon btn-edit" title="Editar" onClick={() => onEditProduct(row)}>
            <i className="fa-solid fa-pen-to-square"></i>
          </button>
          <button className="btn-icon btn-delete" title="Eliminar" onClick={() => onDeleteProduct(row)}>
            <i className="fa-solid fa-trash"></i>
          </button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="admin-table-section">
      <div className="section-title">
        <i className="fa-solid fa-box-open"></i> Inventario de Productos
      </div>
      
      <div className="table-controls">
        <div className="search-bar">
          <i className="fa-solid fa-magnifying-glass"></i>
          <input 
            type="text" 
            placeholder="Buscar producto por nombre o categoría..." 
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <button className="btn-add-product" onClick={onAddProduct}>
          <i className="fa-solid fa-plus"></i> Nuevo Producto
        </button>
      </div>

      <div className="table-responsive" style={{ border: '1px solid var(--color-border-gray)', borderRadius: '8px', overflow: 'hidden' }}>
        <DataTable
          columns={columns}
          data={products}
          pagination
          paginationPerPage={5}
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
            <div style={{ padding: '30px', color: 'var(--color-text-light)', textAlign: 'center' }}>
              No se encontraron productos que coincidan con la búsqueda.
            </div>
          }
        />
      </div>
    </div>
  );
}
