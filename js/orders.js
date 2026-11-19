/* ==========================================================================
   AURA COFFEE & BISTRO - ORDER LIST PAGE LOGIC (cafe-guest-order.html)
   Quản lý hiển thị danh sách khách hàng order đồ uống & bánh ngọt
   ========================================================================== */

const SAMPLE_ORDERS = [
  {
    id: 'AC-2041',
    customerName: 'Nguyễn Minh Anh',
    customerPhone: '0908 112 334',
    serviceType: 'dine-in',
    address: 'Bàn 05 (Khu máy lạnh)',
    payment: 'Chuyển khoản QR',
    note: 'Ít đá, thêm ống hút giấy',
    items: [
      { name: 'Cà Phê Muối Aura', price: 45000, qty: 2, options: 'Size Nhỏ (S) • Đường 70% • Đá 50%' },
      { name: 'Croissant Bơ Pháp', price: 38000, qty: 1, options: 'Làm nóng giòn' }
    ],
    total: 128000,
    status: 'preparing',
    createdAt: '20:15 - 12/11/2026'
  },
  {
    id: 'AC-2040',
    customerName: 'Trần Hoàng Nam',
    customerPhone: '0912 445 667',
    serviceType: 'takeaway',
    address: 'Đến lấy lúc 20:30',
    payment: 'Ví MoMo',
    note: '',
    items: [
      { name: 'Cold Brew Cam Vàng', price: 56000, qty: 1, options: 'Size Vừa (M) • Đường 50% • Đá 100%' },
      { name: 'Tiramisu Ý Cổ Điển', price: 58000, qty: 1, options: 'Tiêu chuẩn' }
    ],
    total: 114000,
    status: 'pending',
    createdAt: '20:10 - 12/11/2026'
  },
  {
    id: 'AC-2039',
    customerName: 'Lê Thảo Vy',
    customerPhone: '0987 654 321',
    serviceType: 'delivery',
    address: '45 Lê Duẩn, P. Bến Nghé, Quận 1',
    payment: 'Tiền mặt',
    note: 'Gọi khi tới sảnh',
    items: [
      { name: 'Trà Ô Long Sen Vàng', price: 52000, qty: 2, options: 'Size Nhỏ (S) • Đường 100% • Đá riêng' }
    ],
    total: 104000,
    status: 'completed',
    createdAt: '19:45 - 12/11/2026'
  }
];

const SERVICE_LABELS = {
  'dine-in': 'Dùng tại quán',
  'takeaway': 'Mang đi',
  'delivery': 'Giao hàng'
};

const STATUS_CONFIG = {
  pending: { label: 'Chờ xác nhận', icon: 'fa-clock', css: 'status-pending', next: 'preparing', nextLabel: 'Nhận pha chế' },
  preparing: { label: 'Đang pha chế', icon: 'fa-mug-hot', css: 'status-preparing', next: 'completed', nextLabel: 'Hoàn thành' },
  completed: { label: 'Đã hoàn thành', icon: 'fa-circle-check', css: 'status-completed', next: null, nextLabel: null }
};

let orders = [];
let activeStatusFilter = 'all';

const formatCurrency = (amount) => new Intl.NumberFormat('vi-VN').format(amount) + 'đ';

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavbar();
  loadOrders();
  initOrderFilters();
});

// --- 1. THEME ---
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('aura_theme') || 'light';
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('aura_theme', next);
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const icon = document.querySelector('#themeToggle i');
  if (icon) {
    icon.classList.toggle('fa-sun', theme === 'dark');
    icon.classList.toggle('fa-moon', theme !== 'dark');
  }
}

// --- 2. NAVBAR ---
function initNavbar() {
  const header = document.querySelector('.header');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });
  }
}

// --- 3. LOAD & SAVE ORDERS ---
function loadOrders() {
  const stored = localStorage.getItem('aura_orders');
  if (stored) {
    orders = JSON.parse(stored);
  } else {
    orders = [...SAMPLE_ORDERS];
    localStorage.setItem('aura_orders', JSON.stringify(orders));
  }
  renderOrders();
}

function saveOrders() {
  localStorage.setItem('aura_orders', JSON.stringify(orders));
  renderOrders();
}

function resetSampleOrders() {
  orders = [...SAMPLE_ORDERS];
  saveOrders();
  showToast('Đã khôi phục danh sách đơn hàng mẫu!');
}

// --- 4. FILTER & SEARCH ---
function initOrderFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('orderSearch');
  const clearBtn = document.getElementById('clearOrderSearch');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeStatusFilter = btn.getAttribute('data-status');
      renderOrders();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      if (clearBtn) clearBtn.style.display = searchInput.value ? 'block' : 'none';
      renderOrders();
    });
  }

  if (clearBtn && searchInput) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      clearBtn.style.display = 'none';
      renderOrders();
    });
  }
}

