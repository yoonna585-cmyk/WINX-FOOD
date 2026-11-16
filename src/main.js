import './style.css'

// Menu độc quyền phong phú của Winx Food
const foods = [
  { id: 1, name: 'Gà Rán Sốt Phô Mai', shop: 'Winx Kitchen - Nguyễn Bá Tuyển', price: 65000, oldPrice: 75000, discount: '-13%', rating: 4.9, time: '15 phút', icon: '🍗', category: 'Đồ ăn nhanh' },
  { id: 2, name: 'Mì Trộn Topping Thần Thánh', shop: 'Winx Kitchen', price: 45000, oldPrice: 55000, discount: '-18%', rating: 4.8, time: '20 phút', icon: '🍜', category: 'Cơm/Mì' },
  { id: 3, name: 'Cơm Gà Giòn Sốt Cay Hàn Quốc', shop: 'Winx Kitchen', price: 52000, oldPrice: 60000, discount: '-13%', rating: 4.7, time: '25 phút', icon: '🍛', category: 'Cơm/Mì' },
  { id: 4, name: 'Trà Sữa Kem Trứng Cháy', shop: 'Winx Tea & Coffee', price: 38000, oldPrice: 45000, discount: '-15%', rating: 5.0, time: '10 phút', icon: '🧋', category: 'Đồ uống' },
  { id: 5, name: 'Trà Đào Cam Sả Thạch Hồng', shop: 'Winx Tea & Coffee', price: 35000, oldPrice: 42000, discount: '-16%', rating: 4.8, time: '10 phút', icon: '🍹', category: 'Đồ uống' },
  { id: 6, name: 'Bánh Tráng Cuộn Sốt Bơ Me', shop: 'Winx Corner', price: 30000, oldPrice: 35000, discount: '-14%', rating: 4.9, time: '15 phút', icon: '🌯', category: 'Ăn vặt' },
  { id: 7, name: 'Khoai Tây Lắc Phô Mai Siêu Cấp', shop: 'Winx Corner', price: 28000, oldPrice: 35000, discount: '-20%', rating: 4.6, time: '10 phút', icon: '🍟', category: 'Ăn vặt' },
  { id: 8, name: 'Sủi Cảo Chiên Giòn Sốt Thái', shop: 'Winx Kitchen', price: 42000, oldPrice: 50000, discount: '-16%', rating: 4.8, time: '20 phút', icon: '🥟', category: 'Đồ ăn nhanh' },
  { id: 9, name: 'Cơm Tấm Sườn Bì Chả Đặc Biệt', shop: 'Cơm Tấm Winx', price: 55000, oldPrice: 65000, discount: '-15%', rating: 4.9, time: '25 phút', icon: '🍱', category: 'Cơm/Mì' },
  { id: 10, name: 'Bánh Mì Kẹp Thịt Nướng Mật Ngọt', shop: 'Bánh Mì Winx', price: 28000, oldPrice: 35000, discount: '-20%', rating: 4.7, time: '10 phút', icon: '🥖', category: 'Đồ ăn nhanh' },
  { id: 11, name: 'Trà Sữa Matcha Sương Sáo', shop: 'Winx Tea & Coffee', price: 36000, oldPrice: 42000, discount: '-14%', rating: 4.8, time: '15 phút', icon: '🍵', category: 'Đồ uống' },
  { id: 12, name: 'Bắp Xào Tép Mỡ Thơm Lừng', shop: 'Winx Corner', price: 25000, oldPrice: 32000, discount: '-21%', rating: 4.7, time: '12 phút', icon: '🌽', category: 'Ăn vặt' }
];

let cart = [];
let currentRole = 'Khách hàng';
let currentCategory = 'Tất cả';
let keyword = '';
let isCartOpen = false;
let activeTab = 'home'; // 'home', 'explore', 'cart', 'orders', 'profile'

const money = (n) => n.toLocaleString('vi-VN') + 'đ';

window.addToCart = function(id) {
  const item = foods.find(f => f.id === id);
  const existing = cart.find(c => c.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...item, qty: 1 });
  }
  render();
};

window.changeQty = function(id, delta) {
  const item = cart.find(c => c.id === id);
  if (item) {
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter(c => c.id !== id);
    }
  }
  render();
};

window.setRole = function(role) {
  currentRole = role;
  render();
};

window.setCategory = function(cat) {
  currentCategory = cat;
  render();
};

window.toggleCartModal = function(status) {
  isCartOpen = status;
  render();
};

