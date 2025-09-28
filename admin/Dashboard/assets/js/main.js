/**
 * ShareAkun Admin Dashboard - Main JavaScript
 * Modern, responsive admin dashboard functionality
 */

class ShareAkunDashboard {
    constructor() {
        this.sidebarOpen = true;
        this.currentPage = 'waiting-list';
        this.modals = {};
        this.pageLoader = new PageLoader();
        
        this.init();
    }

    init() {
        this.bindEvents();
        this.initializeSidebar();
        this.initializeModals();
        this.loadPage(this.currentPage);
        this.initializeAnimations();
    }

    bindEvents() {
        // Sidebar toggle
        document.addEventListener('click', (e) => {
            if (e.target.matches('[data-sidebar-toggle]')) {
                this.toggleSidebar();
            }
            
            if (e.target.matches('[data-nav-toggle]')) {
                const section = e.target.closest('[data-nav-section]');
                this.toggleNavSection(section);
            }
            
            if (e.target.matches('[data-nav-link]')) {
                e.preventDefault();
                const page = e.target.getAttribute('data-page');
                this.navigateTo(page);
            }
            
            if (e.target.matches('[data-modal-open]')) {
                const modalId = e.target.getAttribute('data-modal');
                this.openModal(modalId);
            }
            
            if (e.target.matches('[data-modal-close]')) {
                const modal = e.target.closest('[data-modal-id]');
                this.closeModal(modal.id);
            }
            
            if (e.target.matches('[data-modal-backdrop]')) {
                this.closeModal(e.target.id);
            }
        });

        // Search functionality
        const searchInput = document.querySelector('[data-search]');
        if (searchInput) {
            searchInput.addEventListener('input', this.debounce(this.handleSearch.bind(this), 300));
        }

        // Form submissions
        document.addEventListener('submit', (e) => {
            if (e.target.matches('[data-form]')) {
                e.preventDefault();
                this.handleFormSubmit(e.target);
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                this.closeAllModals();
            }
            
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                this.focusSearch();
            }
        });

