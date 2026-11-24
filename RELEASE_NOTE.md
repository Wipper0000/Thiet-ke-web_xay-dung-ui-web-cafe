# GHI CHÚ PHÁT HÀNH (RELEASE NOTE) - PHIÊN BẢN v1.0.0
**Dự án:** Website Aura Coffee & Bistro (Bài tập lớn A3 - Học phần FIT4014)  
**Ngày phát hành:** 24/11/2026  
**Mã phiên bản (Tag/Commit):** `v1.0.0` (`f70064e`)

---

## 1. Tính năng hoàn thiện trong phiên bản v1.0.0

- **Trang chủ khách hàng (`Cafe-guest.html`)**:
  - Giao diện Landing Page chuẩn Responsive theo phong cách Cafe & Bistro ấm cúng, sang trọng.
  - Hỗ trợ chuyển đổi giao diện **Sáng / Tối (Dark / Light Mode)** tự động lưu trạng thái vào `localStorage`.
  - Bộ lọc thực đơn đa danh mục (Cà phê, Trà & Nước ép, Bánh ngọt) kết hợp ô **Tìm kiếm tức thì**.
  - **Popup xem chi tiết món (Quick View Modal)**: Tùy chọn Size (S, M, L), mức đường, lượng đá và cập nhật đơn giá động.
  - **Giỏ hàng trượt (Offcanvas Cart Drawer)**: Thêm/bớt số lượng món, áp dụng mã giảm giá (`AURA10`, `AURA20`), tính tổng tiền.
  - **Biểu mẫu Đặt bàn (Reservation Form)** và **Modal Xác nhận đặt món (Checkout Modal)** có kiểm tra hợp lệ dữ liệu.
  - Tích hợp bản đồ vị trí Google Maps tương tác.

- **Trang danh sách đơn hàng (`cafe-guest-order.html`)**:
  - Thống kê tổng số đơn, đơn chờ xử lý, đơn hoàn thành và doanh thu thời gian thực.
  - Lưới hiển thị chi tiết các đơn order từ khách hàng được đồng bộ tự động qua `localStorage`.
  - Hỗ trợ tìm kiếm theo mã đơn / tên khách / số điện thoại và lọc theo trạng thái đơn hàng.
  - Cho phép chuyển đổi tiến trình trạng thái (*Chờ xác nhận* -> *Đang pha chế* -> *Đã hoàn thành*) và xóa đơn.

- **Khởi động điều hướng GitHub Pages (`index.html` & `.nojekyll`)**:
  - Tự động chuyển hướng tức thì (0ms) từ URL gốc của GitHub Pages sang `Cafe-guest.html`, ngăn ngừa lỗi hiển thị nhầm `README.md`.
  - Tệp `.nojekyll` giúp vô hiệu hóa xử lý Jekyll để tải thẳng tài nguyên web tĩnh tốc độ cao.

- **Tài nguyên hình ảnh cục bộ (`assets/images/`)**:
  - Toàn bộ 19 hình ảnh chất lượng cao được lưu trữ offline trong dự án, đảm bảo trang web hoạt động mượt mà không phụ thuộc Internet.

---

## 2. Các lỗi đã khắc phục (Bug Fixes)
- Khắc phục lỗi CSS bị lặp phân khu mã nguồn, tái cấu trúc thành 18 phân khu rõ ràng, dùng CSS Variables.
- Khắc phục lỗi đường dẫn ảnh tuyệt đối sang đường dẫn tương đối cục bộ để chạy tốt trên GitHub Pages.
- Sửa lỗi hiển thị responsive trên các thiết bị màn hình nhỏ (<768px), hoàn thiện menu Hamburger di động.
- Khắc phục triệt để lỗi GitHub Pages chỉ hiển thị `README.md` khi không có `index.html`.

---

## 3. Giới hạn đã biết (Known Limitations)
- Dữ liệu giỏ hàng và danh sách đơn hàng hiện lưu trữ phía Client bằng Web Storage API (`localStorage`), chưa đồng bộ CSDL backend máy chủ đa người dùng thời gian thực (phù hợp với phạm vi môn học Thiết kế Web tĩnh HTML5/CSS3/JavaScript).