window.switchTab = function(tab) {
  activeTab = tab;
  if (tab === 'cart') {
    isCartOpen = true;
  } else {
    isCartOpen = false;
  }
  render();
};

window.checkout = function() {
  if (cart.length === 0) return;
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  alert(`🎉 ĐẶT ĐƠN THÀNH CÔNG!\nTổng thanh toán: ${money(total)}\nTài xế WINX FOOD đang giao đến đường Nguyễn Bá Tuyển, TPHCM!`);
  cart = [];
  isCartOpen = false;
  activeTab = 'orders'; // Chuyển sang trang đơn hàng sau khi đặt thành công
  render();
};

function render() {
  const app = document.querySelector('#app');
  if (!app) return;

  const cats = ['Tất cả', 'Cơm/Mì', 'Đồ ăn nhanh', 'Đồ uống', 'Ăn vặt'];
  const filtered = foods.filter(f => {
    const matchCat = (currentCategory === 'Tất cả' || f.category === currentCategory);
    const matchKey = f.name.toLowerCase().includes(keyword.toLowerCase()) || f.shop.toLowerCase().includes(keyword.toLowerCase());
    return matchCat && matchKey;
  });

  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
  const totalMoney = cart.reduce((sum, i) => sum + i.price * i.qty, 0);

  app.innerHTML = `
    <div style="max-width: 600px; margin: 0 auto; padding-bottom: 110px; font-family: sans-serif; background: #fdfcf8; color: #333; min-height: 100vh; position: relative;">
      
      <!-- Header với màu chủ đạo Cam - Xanh đặc trưng từ logo[span_0](start_span)[span_0](end_span) -->
      <div style="padding: 16px; background: linear-gradient(135deg, #ff6b00, #4caf50); color: white; position: sticky; top: 0; z-index: 100; box-shadow: 0 4px 12px rgba(255,107,0,0.2);">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 12px;">
          <div style="display: flex; align-items: center; gap: 10px;">
            <img src="/IMG_1611.jpeg" onerror="this.src='/logo.jpg'" style="width: 44px; height: 44px; border-radius: 12px; object-fit: cover; background: #fff; box-shadow: 0 2px 6px rgba(0,0,0,0.2);">
            <div>
              <span style="font-size: 19px; font-weight: 800; letter-spacing: 0.5px;">WinxFood 👑</span>
              <div style="font-size: 10px; opacity: 0.9;">Giao nhanh siêu tốc</div>
            </div>
          </div>
          <div style="font-size: 11px; text-align: right; background: rgba(0,0,0,0.15); padding: 4px 8px; border-radius: 8px;">
            📍 Giao đến<br><strong style="color: #ffeb3b;">Đường Nguyễn Bá Tuyển, TPHCM ▾</strong>
          </div>
        </div>

        <!-- Role Tabs -->
        <div style="display: flex; gap: 6px; overflow-x: auto; margin-bottom: 10px; padding-bottom: 4px;">
          ${['Khách hàng', 'Nhà hàng', 'Shipper', 'Admin'].map(r => `
            <button onclick="setRole('${r}')" style="padding: 6px 14px; border-radius: 16px; border: none; background: ${currentRole === r ? '#ffffff' : 'rgba(255,255,255,0.2)'}; color: ${currentRole === r ? '#ff6b00' : '#fff'}; font-weight: 700; font-size: 13px; cursor: pointer; white-space: nowrap; box-shadow: ${currentRole === r ? '0 2px 6px rgba(0,0,0,0.15)' : 'none'};">${r}</button>
          `).join('')}
        </div>

        <!-- Search Bar -->
        <div style="display: flex; gap: 8px;">
          <input id="search-box" type="text" placeholder="🔍 Tìm món ngon, trà sữa, ăn vặt..." value="${keyword}" style="flex: 1; padding: 10px 14px; border-radius: 8px; border: none; background: #fff; color: #333; outline: none; font-size: 14px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);" oninput="keyword = this.value; render();">
          <button style="background: #1b5e20; color: white; border: none; padding: 0 16px; border-radius: 8px; font-weight: bold; cursor: pointer; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">Tìm</button>
        </div>
      </div>

      <!-- MAIN CONTENT AREA BASED ON TABS -->
      ${currentRole !== 'Khách hàng' ? `
        <div style="padding: 60px 20px; text-align: center; color: #666;">
          <div style="font-size: 50px; margin-bottom: 10px;">🛠️</div>
          <h3>Trang quản lý dành cho ${currentRole}</h3>
          <p>Hệ thống dashboard và quản lý đơn cho ${currentRole} đang hoạt động.</p>
        </div>
      ` : `
        
        <!-- TAB 1: TRANG CHỦ (home) -->
        ${activeTab === 'home' ? `
          <!-- Categories Filter -->
          <div style="display: flex; gap: 8px; overflow-x: auto; padding: 12px 16px; background: #fff; border-bottom: 1px solid #eee; box-shadow: 0 1px 3px rgba(0,0,0,0.02);">
            ${cats.map(cat => `
              <button onclick="setCategory('${cat}')" style="padding: 6px 14px; border-radius: 20px; border: 1.5px solid ${currentCategory === cat ? '#ff6b00' : '#e0e0e0'}; background: ${currentCategory === cat ? '#fff3e0' : '#fff'}; color: ${currentCategory === cat ? '#ff6b00' : '#555'}; font-weight: 700; font-size: 12px; cursor: pointer; white-space: nowrap;">${cat}</button>
            `).join('')}
          </div>

          <!-- Section Title -->
          <div style="padding: 16px 16px 8px; display: flex; justify-content: space-between; align-items: center;">
            <span style="font-size: 16px; font-weight: 800; color: #222;">🔥 Danh sách món ngon độc quyền</span>
            <span style="font-size: 12px; color: #ff6b00; font-weight: 600;">${filtered.length} món sẵn sàng</span>
          </div>

          <!-- Food Grid -->
          <div style="padding: 0 16px 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            ${filtered.map(f => `
              <div style="background: #ffffff; border-radius: 14px; overflow: hidden; position: relative; border: 1px solid #eee; box-shadow: 0 3px 8px rgba(0,0,0,0.05);">
                <div style="position: absolute; top: 8px; left: 8px; background: #ff4d4f; color: white; font-size: 10px; font-weight: bold; padding: 2px 6px; border-radius: 4px; z-index: 2;">${f.discount}</div>
                <div style="height: 110px; display: flex; align-items: center; justify-content: center; font-size: 45px; background: linear-gradient(135deg, #fff3e0, #e8f5e9);">${f.icon}</div>
                <div style="padding: 10px;">
                  <div style="font-weight: 700; font-size: 13px; margin-bottom: 4px; color: #222; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${f.name}</div>
                  <div style="font-size: 11px; color: #777; margin-bottom: 6px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${f.shop}</div>
                  <div style="font-size: 11px; color: #4caf50; font-weight: 600; margin-bottom: 8px;">⭐ ${f.rating} · ⏱️ ${f.time}</div>
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                      <div style="color: #ff6b00; font-weight: 800; font-size: 13px;">${money(f.price)}</div>
                      <div style="color: #999; font-size: 10px; text-decoration: line-through;">${money(f.oldPrice)}</div>
                    </div>
                    <button onclick="addToCart(${f.id})" style="background: linear-gradient(135deg, #ff6b00, #ff8c00); color: #fff; border: none; width: 30px; height: 30px; border-radius: 50%; font-size: 16px; font-weight: bold; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 6px rgba(255,107,0,0.3);">+</button>
                  </div>
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}

        <!-- TAB 2: KHÁM PHÁ (explore) -->
        ${activeTab === 'explore' ? `
          <div style="padding: 20px;">
            <h3 style="color: #ff6b00; margin-top: 0;">🌟 Khám phá bộ sưu tập Winx</h3>
            <p style="color: #666; font-size: 14px;">Các món ăn vặt và trà sữa được yêu thích nhất tại Nguyễn Bá Tuyển tuần này:</p>
            <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 16px;">
              <div style="background: linear-gradient(135deg, #ff6b00, #ff9800); color: white; padding: 16px; border-radius: 12px; font-weight: bold;">
                🔥 Combo Trưa Hỏa Tốc - Giảm đến 25%
              </div>
              <div style="background: linear-gradient(135deg, #4caf50, #81c784); color: white; padding: 16px; border-radius: 12px; font-weight: bold;">
                🧋 Giờ Vàng Trà Sữa Mua 1 Tặng 1
              </div>
              <div style="background: linear-gradient(135deg, #2196f3, #64b5f6); color: white; padding: 16px; border-radius: 12px; font-weight: bold;">
                ⚡ Freeship 0đ đơn dưới 3km tại Tân Bình
              </div>
            </div>
          </div>
        ` : ''}

        <!-- TAB 3: ĐƠN HÀNG (orders) -->
        ${activeTab === 'orders' ? `
          <div style="padding: 20px;">
            <h3 style="color: #2e7d32; margin-top: 0;">📦 Lịch sử đơn hàng của bạn</h3>
            ${cart.length === 0 ? `
              <div style="background: #fff; padding: 30px; border-radius: 12px; text-align: center; border: 1px solid #eee; margin-top: 20px;">
                <p style="color: #666;">Bạn chưa có đơn hàng nào gần đây.</p>
                <button onclick="switchTab('home')" style="background: #ff6b00; color: white; border: none; padding: 10px 20px; border-radius: 8px; font-weight: bold; cursor: pointer; margin-top: 10px;">Đặt món ngay</button>
              </div>
            ` : `
              <div style="background: #fff; padding: 16px; border-radius: 12px; border: 1px solid #eee;">
                <div style="font-weight: bold; color: #ff6b00; margin-bottom: 8px;">Đơn hàng đang chuẩn bị giao 🚀</div>
                <p style="font-size: 13px; color: #666; margin: 4px 0;">Địa chỉ nhận: Đường Nguyễn Bá Tuyển, TPHCM</p>
                <p style="font-size: 13px; color: #666; margin: 4px 0;">Tổng tiền: <strong style="color: #222;">${money(totalMoney)}</strong></p>
              </div>
            `}
          </div>
        ` : ''}

        <!-- TAB 4: TÀI KHOẢN (profile) -->
        ${activeTab === 'profile' ? `
          <div style="padding: 20px;">
            <div style="display: flex; align-items: center; gap: 14px; background: white; padding: 16px; border-radius: 12px; box-shadow: 0 2px 6px rgba(0,0,0,0.05); margin-bottom: 16px;">
              <div style="width: 50px; height: 50px; background: #ff6b00; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 22px; font-weight: bold;">W</div>
              <div>
                <h4 style="margin: 0; color: #222;">Thành viên Winx Food</h4>
                <p style="margin: 4px 0 0; font-size: 12px; color: #666;">📍 Nguyễn Bá Tuyển, TPHCM</p>
              </div>
            </div>
            <div style="background: white; border-radius: 12px; padding: 8px 16px; box-shadow: 0 2px 6px rgba(0,0,0,0.05);">
              <div style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 14px; font-weight: 600; cursor: pointer;">🎟️ Kho Voucher của tôi</div>
              <div style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 14px; font-weight: 600; cursor: pointer;">📍 Địa chỉ nhận hàng</div>
              <div style="padding: 12px 0; border-bottom: 1px solid #eee; font-size: 14px; font-weight: 600; cursor: pointer;">⭐ Đánh giá quán ăn</div>
              <div style="padding: 12px 0; font-size: 14px; font-weight: 600; color: #ff4d4f; cursor: pointer;">⚙️ Đăng xuất</div>
            </div>
          </div>
        ` : ''}

      `}

      <!-- Modal Chi Tiết Giỏ Hàng -->
      ${isCartOpen ? `
        <div style="position: fixed; inset: 0; background: rgba(0,0,0,0.6); z-index: 300; display: flex; align-items: flex-end;" onclick="toggleCartModal(false)">
          <div style="background: #fff; width: 100%; max-width: 600px; margin: 0 auto; border-top-left-radius: 20px; border-top-right-radius: 20px; max-height: 80vh; overflow-y: auto; padding: 20px; box-sizing: border-box;" onclick="event.stopPropagation()">
            <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #eee; padding-bottom: 12px; margin-bottom: 16px;">
              <h3 style="margin: 0; font-size: 18px; color: #222;">🛒 Giỏ hàng của bạn (${totalQty} món)</h3>
              <button onclick="toggleCartModal(false)" style="background: #eee; border: none; width: 30px; height: 30px; border-radius: 50%; font-weight: bold; cursor: pointer;">✕</button>
            </div>

            ${cart.length === 0 ? `
              <div style="text-align: center; padding: 40px 0; color: #888;">
                <div style="font-size: 40px; margin-bottom: 10px;">🛒</div>
                <p>Giỏ hàng đang trống, hãy chọn món ngon nhé!</p>
              </div>
            ` : `
              <div style="display: flex; flex-direction: column; gap: 12px; margin-bottom: 20px;">
                ${cart.map(item => `
                  <div style="display: flex; justify-content: space-between; align-items: center; background: #f9f9f9; padding: 10px; border-radius: 10px;">
                    <div style="display: flex; align-items: center; gap: 10px; flex: 1;">
                      <span style="font-size: 28px;">${item.icon}</span>
                      <div>
                        <div style="font-weight: 700; font-size: 14px; color: #222;">${item.name}</div>
                        <div style="color: #ff6b00; font-weight: 800; font-size: 13px;">${money(item.price)}</div>
                      </div>
                    </div>
                    <div style="display: flex; align-items: center; gap: 8px;">
                      <button onclick="changeQty(${item.id}, -1)" style="width: 26px; height: 26px; background: #ddd; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">-</button>
                      <span style="font-weight: bold; min-width: 20px; text-align: center;">${item.qty}</span>
                      <button onclick="changeQty(${item.id}, 1)" style="width: 26px; height: 26px; background: #ff6b00; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">+</button>
                    </div>
                  </div>
                `).join('')}
              </div>

              <div style="border-top: 1px solid #eee; padding-top: 12px; margin-bottom: 16px;">
                <div style="display: flex; justify-content: space-between; font-size: 16px; font-weight: bold; color: #222;">
                  <span>Tổng thanh toán:</span>
                  <span style="color: #ff6b00; font-size: 18px;">${money(totalMoney)}</span>
                </div>
              </div>

              <button onclick="checkout()" style="width: 100%; background: linear-gradient(135deg, #2e7d32, #4caf50); color: white; border: none; padding: 14px; border-radius: 12px; font-size: 16px; font-weight: 800; cursor: pointer; box-shadow: 0 4px 10px rgba(46,125,50,0.3);">🚀 Tiến hành đặt đơn ngay</button>
            `}
          </div>
        </div>
      ` : ''}

      <!-- Floating Cart Bar -->
      ${cart.length > 0 && !isCartOpen ? `
        <div onclick="toggleCartModal(true)" style="position: fixed; bottom: 65px; left: 16px; right: 16px; max-width: 568px; margin: 0 auto; background: linear-gradient(135deg, #2e7d32, #4caf50); color: white; padding: 12px 18px; border-radius: 12px; display: flex; justify-content: space-between; align-items: center; font-weight: bold; box-shadow: 0 4px 15px rgba(46,125,50,0.4); z-index: 200; cursor: pointer;">
          <div>🛒 Giỏ hàng (${totalQty} món) - <span style="font-size: 16px; color: #ffeb3b;">${money(totalMoney)}</span></div>
          <div style="background: white; color: #2e7d32; padding: 6px 12px; border-radius: 8px; font-size: 13px; font-weight: 800;">Xem giỏ hàng ➔</div>
        </div>
      ` : ''}

      <!-- Bottom Nav (Tất cả các nút đều chuyển trang mượt mà) -->
      <div style="position: fixed; bottom: 0; left: 0; right: 0; max-width: 600px; margin: 0 auto; background: #ffffff; border-top: 1px solid #eee; display: flex; justify-content: space-around; padding: 10px 0; z-index: 100; box-shadow: 0 -2px 10px rgba(0,0,0,0.04);">
        <div onclick="switchTab('home')" style="text-align: center; color: ${activeTab === 'home' ? '#ff6b00' : '#888'}; font-size: 11px; cursor: pointer; font-weight: ${activeTab === 'home' ? '700' : '400'};">🏠<br>Trang chủ</div>
        <div onclick="switchTab('explore')" style="text-align: center; color: ${activeTab === 'explore' ? '#ff6b00' : '#888'}; font-size: 11px; cursor: pointer; font-weight: ${activeTab === 'explore' ? '700' : '400'};">🔍<br>Khám phá</div>
        <div onclick="switchTab('cart')" style="text-align: center; color: ${activeTab === 'cart' ? '#ff6b00' : '#888'}; font-size: 11px; cursor: pointer; font-weight: ${activeTab === 'cart' ? '700' : '400'};">🛒<br>Giỏ hàng</div>
        <div onclick="switchTab('orders')" style="text-align: center; color: ${activeTab === 'orders' ? '#ff6b00' : '#888'}; font-size: 11px; cursor: pointer; font-weight: ${activeTab === 'orders' ? '700' : '400'};">📦<br>Đơn hàng</div>
        <div onclick="switchTab('profile')" style="text-align: center; color: ${activeTab === 'profile' ? '#ff6b00' : '#888'}; font-size: 11px; cursor: pointer; font-weight: ${activeTab === 'profile' ? '700' : '400'};">👤<br>Tài khoản</div>
      </div>

    </div>
  `;
}

render();
