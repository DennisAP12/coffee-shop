import { useEffect, useMemo, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import AdminTable from '../components/AdminTable';
import AdminChart from '../components/AdminChart';
import SalesTable from '../components/SalesTable';
import FeedbackModal from '../components/FeedbackModal';
import { useAuth } from '../context/AuthContext';
import '../styles/Admin.css';

export default function Admin() {
  const { user, login } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [summary, setSummary] = useState({ ingresos: 0, productosVendidos: 0, ordenes: 0, clientes: 0, bajoStock: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [feedback, setFeedback] = useState({ isOpen: false, title: '', message: '', type: 'info' });

  const fetchAdminData = async () => {
    setLoading(true);
    setError('');
    try {
      const [productsRes, salesRes, summaryRes] = await Promise.all([
        fetch('http://localhost:3000/api/productos'),
        fetch('http://localhost:3000/api/ventas'),
        fetch('http://localhost:3000/api/ventas/resumen')
      ]);
      if (!productsRes.ok || !salesRes.ok || !summaryRes.ok) throw new Error('No fue posible cargar los datos administrativos');
      setProducts(await productsRes.json());
      setSales(await salesRes.json());
      setSummary(await summaryRes.json());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
    const refreshInterval = window.setInterval(fetchAdminData, 15000);
    const refreshOnFocus = () => {
      if (document.visibilityState === 'visible') fetchAdminData();
    };
    window.addEventListener('focus', refreshOnFocus);
    document.addEventListener('visibilitychange', refreshOnFocus);
    return () => {
      window.clearInterval(refreshInterval);
      window.removeEventListener('focus', refreshOnFocus);
      document.removeEventListener('visibilitychange', refreshOnFocus);
    };
  }, []);

  useEffect(() => {
    document.body.classList.add('admin-route-active');
    return () => document.body.classList.remove('admin-route-active');
  }, []);

  const productNames = useMemo(() => Object.fromEntries(products.map((product) => [product.id, product.nombre])), [products]);
  const filteredProducts = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    return term
      ? products.filter((product) => product.nombre.toLowerCase().includes(term) || product.category?.toLowerCase().includes(term))
      : products;
  }, [products, searchTerm]);

  const chartData = useMemo(() => [...products]
    .sort((a, b) => Number(b.ventas || 0) - Number(a.ventas || 0))
    .slice(0, 10)
    .map((product) => ({
      name: product.nombre.length > 14 ? `${product.nombre.slice(0, 14)}…` : product.nombre,
      ventas: Number(product.ventas || 0)
    })), [products]);

  const salesData = useMemo(() => {
    const grouped = new Map();
    sales.forEach((sale) => {
      const date = new Date(sale.fecha);
      const key = `${date.toLocaleDateString('es-MX')}_${sale.producto_id}`;
      const current = grouped.get(key) || {
        semana: date.toLocaleDateString('es-MX'),
        producto: productNames[sale.producto_id] || sale.producto_id,
        cantidad: 0,
        total: 0
      };
      current.cantidad += Number(sale.cantidad || 0);
      current.total += Number(sale.precio_total || 0);
      grouped.set(key, current);
    });
    return [...grouped.values()];
  }, [sales, productNames]);

  const inventoryValue = useMemo(
    () => products.reduce((total, product) => total + Number(product.precio || 0) * Number(product.stock || 0), 0),
    [products]
  );

  const openAdd = () => { setEditingProduct(null); setModalOpen(true); };
  const openEdit = (product) => { setEditingProduct(product); setModalOpen(true); };

  const deleteProduct = async (product) => {
    if (!window.confirm(`¿Eliminar "${product.nombre}" del menú?`)) return;
    try {
      const response = await fetch(`http://localhost:3000/api/productos/${product.id}`, { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'No fue posible eliminar el producto');
      setFeedback({ isOpen: true, title: 'Producto eliminado', message: `${product.nombre} ya no forma parte del inventario.`, type: 'success' });
      fetchAdminData();
    } catch (err) {
      setFeedback({ isOpen: true, title: 'No se pudo eliminar', message: err.message, type: 'error' });
    }
  };

  const exportCSV = () => {
    const rows = [['ID', 'Producto', 'Categoria', 'Precio', 'Stock', 'Ventas'], ...filteredProducts.map((product) => [
      product.id, product.nombre, product.category || '', product.precio || 0, product.stock || 0, product.ventas || 0
    ])];
    const csv = '\uFEFF' + rows.map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(',')).join('\n');
    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
    link.download = `inventario-cafe-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(link.href);
  };

  const exportPDF = async () => {
    const panel = document.querySelector('.admin-main');
    if (!panel) return;
    const canvas = await html2canvas(panel, { scale: 2, useCORS: true, backgroundColor: '#f6f8f7' });
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.setFillColor(30, 57, 50);
    pdf.rect(0, 0, 210, 24, 'F');
    pdf.setTextColor(255, 255, 255);
    pdf.setFontSize(16);
    pdf.text('Starbucks Vibes - Reporte administrativo', 10, 15);
    pdf.setTextColor(30, 57, 50);
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 30, 190, (canvas.height * 190) / canvas.width);
    pdf.save(`reporte-admin-${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  const updateProfile = async (values, helpers) => {
    try {
      const response = await fetch(`http://localhost:3000/api/auth/perfil/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('sv_token')}`
        },
        body: JSON.stringify(values)
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'No fue posible actualizar el perfil');
      login(data.user, localStorage.getItem('sv_token'));
      helpers.resetForm({ values: { ...values, password: '' } });
      setFeedback({ isOpen: true, title: 'Perfil actualizado', message: 'Tus datos fueron guardados correctamente.', type: 'success' });
    } catch (err) {
      helpers.setStatus(err.message);
    } finally {
      helpers.setSubmitting(false);
    }
  };

  if (loading) return <div className="admin-loading"><span></span><p>Cargando panel administrativo…</p></div>;
  if (error) return <div className="admin-loading admin-error"><i className="fa-solid fa-triangle-exclamation"></i><p>{error}</p><button onClick={fetchAdminData}>Reintentar</button></div>;

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-brand">
          <img src="/imagnes/logo.jpg" alt="Starbucks Vibes" />
          <div><strong>Vibes</strong><span>Administración</span></div>
        </div>
        <nav className="admin-nav" aria-label="Navegación administrativa">
          {[
            ['overview', 'fa-house', 'Resumen'],
            ['inventory', 'fa-boxes-stacked', 'Inventario'],
            ['sales', 'fa-chart-line', 'Ventas'],
            ['profile', 'fa-user-shield', 'Mi perfil']
          ].map(([tab, icon, label]) => (
            <button key={tab} className={activeTab === tab ? 'active' : ''} onClick={() => setActiveTab(tab)}>
              <i className={`fa-solid ${icon}`}></i><span>{label}</span>
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-account">
          <div className="admin-avatar">{user?.nombre?.charAt(0)?.toUpperCase() || 'A'}</div>
          <div><strong>{user?.nombre}</strong><span>Administrador</span></div>
        </div>
      </aside>

      <main className="admin-main">
        <header className="admin-topbar">
          <div>
            <span className="admin-kicker">Centro de gestión</span>
            <h1>{activeTab === 'overview' ? 'Buenos días' : activeTab === 'inventory' ? 'Inventario' : activeTab === 'sales' ? 'Ventas y rendimiento' : 'Mi perfil'}</h1>
          </div>
          <div className="admin-topbar-actions">
            <button className="admin-export" onClick={exportCSV}><i className="fa-solid fa-file-csv"></i><span>CSV</span></button>
            <button className="admin-export" onClick={exportPDF}><i className="fa-solid fa-file-pdf"></i><span>PDF</span></button>
            <button className="admin-primary" onClick={openAdd}><i className="fa-solid fa-plus"></i><span>Nuevo producto</span></button>
          </div>
        </header>

        {activeTab === 'overview' && (
          <div className="admin-content-stack">
            <section className="admin-stat-grid" aria-label="Indicadores principales">
              {[
                ['Ingresos', `$${summary.ingresos.toLocaleString('es-MX', { minimumFractionDigits: 2 })}`, 'fa-sack-dollar', 'green'],
                ['Productos vendidos', summary.productosVendidos, 'fa-mug-hot', 'blue'],
                ['Órdenes', summary.ordenes, 'fa-receipt', 'gold'],
                ['Clientes', summary.clientes, 'fa-users', 'purple']
              ].map(([label, value, icon, color]) => (
                <article className="admin-stat-card" key={label}>
                  <div className={`admin-stat-icon ${color}`}><i className={`fa-solid ${icon}`}></i></div>
                  <div><span>{label}</span><strong>{value}</strong></div>
                </article>
              ))}
            </section>

            <section className="admin-overview-grid">
              <article className="admin-panel"><div className="admin-panel-heading"><div><span>Rendimiento</span><h2>Productos más vendidos</h2></div></div><AdminChart data={chartData} /></article>
              <article className="admin-panel admin-health">
                <div className="admin-panel-heading"><div><span>Operación</span><h2>Estado del negocio</h2></div></div>
                <div className="health-row"><span>Valor del inventario</span><strong>${inventoryValue.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</strong></div>
                <div className="health-row"><span>Productos registrados</span><strong>{products.length}</strong></div>
                <div className="health-row"><span>Stock bajo (≤ 5)</span><strong className={summary.bajoStock ? 'warning' : ''}>{summary.bajoStock}</strong></div>
                <button onClick={() => setActiveTab('inventory')}>Revisar inventario <i className="fa-solid fa-arrow-right"></i></button>
              </article>
            </section>

            <SalesTable salesData={salesData.slice(0, 8)} />
          </div>
        )}

        {activeTab === 'inventory' && (
          <AdminTable
            products={filteredProducts}
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onAddProduct={openAdd}
            onEditProduct={openEdit}
            onDeleteProduct={deleteProduct}
          />
        )}

        {activeTab === 'sales' && (
          <div className="admin-content-stack">
            <section className="admin-stat-grid">
              <article className="admin-stat-card"><div className="admin-stat-icon green"><i className="fa-solid fa-sack-dollar"></i></div><div><span>Ingresos totales</span><strong>${summary.ingresos.toLocaleString('es-MX')}</strong></div></article>
              <article className="admin-stat-card"><div className="admin-stat-icon blue"><i className="fa-solid fa-basket-shopping"></i></div><div><span>Productos vendidos</span><strong>{summary.productosVendidos}</strong></div></article>
              <article className="admin-stat-card"><div className="admin-stat-icon gold"><i className="fa-solid fa-receipt"></i></div><div><span>Órdenes registradas</span><strong>{summary.ordenes}</strong></div></article>
            </section>
            <SalesTable salesData={salesData} />
          </div>
        )}

        {activeTab === 'profile' && (
          <section className="admin-profile-panel">
            <div className="admin-profile-header">
              <div className="admin-profile-avatar">{user?.nombre?.charAt(0)?.toUpperCase() || 'A'}</div>
              <div><h2>{user?.nombre}</h2><p>{user?.correo}</p><span>Administrador principal</span></div>
            </div>
            <Formik
              enableReinitialize
              initialValues={{ nombre: user?.nombre || '', correo: user?.correo || '', password: '' }}
              validate={(values) => {
                const errors = {};
                if (!values.nombre.trim()) errors.nombre = 'El nombre es obligatorio';
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.correo)) errors.correo = 'Ingresa un correo válido';
                if (values.password && values.password.length < 6) errors.password = 'Usa al menos 6 caracteres';
                return errors;
              }}
              onSubmit={updateProfile}
            >
              {({ isSubmitting, status }) => (
                <Form className="admin-profile-form">
                  {status && <div className="admin-form-status">{status}</div>}
                  <div><label>Nombre completo</label><Field name="nombre" /><ErrorMessage name="nombre" component="small" /></div>
                  <div><label>Correo electrónico</label><Field name="correo" type="email" /><ErrorMessage name="correo" component="small" /></div>
                  <div><label>Nueva contraseña <span>(dejar vacío para conservarla)</span></label><Field name="password" type="password" placeholder="••••••••" /><ErrorMessage name="password" component="small" /></div>
                  <button type="submit" className="admin-primary" disabled={isSubmitting}>{isSubmitting ? 'Guardando…' : 'Guardar cambios'}</button>
                </Form>
              )}
            </Formik>
          </section>
        )}
      </main>

      {modalOpen && (
        <div className="modal-backdrop" role="dialog" aria-modal="true" onMouseDown={(event) => event.target === event.currentTarget && setModalOpen(false)}>
          <div className="modal-container">
            <div className="modal-header"><h2>{editingProduct ? 'Editar producto' : 'Nuevo producto'}</h2><button className="btn-close-modal" onClick={() => setModalOpen(false)}>×</button></div>
            <Formik
              enableReinitialize
              initialValues={editingProduct ? { nombre: editingProduct.nombre, descripcion: editingProduct.descripcion || '', precio: editingProduct.precio, imagen: editingProduct.imagen || '', category: editingProduct.category, stock: editingProduct.stock } : { nombre: '', descripcion: '', precio: '', imagen: '', category: 'cafe', stock: '' }}
              validate={(values) => {
                const errors = {};
                if (!values.nombre.trim()) errors.nombre = 'El nombre es obligatorio';
                if (!values.descripcion.trim()) errors.descripcion = 'La descripción es obligatoria';
                if (!values.precio || Number(values.precio) <= 0) errors.precio = 'Ingresa un precio válido';
                if (values.stock === '' || Number(values.stock) < 0) errors.stock = 'Ingresa un stock válido';
                return errors;
              }}
              onSubmit={async (values, helpers) => {
                try {
                  const url = editingProduct ? `http://localhost:3000/api/productos/${editingProduct.id}` : 'http://localhost:3000/api/productos';
                  const response = await fetch(url, { method: editingProduct ? 'PUT' : 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(values) });
                  const data = await response.json();
                  if (!response.ok) throw new Error(data.error || 'No fue posible guardar');
                  setModalOpen(false);
                  setFeedback({ isOpen: true, title: editingProduct ? 'Producto actualizado' : 'Producto creado', message: `${values.nombre} fue guardado correctamente.`, type: 'success' });
                  fetchAdminData();
                } catch (err) { helpers.setStatus(err.message); }
                finally { helpers.setSubmitting(false); }
              }}
            >
              {({ isSubmitting, status }) => (
                <Form className="form-admin">
                  {status && <div className="admin-form-status">{status}</div>}
                  <div><label>Nombre</label><Field name="nombre" /><ErrorMessage name="nombre" component="div" className="form-error" /></div>
                  <div><label>Descripción</label><Field as="textarea" name="descripcion" rows="3" /><ErrorMessage name="descripcion" component="div" className="form-error" /></div>
                  <div className="form-group-row">
                    <div><label>Categoría</label><Field as="select" name="category"><option value="cafe">Café</option><option value="frappe">Frappé</option><option value="postre">Postre</option></Field></div>
                    <div><label>Precio</label><Field type="number" name="precio" step="0.01" /><ErrorMessage name="precio" component="div" className="form-error" /></div>
                  </div>
                  <div className="form-group-row">
                    <div><label>Stock</label><Field type="number" name="stock" /><ErrorMessage name="stock" component="div" className="form-error" /></div>
                    <div><label>URL de imagen</label><Field name="imagen" placeholder="https://…" /></div>
                  </div>
                  <div className="admin-modal-actions"><button type="button" className="admin-secondary" onClick={() => setModalOpen(false)}>Cancelar</button><button type="submit" className="admin-primary" disabled={isSubmitting}>{isSubmitting ? 'Guardando…' : 'Guardar producto'}</button></div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      )}
      <FeedbackModal isOpen={feedback.isOpen} onClose={() => setFeedback({ ...feedback, isOpen: false })} title={feedback.title} message={feedback.message} type={feedback.type} />
    </div>
  );
}
