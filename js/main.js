/* ==========================================================================
   AURA COFFEE & BISTRO - JAVASCRIPT LOGIC
   Mã nguồn tinh gọn, hướng module, xử lý tương tác hoàn chỉnh cho Web Cafe
   ========================================================================== */

// --- 1. DỮ LIỆU SẢN PHẨM (MENU DATABASE) ---
const MENU_DATA = {
  1: {
    id: 1,
    name: "Cà Phê Muối Aura",
    price: 45000,
    category: "coffee",
    desc: "Sự hòa quyện giữa vị đắng nhẹ của cà phê phin nguyên bản và lớp kem mặn béo ngậy đặc trưng của quán.",
    img: "assets/images/menu-1-salt-coffee.jpg",
    isDrink: true
  },
  2: {
    id: 2,
    name: "Caramel Macchiato",
    price: 55000,
    category: "coffee",
    desc: "Espresso đậm vị kết hợp cùng sữa tươi béo đánh mịn và sốt sốt caramel ngọt ngào quyến rũ.",
    img: "assets/images/menu-2-macchiato.jpg",
    isDrink: true
  },
  3: {
    id: 3,
    name: "Cold Brew Cam Vàng",
    price: 50000,
    category: "coffee",
    desc: "Cà phê ủ lạnh 16 tiếng sảng khoái, thanh mát cùng nước ép cam vàng tươi mọng tự nhiên.",
    img: "assets/images/menu-3-cold-brew.jpg",
    isDrink: true
  },
  4: {
    id: 4,
    name: "Trà Đào Cam Sả",
    price: 48000,
    category: "tea",
    desc: "Vị trà thanh dịu kết hợp hương thơm nồng ấm của sả tươi và từng miếng đào giòn ngọt.",
    img: "assets/images/menu-4-peach-tea.jpg",
    isDrink: true
  },
  5: {
    id: 5,
    name: "Trà Ô Long Sen Vàng",
    price: 52000,
    category: "tea",
    desc: "Trà ô long thượng hạng ăn kèm hạt sen bùi ngậy và củ năng giòn mát, ngọt thanh.",
    img: "assets/images/menu-5-oolong-tea.jpg",
    isDrink: true
  },
  6: {
    id: 6,
    name: "Croissant Bơ Pháp",
    price: 38000,
    category: "pastry",
    desc: "Bánh sừng bò ngàn lớp xốp giòn, thơm nức mùi bơ tự nhiên cao cấp nhập khẩu từ Pháp.",
    img: "assets/images/menu-6-croissant.jpg",
    isDrink: false
  },
  7: {
    id: 7,
    name: "Tiramisu Ý Cổ Điển",
    price: 58000,
    category: "pastry",
    desc: "Lớp kem mascarpone mềm tan xen kẽ bánh ladyfinger thấm đẫm hương vị cà phê và rượu rum cao cấp.",
    img: "assets/images/menu-7-tiramisu.jpg",
    isDrink: false
  },
  8: {
    id: 8,
    name: "Cheesecake Việt Quất",
    price: 55000,
    category: "pastry",
    desc: "Phô mai nướng New York béo mịn phủ sốt mứt quả việt quất tươi chua ngọt hài hòa.",
    img: "assets/images/menu-8-cheesecake.jpg",
    isDrink: false
  }
};

// --- 2. TRẠNG THÁI GIỎ HÀNG (CART STATE) ---
let cart = JSON.parse(localStorage.getItem('aura_cart') || '[]');
let appliedDiscount = 0; // Tỷ lệ giảm giá (%)
let currentQvId = null;
let currentQvQty = 1;

// --- 3. ĐỊNH DẠNG TIỀN TỆ VNĐ ---
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
};

// --- 4. KHỞI TẠO KHI TẢI TRANG (INIT) ---
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initMenuFilterAndSearch();
  initScrollspy();
  updateCartBadge();
  renderCart();
});

// ==========================================================================
// 5. DARK / LIGHT THEME TOGGLE
// ==========================================================================
function initTheme() {
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('aura_theme') || 'light';
  
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      localStorage.setItem('aura_theme', newTheme);
    });
  }
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    const icon = themeToggle.querySelector('i');
    if (icon) {
      if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
      } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
      }
    }
  }
}

