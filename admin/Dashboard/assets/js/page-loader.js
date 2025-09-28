/**
 * ShareAkun Dashboard - Page Loader
 * Handles dynamic page loading and content management
 */

class PageLoader {
    constructor() {
        this.pages = new Map();
        this.currentPage = null;
        this.basePath = 'pages/';
    }

    /**
     * Load page content dynamically
     * @param {string} pageName - Name of the page to load
     * @returns {Promise<string>} - HTML content of the page
     */
    async loadPage(pageName) {
        try {
            // Check if page is already cached
            if (this.pages.has(pageName)) {
                return this.pages.get(pageName);
            }

            // Map page names to file paths
            const pageMap = {
                'pre-order': 'customer/pre-order.html',
                'renew': 'customer/renew.html',
                'waiting-list': 'customer/waiting-list.html',
                'aktif': 'customer/aktif.html',
                'cancelled': 'customer/cancelled.html',
                'groups': 'groups/groups.html',
                'expired-account': 'groups/expired-account.html',
                'expired-3-days': 'groups/expired-3-days.html',
                'expired-7-days': 'groups/expired-7-days.html',
                'kategori-provider': 'provider/kategori-provider.html',
                'provider': 'provider/provider.html',
                'employee': 'employee/employee.html'
            };

            const pagePath = pageMap[pageName];
            if (!pagePath) {
                throw new Error(`Page '${pageName}' not found`);
            }

            // Load page content
            const response = await fetch(`${this.basePath}${pagePath}`);
            if (!response.ok) {
                throw new Error(`Failed to load page: ${response.statusText}`);
            }

            const content = await response.text();
            
            // Cache the page content
            this.pages.set(pageName, content);
            
            return content;

        } catch (error) {
            console.error('Error loading page:', error);
            return this.getErrorContent(pageName, error.message);
        }
    }

    /**
     * Get error content for failed page loads
     * @param {string} pageName - Name of the page that failed to load
     * @param {string} errorMessage - Error message to display
     * @returns {string} - Error HTML content
     */
    getErrorContent(pageName, errorMessage) {
        return `
            <div class="card animate-fade-in">
                <div class="card-body">
                    <div class="text-center py-12">
                        <div class="text-red-500 mb-6">
                            <i class="fas fa-exclamation-triangle fa-4x mb-4"></i>
                            <h2 class="text-2xl font-bold mb-2">Error Loading Page</h2>
                            <p class="text-gray-600 mb-4">Failed to load "${pageName}" page</p>
                            <p class="text-sm text-gray-500">${errorMessage}</p>
                        </div>
                        <div class="flex gap-3 justify-center">
                            <button class="btn btn-primary" onclick="dashboard.loadPage('${pageName}')">
                                <i class="fas fa-refresh mr-2"></i>Retry
                            </button>
                            <button class="btn btn-outline" onclick="dashboard.navigateTo('waiting-list')">
                                <i class="fas fa-home mr-2"></i>Go Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Get placeholder content while page is loading
     * @param {string} pageName - Name of the page being loaded
     * @returns {string} - Loading HTML content
     */
    getLoadingContent(pageName) {
        const pageTitles = {
            'pre-order': 'Pre Order',
            'renew': 'Renew',
            'waiting-list': 'Waiting List',
            'aktif': 'Aktif',
            'cancelled': 'Cancelled',
            'groups': 'Groups',
            'expired-account': 'Expired Account',
            'expired-3-days': 'Expired in 3 Days',
            'expired-7-days': 'Expired in 7 Days',
            'kategori-provider': 'Kategori Provider',
            'provider': 'Provider',
            'employee': 'Employee'
        };

        return `
            <div class="card animate-fade-in">
                <div class="card-header">
                    <h1 class="card-title">${pageTitles[pageName] || 'Dashboard'}</h1>
                </div>
                <div class="card-body">
                    <div class="text-center py-12">
                        <div class="loading-spinner mb-4">
                            <i class="fas fa-spinner fa-spin fa-3x text-blue-500"></i>
                        </div>
                        <p class="text-lg text-gray-600 mb-2">Loading ${pageTitles[pageName] || 'page'}...</p>
                        <p class="text-sm text-gray-500">Please wait while we load the content</p>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Clear page cache
     * @param {string} pageName - Optional specific page to clear, or all if not provided
     */
    clearCache(pageName = null) {
        if (pageName) {
            this.pages.delete(pageName);
        } else {
            this.pages.clear();
        }
    }

    /**
     * Preload multiple pages
     * @param {string[]} pageNames - Array of page names to preload
     */
    async preloadPages(pageNames) {
        const loadPromises = pageNames.map(pageName => this.loadPage(pageName));
        await Promise.allSettled(loadPromises);
    }

    /**
     * Get cached page count
     * @returns {number} - Number of cached pages
     */
    getCacheSize() {
        return this.pages.size;
    }

    /**
     * Check if page is cached
     * @param {string} pageName - Name of the page to check
     * @returns {boolean} - True if page is cached
     */
    isCached(pageName) {
        return this.pages.has(pageName);
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PageLoader;
} else {
    window.PageLoader = PageLoader;
}

