# ☕ Aura Coffee & Bistro - Giao Diện Web Giới Thiệu Quán Cafe & Nhà Hàng

Dự án thiết kế và xây dựng giao diện (UI) website giới thiệu cho quán Cafe / Bistro theo phong cách ấm cúng, sang trọng và hiện đại. Phù hợp cho môn học **Thiết kế Web** / **Bài tập lớn**.

---

## 🌟 1. Các thành phần giao diện (UI Sections)

Trang web được thiết kế theo cấu trúc landing page chuẩn SEO, thân thiện với người dùng và tương thích mọi kích thước màn hình (Responsive):

1. **Header & Navigation Bar**:
   - Logo nhận diện thương hiệu sang trọng.
   - Menu liên kết mượt mà: Trang chủ, Về chúng tôi, Thực đơn, Không gian, Đặt bàn, Địa chỉ.
   - Nút chuyển đổi giao diện **Sáng / Tối (Dark Mode)** lưu trạng thái vào `localStorage`.
   - Nút giỏ hàng với huy hiệu (badge) đếm số lượng món động.
   - Nút Call-to-action (CTA) "Đặt Bàn" nổi bật.
   - Thanh điều hướng tự động đổi màu khi cuộn trang (Sticky Header) & Scrollspy tự động đánh dấu mục đang xem.
   - Menu Hamburger responsive trên điện thoại & máy tính bảng.

2. **Hero Banner**:
   - Khẩu hiệu ấn tượng, truyền tải thông điệp hương vị cà phê mộc đặc sản.
   - Các nút hành động nhanh: *Xem Thực Đơn* và *Đặt Bàn Ngay*.
   - Khối thống kê nổi bật (Số năm hoạt động, hương vị, độ hài lòng).

3. **Highlights / Điểm nổi bật (Features)**:
   - 4 đặc trưng nổi trội của quán: Rang xay chuẩn mộc, Không gian ấm cúng, Bánh tươi mỗi ngày, Phục vụ tận tâm.

4. **Giới thiệu (About Us)**:
   - Câu chuyện thương hiệu, hình ảnh phong cách pha chế chuyên nghiệp.
   - Huy hiệu "10+ Năm Phục Vụ" và danh sách cam kết chất lượng.

5. **Thực đơn nổi bật & Tìm kiếm (Menu & Search)**:
   - **Thanh tìm kiếm tức thì**: Lọc món nhanh theo tên mà không cần tải lại trang.
   - **Bộ lọc danh mục**: Tất Cả, Cà Phê, Trà & Nước Ép, Bánh Ngọt.
   - Thẻ sản phẩm chi tiết: Hình ảnh, tên, mô tả ngắn, nhãn nổi bật (Best Seller, Món mới...), giá niêm yết và nút thêm nhanh.

6. **Không gian quán (Space / Gallery)**:
   - Bố cục lưới ảnh đa kích thước (CSS Grid) hiện đại.
   - Hiệu ứng zoom và hiển thị chú thích khi di chuột (Hover effect).

7. **Biểu mẫu Đặt bàn (Reservation Form)**:
   - Nhập thông tin: Họ tên, Số điện thoại, Số lượng khách, Ngày & Khung giờ, Khu vực ưu tiên, Ghi chú.
   - Kiểm tra dữ liệu nhập (Validation) và phản hồi bằng thông báo Toast hiện đại.

8. **Đánh giá từ khách hàng (Testimonials)**:
   - Thẻ cảm nhận thực tế từ khách hàng thân thiết kèm điểm sao đánh giá.

9. **Vị trí & Bản đồ tương tác (Location & Map)**:
   - Thông tin địa chỉ, hotline, giờ mở cửa, bãi đỗ xe và bản đồ Google Maps nhúng trực tiếp.

10. **Giỏ hàng trượt (Cart Drawer)**:
    - Hiển thị danh sách món đã chọn, tùy chọn kích cỡ/độ ngọt/đá, số lượng (+/-) và nút xóa.
    - Hỗ trợ nhập mã giảm giá (Mã demo: `AURA10` - giảm 10%, `AURA20` - giảm 20%).
    - Tính toán tạm tính, giảm giá và tổng tiền tự động.

11. **Popup xem chi tiết món (Quick View Modal)**:
    - Xem ảnh lớn, mô tả thành phần, chọn Size (S, M +6k, L +12k), độ ngọt, lượng đá.
    - Cập nhật đơn giá trực tiếp và thêm vào giỏ hàng.