// ==========================================================================
// 6. ĐIỀU HƯỚNG & MENU DI ĐỘNG (NAVBAR)
// ==========================================================================
function initNavigation() {
  const header = document.querySelector('.header');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelector('.nav-links');
  const navItems = document.querySelectorAll('.nav-links a');
  const backToTop = document.getElementById('backToTop');

  // Sticky header & Back to top visibility
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    if (backToTop) {
      if (scrollY > 400) {
        backToTop.classList.add('show');
      } else {
        backToTop.classList.remove('show');
      }
    }
  });

  // Mobile menu toggle
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      const icon = menuToggle.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-xmark');
      }
    });

    // Close mobile menu on item click
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        const icon = menuToggle.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-xmark');
        }
      });
    });
  }
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ==========================================================================
// 7. LỌC THỰC ĐƠN & TÌM KIẾM TỨC THÌ (SEARCH & FILTER)
// ==========================================================================
function initMenuFilterAndSearch() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('menuSearch');
  const clearBtn = document.getElementById('clearSearchBtn');
  const menuCards = document.querySelectorAll('.menu-card');
  const noResults = document.getElementById('noResults');

  let activeCategory = 'all';

  function applyFilters() {
    const query = (searchInput.value || '').trim().toLowerCase();
    let visibleCount = 0;

    menuCards.forEach(card => {
      const category = card.getAttribute('data-category');
      const name = card.getAttribute('data-name').toLowerCase();
      const matchCat = activeCategory === 'all' || category === activeCategory;
      const matchQuery = !query || name.includes(query);

      if (matchCat && matchQuery) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (noResults) {
      noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    if (clearBtn) {
      clearBtn.style.display = query.length > 0 ? 'block' : 'none';
    }
  }

  // Filter button click
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-filter');
      applyFilters();
    });
  });

  // Search input change
  if (searchInput) {
    searchInput.addEventListener('input', applyFilters);
  }

  // Clear search button
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      applyFilters();
      searchInput.focus();
    });
  }
}

// ==========================================================================
// 8. GIỎ HÀNG OFFCANVAS (SHOPPING CART)
// ==========================================================================
function saveCart() {
  localStorage.setItem('aura_cart', JSON.stringify(cart));
  updateCartBadge();
  renderCart();
}

function updateCartBadge() {
  const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const badges = [document.getElementById('cartBadge'), document.getElementById('floatingCartBadge')];
  badges.forEach(badge => {
    if (badge) badge.textContent = totalCount;
  });
  const countSpan = document.getElementById('cartTotalItems');
  if (countSpan) countSpan.textContent = totalCount;
}

function openCart() {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartBackdrop');
  if (drawer && backdrop) {
    drawer.classList.add('open');
    backdrop.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function closeCart() {
  const drawer = document.getElementById('cartDrawer');
  const backdrop = document.getElementById('cartBackdrop');
  if (drawer && backdrop) {
    drawer.classList.remove('open');
    backdrop.classList.remove('show');
    document.body.style.overflow = '';
  }
}

function quickAddToCart(productId) {
  const item = MENU_DATA[productId];
  if (!item) return;

  const cartItem = {
    id: item.id,
    name: item.name,
    price: item.price,
    img: item.img,
    options: item.isDrink ? "Size Nhỏ (S) • 100% đường • 100% đá" : "Tiêu chuẩn",
    qty: 1
  };

  addToCartList(cartItem);
  showToast(`Đã thêm "${item.name}" vào giỏ hàng!`);
}

function addToCartList(newItem) {
  const existingIndex = cart.findIndex(
    item => item.id === newItem.id && item.options === newItem.options
  );

  if (existingIndex > -1) {
    cart[existingIndex].qty += newItem.qty;
  } else {
    cart.push(newItem);
  }

  saveCart();
}

function renderCart() {
  const cartBody = document.getElementById('cartBody');
  if (!cartBody) return;

  if (cart.length === 0) {
    cartBody.innerHTML = `
      <div class="empty-cart-state">
        <i class="fa-solid fa-basket-shopping"></i>
        <h4>Giỏ hàng của bạn đang trống</h4>
        <p style="font-size: 0.9rem; margin-top: 6px;">Hãy lựa chọn những món cà phê & bánh thơm ngon từ thực đơn nhé!</p>
      </div>
    `;
    updateCartTotals(0);
    return;
  }

  let html = '';
  let subtotal = 0;

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.qty;
    subtotal += itemTotal;

    html += `
      <div class="cart-item">
        <img src="${item.img}" alt="${item.name}" class="cart-item-img">
        <div class="cart-item-details">
          <div class="cart-item-title">${item.name}</div>
          <div class="cart-item-opt">${item.options}</div>
          <div class="cart-item-price">${formatCurrency(item.price)}</div>
        </div>
        <div class="cart-item-actions">
          <button class="qty-btn" onclick="updateItemQty(${index}, -1)"><i class="fa-solid fa-minus"></i></button>
          <span style="font-weight: 600; font-size: 0.9rem;">${item.qty}</span>
          <button class="qty-btn" onclick="updateItemQty(${index}, 1)"><i class="fa-solid fa-plus"></i></button>
          <button class="cart-del-btn" onclick="removeItemFromCart(${index})" title="Xóa"><i class="fa-solid fa-trash-can"></i></button>
        </div>
      </div>
    `;
  });

  cartBody.innerHTML = html;
  updateCartTotals(subtotal);
}

