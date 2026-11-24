# NHẬT KÝ SỬ DỤNG TRỢ LÝ TRÍ TUỆ NHÂN TẠO (AI_LOG)
**Học phần:** FIT4014 · Thiết kế web và triển khai hệ thống phần mềm  
**Đề tài:** Xây dựng giao diện Web giới thiệu và đặt món quán Cafe & Bistro (Aura Coffee & Bistro)  
**Mục đích:** Minh bạch hóa việc áp dụng công cụ AI trong quá trình nghiên cứu, xây dựng và hoàn thiện dự án theo quy định của môn học.

---

## 1. Thông tin công cụ AI đã sử dụng
- **Tên công cụ:** Antigravity (Google DeepMind - Mô hình Gemini 3.8 Flash / Pro)
- **Mục đích sử dụng:**
  - Hỗ trợ xây dựng khung cấu trúc HTML5 chuẩn Semantic và CSS Responsive (Flexbox, CSS Grid).
  - Tối ưu hóa tổ chức mã nguồn (CSS Variables, Dark Mode toggle).
  - Viết các hàm JavaScript xử lý tương tác (Giỏ hàng, Popup Quick View, Bộ lọc tìm kiếm, Lưu trữ `localStorage`).
  - Hỗ trợ rà soát kiểm thử giao diện và soạn thảo tài liệu báo cáo kỹ thuật.

---

## 2. Nhật ký các phiên làm việc chính

| STT | Thời gian | Nhiệm vụ / Yêu cầu đưa vào AI (Prompt) | Kết quả AI phản hồi | Sự can thiệp, kiểm chứng của sinh viên |
|:---:|:---:|:---|:---|:---|
| 1 | 10/11/2026 | Khởi tạo khung giao diện ban đầu cho web quán cafe/nhà hàng (Header, Hero, About, Menu, Space, Reservation, Testimonials, Footer). | Tạo các file `index.html`, `css/style.css`, `js/main.js` cơ bản. | Kiểm tra hiển thị trên trình duyệt, điều chỉnh lại kích thước ảnh và màu sắc chủ đạo phù hợp. |
| 2 | 10/11/2026 | Tải toàn bộ ảnh tài nguyên Unsplash về thư mục local `assets/images/`, sửa đường dẫn offline và tinh giản code để tối ưu, dễ đọc. | Tải 19 ảnh cục bộ, chuẩn hóa lại `css/style.css` thành 17 phân khu modular, bổ sung Dark Mode, tối ưu code JS. | Kiểm tra tính sẵn sàng offline khi ngắt mạng, rà soát lại các class CSS và cấu trúc thư mục. |
| 3 | 12/11/2026 | Đổi tên `index.html` thành `Cafe-guest.html`, bổ sung thêm trang `cafe-guest-order.html` hiển thị danh sách khách order đồ. | Đổi tên file, tạo `cafe-guest-order.html` và `js/orders.js`, liên kết dữ liệu đơn qua `localStorage`. | Thử nghiệm đặt món từ `Cafe-guest.html`, kiểm tra đơn hàng hiển thị tức thì bên trang quản lý đơn, thử các nút chuyển trạng thái. |
| 4 | 20/11/2026 | Soạn thảo báo cáo kỹ thuật A3 chuẩn form `FIT4014_A3_MauBaoCao.docx` và các tài liệu bàn giao. | Khởi tạo file Word báo cáo và tài liệu `AI_LOG.md`. | Rà soát toàn bộ nội dung học phần, bảng rubric, bảng kiểm thử và đối chiếu minh chứng thực tế. |
| 5 | 24/11/2026 | Kiểm tra nguyên nhân GitHub Pages chỉ hiển thị README.md, thiết lập điểm khởi động index.html tự động chuyển hướng sang Cafe-guest.html. | Phân tích cơ chế Jekyll của GitHub Pages, tạo index.html điều hướng, bổ sung .nojekyll. | Kiểm tra chuyển hướng mượt mà trên trình duyệt và đối chiếu cấu trúc kho lưu trữ. |
| 6 | 24/11/2026 | Khôi phục tệp RELEASE_NOTE.md làm tài liệu bàn giao học phần theo yêu cầu. | Tạo lại tệp RELEASE_NOTE.md hoàn chỉnh, đồng bộ lại hồ sơ bàn giao và báo cáo kỹ thuật. | Rà soát cấu trúc thư mục và xác nhận tính đầy đủ của bộ tài liệu. |

---

## 3. Cam kết trách nhiệm
- Toàn bộ mã nguồn, cấu trúc giao diện và kết quả thử nghiệm trong báo cáo đã được sinh viên trực tiếp chạy thử, kiểm tra tính đúng đắn trên môi trường cục bộ và GitHub Pages.
- Việc sử dụng công cụ AI tuân thủ đúng quy định về tính trung thực học thuật của Trường Đại học Đại Nam và Bộ môn Công nghệ thông tin.