        // Window resize
        window.addEventListener('resize', this.debounce(this.handleResize.bind(this), 250));
    }

    initializeSidebar() {
        const sidebar = document.querySelector('[data-sidebar]');
        const mainContent = document.querySelector('[data-main-content]');
        
        if (window.innerWidth <= 1024) {
            this.sidebarOpen = false;
            sidebar?.classList.add('sidebar-collapsed');
            mainContent?.classList.add('sidebar-collapsed');
        }
    }

    initializeModals() {
        const modals = document.querySelectorAll('[data-modal-id]');
        modals.forEach(modal => {
            this.modals[modal.id] = modal;
        });
    }

    initializeAnimations() {
        // Add animation classes to elements
        const animatedElements = document.querySelectorAll('[data-animate]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const animation = entry.target.getAttribute('data-animate');
                    entry.target.classList.add(animation);
                }
            });
        }, { threshold: 0.1 });

        animatedElements.forEach(el => observer.observe(el));
    }

    toggleSidebar() {
        this.sidebarOpen = !this.sidebarOpen;
        const sidebar = document.querySelector('[data-sidebar]');
        const mainContent = document.querySelector('[data-main-content]');
        
        if (this.sidebarOpen) {
            sidebar?.classList.remove('sidebar-collapsed');
            mainContent?.classList.remove('sidebar-collapsed');
        } else {
            sidebar?.classList.add('sidebar-collapsed');
            mainContent?.classList.add('sidebar-collapsed');
        }
        
        // Save preference
        localStorage.setItem('sidebarOpen', this.sidebarOpen);
    }

    toggleNavSection(section) {
        const submenu = section.querySelector('[data-nav-submenu]');
        const arrow = section.querySelector('[data-nav-arrow]');
        
        if (submenu) {
            submenu.classList.toggle('open');
            arrow?.classList.toggle('rotated');
        }
    }

    navigateTo(page) {
        if (this.currentPage === page) return;
        
        this.currentPage = page;
        this.updateActiveNav();
        this.loadPage(page);
        this.updateBreadcrumb(page);
        
        // Update URL without page reload
        history.pushState({ page }, '', `#${page}`);
    }

    updateActiveNav() {
        // Remove active class from all nav links
        document.querySelectorAll('[data-nav-link]').forEach(link => {
            link.classList.remove('active');
        });
        
        // Add active class to current page
        const activeLink = document.querySelector(`[data-nav-link][data-page="${this.currentPage}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    async loadPage(page) {
        const content = document.querySelector('[data-content]');
        if (!content) return;
        
        // Show loading state
        content.innerHTML = this.pageLoader.getLoadingContent(page);
        
        try {
            // Load page content using page loader
            const pageContent = await this.pageLoader.loadPage(page);
            content.innerHTML = pageContent;
            
            // Initialize page-specific functionality
            this.initializePageContent(page);
            
        } catch (error) {
            console.error('Error loading page:', error);
            content.innerHTML = this.pageLoader.getErrorContent(page, error.message);
        }
    }


    initializePageContent(page) {
        // Initialize page-specific functionality
        this.initializeTables();
        this.initializeButtons();
        this.initializeForms();
    }

    initializeTables() {
        // Add table functionality
        const tables = document.querySelectorAll('.table');
        tables.forEach(table => {
            this.addTableFeatures(table);
        });
    }

    addTableFeatures(table) {
        // Add sorting functionality
        const headers = table.querySelectorAll('th[data-sort]');
        headers.forEach(header => {
            header.style.cursor = 'pointer';
            header.addEventListener('click', () => {
                this.sortTable(table, header);
            });
        });
        
        // Add row selection
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
            row.addEventListener('click', (e) => {
                if (!e.target.matches('button, a, input')) {
                    this.toggleRowSelection(row);
                }
            });
        });
    }

    sortTable(table, header) {
        const column = header.getAttribute('data-sort');
        const tbody = table.querySelector('tbody');
        const rows = Array.from(tbody.querySelectorAll('tr'));
        
        const isAscending = header.classList.contains('sort-asc');
        
        rows.sort((a, b) => {
            const aVal = a.querySelector(`[data-sort-value="${column}"]`)?.textContent || '';
            const bVal = b.querySelector(`[data-sort-value="${column}"]`)?.textContent || '';
            
            if (isAscending) {
                return bVal.localeCompare(aVal);
            } else {
                return aVal.localeCompare(bVal);
            }
        });
        
        // Clear existing rows
        tbody.innerHTML = '';
        
        // Add sorted rows
        rows.forEach(row => tbody.appendChild(row));
        
        // Update header classes
        table.querySelectorAll('th').forEach(th => {
            th.classList.remove('sort-asc', 'sort-desc');
        });
        
        header.classList.add(isAscending ? 'sort-desc' : 'sort-asc');
    }

    toggleRowSelection(row) {
        row.classList.toggle('selected');
    }

    initializeButtons() {
        // Add loading states to buttons
        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                if (btn.hasAttribute('data-loading')) {
                    this.setButtonLoading(btn, true);
                }
            });
        });
    }

    setButtonLoading(button, loading) {
        if (loading) {
            button.setAttribute('data-original-text', button.textContent);
            button.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Loading...';
            button.disabled = true;
        } else {
            const originalText = button.getAttribute('data-original-text');
            if (originalText) {
                button.innerHTML = originalText;
                button.removeAttribute('data-original-text');
            }
            button.disabled = false;
        }
    }

    initializeForms() {
        // Add form validation
        const forms = document.querySelectorAll('[data-form]');
        forms.forEach(form => {
            this.addFormValidation(form);
        });
    }

    addFormValidation(form) {
        const inputs = form.querySelectorAll('[data-validate]');
        
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateInput(input);
            });
            
            input.addEventListener('input', () => {
                this.clearInputError(input);
            });
        });
    }

    validateInput(input) {
        const rules = input.getAttribute('data-validate').split('|');
        let isValid = true;
        
        rules.forEach(rule => {
            if (!this.validateRule(input, rule)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            this.showInputError(input, 'Please check your input');
        } else {
            this.clearInputError(input);
        }
        
        return isValid;
    }

    validateRule(input, rule) {
        const value = input.value.trim();
        
        switch (rule) {
            case 'required':
                return value.length > 0;
            case 'email':
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            case 'min:3':
                return value.length >= 3;
            case 'numeric':
                return /^\d+$/.test(value);
            default:
                return true;
        }
    }

    showInputError(input, message) {
        this.clearInputError(input);
        
        input.classList.add('error');
        
        const errorDiv = document.createElement('div');
        errorDiv.className = 'input-error text-red-500 text-sm mt-1';
        errorDiv.textContent = message;
        
        input.parentNode.appendChild(errorDiv);
    }

    clearInputError(input) {
        input.classList.remove('error');
        const errorDiv = input.parentNode.querySelector('.input-error');
        if (errorDiv) {
            errorDiv.remove();
        }
    }

    handleFormSubmit(form) {
        const inputs = form.querySelectorAll('[data-validate]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (!this.validateInput(input)) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            return;
        }
        
        // Show loading state
        const submitBtn = form.querySelector('[type="submit"]');
        if (submitBtn) {
            this.setButtonLoading(submitBtn, true);
        }
        
        // Simulate form submission
        setTimeout(() => {
            this.showNotification('Form submitted successfully!', 'success');
            if (submitBtn) {
                this.setButtonLoading(submitBtn, false);
            }
        }, 2000);
    }

    openModal(modalId) {
        const modal = this.modals[modalId];
        if (modal) {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            
            // Focus first input
            const firstInput = modal.querySelector('input, textarea, select');
            if (firstInput) {
                setTimeout(() => firstInput.focus(), 100);
            }
        }
    }

    closeModal(modalId) {
        const modal = this.modals[modalId];
        if (modal) {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }
    }

    closeAllModals() {
        Object.keys(this.modals).forEach(modalId => {
            this.closeModal(modalId);
        });
    }

    handleSearch(e) {
        const query = e.target.value.toLowerCase();
        const tables = document.querySelectorAll('.table tbody tr');
        
        tables.forEach(row => {
            const text = row.textContent.toLowerCase();
            if (text.includes(query)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    focusSearch() {
        const searchInput = document.querySelector('[data-search]');
        if (searchInput) {
            searchInput.focus();
        }
    }

    handleResize() {
        if (window.innerWidth <= 1024 && this.sidebarOpen) {
            this.toggleSidebar();
        }
    }

    updateBreadcrumb(page) {
        const breadcrumb = document.querySelector('[data-breadcrumb]');
        if (breadcrumb) {
            const breadcrumbMap = {
                'pre-order': 'Customer > Pre Order',
                'renew': 'Customer > Renew',
                'waiting-list': 'Customer > Waiting List',
                'aktif': 'Customer > Aktif',
                'cancelled': 'Customer > Cancelled',
                'groups': 'Groups & Accounts > Groups',
                'expired-account': 'Groups & Accounts > Expired Account',
                'expired-3-days': 'Groups & Accounts > Expired in 3 Days',
                'expired-7-days': 'Groups & Accounts > Expired in 7 Days',
                'kategori-provider': 'Provider > Kategori Provider',
                'provider': 'Provider > Provider',
                'employee': 'Employee'
            };
            
            breadcrumb.textContent = breadcrumbMap[page] || 'Dashboard';
        }
    }

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type} fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50`;
        notification.innerHTML = `
            <div class="flex items-center gap-3">
                <i class="fas fa-${this.getNotificationIcon(type)}"></i>
                <span>${message}</span>
                <button onclick="this.parentElement.parentElement.remove()" class="ml-2 text-gray-500 hover:text-gray-700">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 5000);
    }

    getNotificationIcon(type) {
        const icons = {
            'success': 'check-circle',
            'error': 'exclamation-circle',
            'warning': 'exclamation-triangle',
            'info': 'info-circle'
        };
        return icons[type] || 'info-circle';
    }

    // Utility functions
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize dashboard when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.dashboard = new ShareAkunDashboard();
});

// Handle browser back/forward buttons
window.addEventListener('popstate', (e) => {
    if (e.state && e.state.page) {
        window.dashboard.navigateTo(e.state.page);
    }
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ShareAkunDashboard;
}