function updateItemQty(index, delta) {
  if (!cart[index]) return;
  cart[index].qty += delta;
  if (cart[index].qty <= 0) {
    cart.splice(index, 1);
  }
  saveCart();
}

function removeItemFromCart(index) {
  if (!cart[index]) return;
  cart.splice(index, 1);
  saveCart();
}

function updateCartTotals(subtotal) {
  const subtotalEl = document.getElementById('cartSubtotal');
  const discountRow = document.getElementById('discountRow');
  const discountPercentEl = document.getElementById('discountPercent');
  const discountAmountEl = document.getElementById('discountAmount');
  const totalEl = document.getElementById('cartTotal');

  if (subtotalEl) subtotalEl.textContent = formatCurrency(subtotal);

  let discountVal = 0;
  if (appliedDiscount > 0 && subtotal > 0) {
    discountVal = (subtotal * appliedDiscount) / 100;
    if (discountRow) discountRow.style.display = 'flex';
    if (discountPercentEl) discountPercentEl.textContent = `${appliedDiscount}%`;
    if (discountAmountEl) discountAmountEl.textContent = `-${formatCurrency(discountVal)}`;
  } else {
    if (discountRow) discountRow.style.display = 'none';
  }

  const finalTotal = Math.max(0, subtotal - discountVal);
  if (totalEl) totalEl.textContent = formatCurrency(finalTotal);

  // Sync to checkout modal if open
  const checkoutFinal = document.getElementById('checkoutFinalTotal');
  if (checkoutFinal) checkoutFinal.textContent = formatCurrency(finalTotal);
}

function applyCoupon() {
  const input = document.getElementById('couponInput');
  const notice = document.getElementById('couponNotice');
  if (!input || !notice) return;

  const code = input.value.trim().toUpperCase();

  if (code === 'AURA10') {
    appliedDiscount = 10;
    notice.style.color = '#2e7d32';
    notice.textContent = 'Áp dụng thành công mã ưu đãi AURA10 (Giảm 10%)!';
  } else if (code === 'AURA20') {
    appliedDiscount = 20;
    notice.style.color = '#2e7d32';
    notice.textContent = 'Áp dụng thành công mã VIP AURA20 (Giảm 20%)!';
  } else if (!code) {
    notice.style.color = '#d32f2f';
    notice.textContent = 'Vui lòng nhập mã ưu đãi.';
  } else {
    appliedDiscount = 0;
    notice.style.color = '#d32f2f';
    notice.textContent = 'Mã ưu đãi không hợp lệ hoặc đã hết hạn.';
  }

  renderCart();
}

