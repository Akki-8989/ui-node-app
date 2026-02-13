import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL || '';

function App() {
  const [productsRes, setProductsRes] = useState(null);
  const [ordersRes, setOrdersRes] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [prodRes, orderRes] = await Promise.all([
          fetch(`${API_URL}/be-node-products/api/products`),
          fetch(`${API_URL}/be-node-orders/api/orders`)
        ]);
        setProductsRes(await prodRes.json());
        setOrdersRes(await orderRes.json());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const products = productsRes?.data || [];
  const orders = ordersRes?.data || [];

  return (
    <div style={{ fontFamily: 'Arial', maxWidth: 900, margin: '0 auto', padding: 20 }}>
      <h1 style={{ color: '#68A063' }}>E-Commerce Store (Node.js Backend)</h1>
      <p style={{ color: '#666' }}>Gateway: {API_URL || 'Not configured'}</p>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      <h2>Products (be-node-products)
        {productsRes && <span style={{ fontSize: 14, marginLeft: 10, color: productsRes.source === 'database' ? 'green' : 'orange' }}>
          [{productsRes.source}]
        </span>}
      </h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#68A063', color: '#fff' }}>
            <th style={{ padding: 10 }}>ID</th>
            <th style={{ padding: 10 }}>Name</th>
            <th style={{ padding: 10 }}>Price</th>
            <th style={{ padding: 10 }}>Category</th>
          </tr>
        </thead>
        <tbody>
          {products.map(p => (
            <tr key={p.Id || p.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: 8 }}>{p.Id || p.id}</td>
              <td style={{ padding: 8 }}>{p.Name || p.name}</td>
              <td style={{ padding: 8 }}>Rs. {p.Price || p.price}</td>
              <td style={{ padding: 8 }}>{p.Category || p.category}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2 style={{ marginTop: 30 }}>Orders (be-node-orders)
        {ordersRes && <span style={{ fontSize: 14, marginLeft: 10, color: ordersRes.source === 'database' ? 'green' : 'orange' }}>
          [{ordersRes.source}]
        </span>}
      </h2>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ background: '#68A063', color: '#fff' }}>
            <th style={{ padding: 10 }}>ID</th>
            <th style={{ padding: 10 }}>Product</th>
            <th style={{ padding: 10 }}>Qty</th>
            <th style={{ padding: 10 }}>Total</th>
            <th style={{ padding: 10 }}>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.Id || o.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: 8 }}>{o.Id || o.id}</td>
              <td style={{ padding: 8 }}>{o.ProductName || o.productName}</td>
              <td style={{ padding: 8 }}>{o.Quantity || o.quantity}</td>
              <td style={{ padding: 8 }}>Rs. {o.TotalAmount || o.total}</td>
              <td style={{ padding: 8 }}>{o.Status || o.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