// --- 5. RENDER ORDERS & STATS ---
function renderOrders() {
  const grid = document.getElementById('orderListGrid');
  const emptyState = document.getElementById('emptyOrderState');
  const query = (document.getElementById('orderSearch')?.value || '').trim().toLowerCase();

  updateStats();

  const filtered = orders.filter(order => {
    const matchStatus = activeStatusFilter === 'all' || order.status === activeStatusFilter;
    const matchQuery = !query ||
      order.id.toLowerCase().includes(query) ||
      order.customerName.toLowerCase().includes(query) ||
      order.customerPhone.includes(query);
    return matchStatus && matchQuery;
  });

  if (!grid) return;

  if (filtered.length === 0) {
    grid.innerHTML = '';
    if (emptyState) emptyState.style.display = 'block';
    return;
  }

  if (emptyState) emptyState.style.display = 'none';

  grid.innerHTML = filtered.map(order => {
    const st = STATUS_CONFIG[order.status] || STATUS_CONFIG.pending;
    const serviceLabel = SERVICE_LABELS[order.serviceType] || 'Tại quán';

    const itemsHtml = (order.items || []).map(item => `
      <div class="order-item-row">
        <div>
          <strong>${item.qty}x ${item.name}</strong>
          <span class="order-item-opt">${item.options || ''}</span>
        </div>
        <span>${formatCurrency(item.price * item.qty)}</span>
      </div>
    `).join('');

    const nextBtnHtml = st.next
      ? `<button class="btn-sm" onclick="advanceOrderStatus('${order.id}')"><i class="fa-solid fa-arrow-right"></i> ${st.nextLabel}</button>`
      : '';

    return `
      <article class="order-card">
        <div class="order-card-top">
          <div>
            <div class="order-code">#${order.id}</div>
            <div class="order-time"><i class="fa-regular fa-clock"></i> ${order.createdAt}</div>
          </div>
          <span class="status-badge ${st.css}">
            <i class="fa-solid ${st.icon}"></i> ${st.label}
          </span>
        </div>

        <div class="order-customer">
          <div><i class="fa-solid fa-user"></i> <strong>${order.customerName}</strong> - ${order.customerPhone}</div>
          <div><i class="fa-solid fa-location-dot"></i> <span>${serviceLabel}: ${order.address}</span></div>
          <div><i class="fa-solid fa-credit-card"></i> <span>${order.payment}</span></div>
          ${order.note ? `<div><i class="fa-solid fa-note-sticky"></i> <em>"${order.note}"</em></div>` : ''}
        </div>

        <div class="order-items-box">
          ${itemsHtml}
        </div>

        <div class="order-card-footer">
          <div class="order-total-price">
            <span>Tổng thanh toán</span>
            <strong>${formatCurrency(order.total)}</strong>
          </div>
          <div class="order-card-actions">
            ${nextBtnHtml}
            <button class="btn-sm btn-sm-danger" onclick="deleteOrder('${order.id}')" title="Xóa đơn">
              <i class="fa-solid fa-trash-can"></i>
            </button>
          </div>
        </div>
      </article>
    `;
  }).join('');
}

function updateStats() {
  const totalEl = document.getElementById('statTotalOrders');
  const pendingEl = document.getElementById('statPendingOrders');
  const completedEl = document.getElementById('statCompletedOrders');
  const revenueEl = document.getElementById('statTotalRevenue');

  const pendingCount = orders.filter(o => o.status === 'pending' || o.status === 'preparing').length;
  const completedCount = orders.filter(o => o.status === 'completed').length;
  const revenue = orders.reduce((sum, o) => sum + (o.total || 0), 0);

  if (totalEl) totalEl.textContent = orders.length;
  if (pendingEl) pendingEl.textContent = pendingCount;
  if (completedEl) completedEl.textContent = completedCount;
  if (revenueEl) revenueEl.textContent = formatCurrency(revenue);
}

// --- 6. ACTIONS ---
function advanceOrderStatus(orderId) {
  const idx = orders.findIndex(o => o.id === orderId);
  if (idx === -1) return;

  const nextStatus = STATUS_CONFIG[orders[idx].status]?.next;
  if (nextStatus) {
    orders[idx].status = nextStatus;
    saveOrders();
    showToast(`Đơn #${orderId} đã chuyển sang: ${STATUS_CONFIG[nextStatus].label}`);
  }
}

function deleteOrder(orderId) {
  orders = orders.filter(o => o.id !== orderId);
  saveOrders();
  showToast(`Đã xóa đơn hàng #${orderId}`, '#d9534f');
}

function showToast(message, bgColor = '#2e7d32') {
  const toast = document.getElementById('toastNotice');
  const msgEl = document.getElementById('toastMsg');
  if (!toast) return;
  if (msgEl) msgEl.textContent = message;
  toast.style.backgroundColor = bgColor;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 3500);
}

