# ShareAkun Admin Dashboard

Modern, responsive admin dashboard untuk mengelola layanan shared account dengan desain yang clean dan functionality yang lengkap.

## 🚀 Fitur Utama

### 📱 Responsive Design
- Mobile-first approach
- Adaptive layout untuk semua ukuran layar
- Touch-friendly interface
- Sidebar yang dapat di-collapse

### 🎨 Modern UI/UX
- Clean dan minimalist design
- Smooth animations dan transitions
- Professional color scheme
- Intuitive navigation

### 🔧 Functionality
- Dynamic page loading
- Real-time search
- Form validation
- Modal dialogs
- Table sorting dan filtering
- Loading states
- Error handling

## 📁 Struktur Folder

```
admin/Dashboard/
├── assets/
│   ├── css/
│   │   └── main.css          # Main stylesheet
│   ├── js/
│   │   ├── main.js           # Core JavaScript functionality
│   │   └── page-loader.js    # Dynamic page loading
│   └── images/               # Static images
├── components/
│   └── modal.html            # Reusable modal components
├── pages/
│   ├── customer/             # Customer management pages
│   │   ├── pre-order.html
│   │   ├── renew.html
│   │   ├── waiting-list.html
│   │   ├── aktif.html
│   │   └── cancelled.html
│   ├── groups/               # Groups & Accounts pages
│   │   ├── groups.html
│   │   ├── expired-account.html
│   │   ├── expired-3-days.html
│   │   └── expired-7-days.html
│   ├── provider/             # Provider management pages
│   │   ├── kategori-provider.html
│   │   └── provider.html
│   └── employee/             # Employee management pages
│       └── employee.html
├── index.html                # Main dashboard file
└── README.md                 # Documentation
```

## 🛠️ Teknologi yang Digunakan

- **HTML5** - Semantic markup
- **CSS3** - Modern styling dengan custom properties
- **JavaScript ES6+** - Modern JavaScript features
- **Font Awesome** - Icon library
- **Responsive Design** - Mobile-first approach

## 🎯 Halaman yang Tersedia

### Customer Management
- **Pre Order** - Mengelola pesanan baru
- **Renew** - Mengelola pembaruan akun
- **Waiting List** - Antrian pesanan yang menunggu diproses
- **Aktif** - Akun yang sedang aktif
- **Cancelled** - Pesanan yang dibatalkan

### Groups & Accounts
- **Groups** - Mengelola grup layanan
- **Expired Account** - Akun yang telah kedaluwarsa
- **Expired in 3 Days** - Akun yang akan kedaluwarsa dalam 3 hari
- **Expired in 7 Days** - Akun yang akan kedaluwarsa dalam 7 hari

### Provider Management
- **Kategori Provider** - Mengelola kategori provider
- **Provider** - Mengelola provider dan layanan

### Employee Management
- **Employee** - Mengelola data admin

## 🔧 Cara Penggunaan

### 1. Buka Dashboard
```bash
# Buka file index.html di browser
open admin/Dashboard/index.html
```

### 2. Navigasi
- Gunakan sidebar untuk navigasi antar halaman
- Klik pada menu untuk expand/collapse section
- Gunakan search box untuk mencari data

### 3. Interaksi
- Klik tombol untuk membuka modal
- Gunakan form untuk input data
- Klik pada tabel untuk sorting
- Gunakan pagination untuk navigasi data

## 📱 Responsive Breakpoints

- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px
- **Mobile**: < 768px

## 🎨 Color Scheme

```css
--primary-color: #3b82f6      /* Blue */
--success-color: #10b981      /* Green */
--warning-color: #f59e0b      /* Yellow */
--danger-color: #ef4444       /* Red */
--info-color: #06b6d4         /* Cyan */
```

## 🔄 Dynamic Features

### Page Loading
- Lazy loading untuk performa optimal
- Caching untuk akses yang lebih cepat
- Error handling dengan retry functionality

### Search & Filter
- Real-time search dengan debouncing
- Table filtering dan sorting
- Responsive search interface

### Modal System
- Reusable modal components
- Form validation
- Loading states
- Keyboard navigation (ESC to close)

## 🚀 Performance

### Optimizations
- CSS dan JavaScript minification ready
- Image optimization
- Lazy loading untuk pages
- Efficient DOM manipulation

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔧 Customization

### Styling
Edit `assets/css/main.css` untuk mengubah:
- Color scheme
- Typography
- Spacing
- Animations

### Functionality
Edit `assets/js/main.js` untuk menambah:
- New features
- Custom validation
- API integration
- Event handlers

## 📝 Development

### Adding New Pages
1. Buat file HTML di folder `pages/`
2. Tambahkan mapping di `page-loader.js`
3. Update navigation di `index.html`

### Adding New Components
1. Buat component di folder `components/`
2. Include di halaman yang membutuhkan
3. Update JavaScript untuk functionality

## 🐛 Troubleshooting

### Common Issues
1. **Page not loading**: Check file paths dan network
2. **Modal not opening**: Verify modal IDs dan event handlers
3. **Search not working**: Check search input selectors
4. **Responsive issues**: Test di berbagai ukuran layar

### Debug Mode
```javascript
// Enable debug mode
window.dashboard.debug = true;
```

## 📄 License

© 2024 ShareAkun Team. All rights reserved.

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## 📞 Support

Untuk pertanyaan atau bantuan teknis:
- Email: support@shareakun.com
- Documentation: [docs.shareakun.com](https://docs.shareakun.com)
- Issues: [GitHub Issues](https://github.com/shareakun/dashboard/issues)