// ==========================================================================
// 9. POPUP CHI TIẾT SẢN PHẨM (QUICK VIEW MODAL)
// ==========================================================================
function openQuickView(productId) {
  const item = MENU_DATA[productId];
  if (!item) return;

  currentQvId = productId;
  currentQvQty = 1;

  document.getElementById('qvImage').src = item.img;
  document.getElementById('qvImage').alt = item.name;
  document.getElementById('qvTitle').textContent = item.name;
  document.getElementById('qvCategory').textContent = item.category === 'coffee' ? 'Cà Phê' : (item.category === 'tea' ? 'Trà & Nước Ép' : 'Bánh Ngọt');
  document.getElementById('qvPrice').textContent = formatCurrency(item.price);
  document.getElementById('qvDesc').textContent = item.desc;
  document.getElementById('qvQtyDisplay').textContent = '1';

  // Show/Hide drink options
  const optSize = document.getElementById('optSizeGroup');
  const optSweet = document.getElementById('optSweetGroup');
  const optIce = document.getElementById('optIceGroup');

  if (item.isDrink) {
    if (optSize) optSize.style.display = 'block';
    if (optSweet) optSweet.style.display = 'block';
    if (optIce) optIce.style.display = 'block';
  } else {
    if (optSize) optSize.style.display = 'none';
    if (optSweet) optSweet.style.display = 'none';
    if (optIce) optIce.style.display = 'none';
  }

  // Reset default radio
  const defaultSize = document.querySelector('input[name="qvSize"][value="Nhỏ (S)"]');
  if (defaultSize) defaultSize.checked = true;

  updateQvPrice();

  // Show modal
  document.getElementById('quickViewModal').classList.add('show');
  document.getElementById('quickViewBackdrop').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  const modal = document.getElementById('quickViewModal');
  const backdrop = document.getElementById('quickViewBackdrop');
  if (modal && backdrop) {
    modal.classList.remove('show');
    backdrop.classList.remove('show');
    document.body.style.overflow = '';
  }
}

function updateQvPrice() {
  if (!currentQvId) return;
  const item = MENU_DATA[currentQvId];
  if (!item) return;

  let unitPrice = item.price;

  if (item.isDrink) {
    const selectedSize = document.querySelector('input[name="qvSize"]:checked');
    if (selectedSize) {
      unitPrice += parseInt(selectedSize.getAttribute('data-extra') || '0', 10);
    }
  }

  const finalPrice = unitPrice * currentQvQty;
  const finalPriceEl = document.getElementById('qvFinalPrice');
  if (finalPriceEl) finalPriceEl.textContent = formatCurrency(finalPrice);
}

function incrementQvQty() {
  currentQvQty++;
  document.getElementById('qvQtyDisplay').textContent = currentQvQty;
  updateQvPrice();
}

function decrementQvQty() {
  if (currentQvQty > 1) {
    currentQvQty--;
    document.getElementById('qvQtyDisplay').textContent = currentQvQty;
    updateQvPrice();
  }
}

function addQvToCart() {
  if (!currentQvId) return;
  const item = MENU_DATA[currentQvId];
  if (!item) return;

  let unitPrice = item.price;
  let optionsText = "Tiêu chuẩn";

  if (item.isDrink) {
    const selectedSize = document.querySelector('input[name="qvSize"]:checked');
    const selectedSweet = document.querySelector('input[name="qvSweet"]:checked');
    const selectedIce = document.querySelector('input[name="qvIce"]:checked');

    const extra = selectedSize ? parseInt(selectedSize.getAttribute('data-extra') || '0', 10) : 0;
    unitPrice += extra;

    optionsText = `Size ${selectedSize ? selectedSize.value : 'S'} • Đường ${selectedSweet ? selectedSweet.value : '100%'} • Đá ${selectedIce ? selectedIce.value : '100%'}`;
  }

  addToCartList({
    id: item.id,
    name: item.name,
    price: unitPrice,
    img: item.img,
    options: optionsText,
    qty: currentQvQty
  });

  closeQuickView();
  showToast(`Đã thêm ${currentQvQty}x "${item.name}" vào giỏ hàng!`);
}

// ==========================================================================
// 10. MODAL XÁC NHẬN ĐẶT MÓN (CHECKOUT MODAL)
// ==========================================================================
function openCheckoutModal() {
  if (cart.length === 0) {
    showToast('Giỏ hàng đang trống! Vui lòng chọn món trước khi đặt.', '#d32f2f');
    return;
  }

  closeCart();
  const modal = document.getElementById('checkoutModal');
  const backdrop = document.getElementById('checkoutBackdrop');
  if (modal && backdrop) {
    modal.classList.add('show');
    backdrop.classList.add('show');
    document.body.style.overflow = 'hidden';
  }
}