12. **Modal đặt món / thanh toán (Checkout Modal)**:
    - Chọn hình thức: Dùng tại quán (chọn số bàn), Mang đi, hoặc Giao hàng tận nơi.
    - Chọn phương thức thanh toán: Tiền mặt, VietQR, Ví MoMo.

13. **Chân trang (Footer)**:
    - Thông tin giới thiệu, mạng xã hội, giờ mở cửa các ngày trong tuần, địa chỉ liên hệ và bản quyền.

---

## 🛠️ 2. Công nghệ sử dụng & Tối ưu

- **Toàn bộ hình ảnh tài nguyên đã được tải về cục bộ (`assets/images/`)**, giúp website hoạt động ổn định và tải nhanh hơn, không phụ thuộc kết nối bên ngoài.
- **HTML5**: Ngữ nghĩa chuẩn (`header`, `nav`, `section`, `aside`, `footer`).
- **CSS3**:
  - CSS Variables hỗ trợ chuyển đổi mượt giữa Light Mode & Dark Mode.
  - Flexbox & CSS Grid cho bố cục linh hoạt, hiện đại.
  - Media Queries tương thích đa kích thước màn hình (Mobile, Tablet, Desktop).
  - Code được cấu trúc theo từng phân khu rõ ràng, không trùng lặp.
- **JavaScript (ES6+)**:
  - Viết theo phong cách module hóa rõ ràng, dễ bảo trì và mở rộng thêm sản phẩm.
  - Lưu trạng thái Giỏ hàng và Theme vào `localStorage`.
- **Thư viện bên ngoài**:
  - Google Fonts (`Playfair Display`, `Plus Jakarta Sans`).
  - Font Awesome 6 (Hệ thống biểu tượng icon hiện đại).

---

## 📁 3. Cấu trúc thư mục

```text
Thiet-ke-web_xay-dung-ui-web-cafe/
│
├── index.html                  # Điểm khởi động điều hướng tự động cho GitHub Pages
├── Cafe-guest.html             # Trang giao diện chính dành cho khách
├── cafe-guest-order.html       # Trang hiển thị danh sách khách hàng order đồ
├── README.md                   # Tài liệu dự án
├── AI_LOG.md                   # Nhật ký khai báo sử dụng công cụ AI minh bạch
├── .nojekyll                   # Vô hiệu hóa Jekyll để GitHub Pages tải nhanh mã tĩnh
│
├── css/
│   └── style.css               # CSS định dạng giao diện dùng chung & hỗ trợ Dark Mode
│
├── js/
│   ├── main.js                 # Xử lý logic trang Cafe-guest.html: Giỏ hàng, Modal, Theme, Search
│   └── orders.js               # Xử lý hiển thị & lọc đơn hàng trên cafe-guest-order.html
│
└── assets/
    └── images/                 # Kho hình ảnh tài nguyên cục bộ
        ├── hero-bg.jpg         # Ảnh nền banner chính
        ├── reservation-bg.jpg  # Ảnh nền khu vực đặt bàn
        ├── about-main.jpg      # Ảnh khu vực giới thiệu (chính)
        ├── about-sub.jpg       # Ảnh khu vực giới thiệu (phụ)
        ├── menu-1-salt-coffee.jpg
        ├── menu-2-macchiato.jpg
        ├── menu-3-cold-brew.jpg
        ├── menu-4-peach-tea.jpg
        ├── menu-5-oolong-tea.jpg
        ├── menu-6-croissant.jpg
        ├── menu-7-tiramisu.jpg
        ├── menu-8-cheesecake.jpg
        ├── gallery-1.jpg
        ├── gallery-2.jpg
        ├── gallery-3.jpg
        ├── gallery-4.jpg
        ├── avatar-1.jpg
        ├── avatar-2.jpg
        └── avatar-3.jpg
```

---

## 🚀 4. Hướng dẫn chạy thử nghiệm

1. **Cách 1: Mở trực tiếp bằng trình duyệt**
   - Click đúp chuột vào file [Cafe-guest.html](file:///c:/Users/Asus/Desktop/TK%20WEB/BT%20lon/Thiet-ke-web_xay-dung-ui-web-cafe/Cafe-guest.html) để mở trang chính, hoặc [cafe-guest-order.html](file:///c:/Users/Asus/Desktop/TK%20WEB/BT%20lon/Thiet-ke-web_xay-dung-ui-web-cafe/cafe-guest-order.html) để xem danh sách đơn hàng.

2. **Cách 2: Sử dụng Live Server**
   - Mở thư mục dự án trong VS Code / Antigravity IDE.
   - Chuột phải vào file `Cafe-guest.html` và chọn **Open with Live Server**.