function closeCheckoutModal() {
  const modal = document.getElementById('checkoutModal');
  const backdrop = document.getElementById('checkoutBackdrop');
  if (modal && backdrop) {
    modal.classList.remove('show');
    backdrop.classList.remove('show');
    document.body.style.overflow = '';
  }
}

function toggleOrderAddress(type) {
  const label = document.getElementById('orderAddressLabel');
  const input = document.getElementById('orderAddress');
  if (!label || !input) return;

  if (type === 'dine-in') {
    label.innerHTML = '<i class="fa-solid fa-chair"></i> Số bàn tại quán *';
    input.placeholder = 'Ví dụ: Bàn 08 (Khu máy lạnh)';
  } else if (type === 'takeaway') {
    label.innerHTML = '<i class="fa-solid fa-clock"></i> Thời gian đến lấy món *';
    input.placeholder = 'Ví dụ: 15 phút nữa, hoặc 11:30 hôm nay';
  } else {
    label.innerHTML = '<i class="fa-solid fa-map-location-dot"></i> Địa chỉ giao hàng *';
    input.placeholder = 'Ví dụ: Số 45 Lê Duẩn, P. Bến Nghé, Quận 1';
  }
}

function handleCheckoutSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('orderCustomerName').value.trim();
  const phone = document.getElementById('orderCustomerPhone').value.trim();
  const serviceType = document.getElementById('orderServiceType').value;
  const address = document.getElementById('orderAddress').value.trim();
  const payment = document.getElementById('orderPaymentMethod').value;
  const note = document.getElementById('orderNote').value.trim();
  const orderId = 'AC-' + Math.floor(1000 + Math.random() * 9000);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  const discountVal = appliedDiscount > 0 ? (subtotal * appliedDiscount) / 100 : 0;
  const finalTotal = Math.max(0, subtotal - discountVal);

  // Lưu đơn hàng vào localStorage để trang cafe-guest-order.html hiển thị
  const orders = JSON.parse(localStorage.getItem('aura_orders') || '[]');
  orders.unshift({
    id: orderId,
    customerName: name,
    customerPhone: phone,
    serviceType: serviceType,
    address: address,
    payment: payment,
    note: note,
    items: [...cart],
    total: finalTotal,
    status: 'pending', // pending | preparing | completed
    createdAt: new Date().toLocaleString('vi-VN', {
      hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: 'numeric'
    })
  });
  localStorage.setItem('aura_orders', JSON.stringify(orders));

  closeCheckoutModal();
  cart = [];
  appliedDiscount = 0;
  saveCart();
  document.getElementById('checkoutForm').reset();

  showToast(`Đặt món thành công! Mã đơn #${orderId}. Cảm ơn bạn ${name}!`, '#2e7d32');
}

// ==========================================================================
// 11. XỬ LÝ BIỂU MẪU ĐẶT BÀN (RESERVATION)
// ==========================================================================
function handleBookingSubmit(e) {
  e.preventDefault();

  const name = document.getElementById('guestName').value.trim();
  const phone = document.getElementById('guestPhone').value.trim();
  const date = document.getElementById('bookDate').value;
  const time = document.getElementById('bookTime').value;
  const guests = document.getElementById('guestCount').value;

  if (!name || !phone || !date || !time) {
    showToast('Vui lòng điền đầy đủ các thông tin bắt buộc (*)', '#d32f2f');
    return;
  }

  showToast(`Cảm ơn ${name}! Bạn đã đặt bàn thành công (${guests}) vào lúc ${time} ngày ${date}.`);
  document.getElementById('bookingForm').reset();
}

// ==========================================================================
// 12. THÔNG BÁO TOAST (TOAST NOTIFICATION)
// ==========================================================================
function showToast(message, bgColor = '#2e7d32') {
  const toast = document.getElementById('toastNotice');
  const msgEl = document.getElementById('toastMsg');
  if (!toast) return;

  if (msgEl) msgEl.textContent = message;
  toast.style.backgroundColor = bgColor;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
}

// ==========================================================================
// 13. SCROLLSPY (ĐÁNH DẤU MENU THEO VỊ TRÍ CUỘN)
// ==========================================================================
function initScrollspy() {
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute('id');
      const targetNav = document.querySelector(`.nav-links a[href*='${sectionId}']`);

      if (targetNav) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNav.classList.add('active');
        } else {
          targetNav.classList.remove('active');
        }
      }
    });
  });
}
