// Improved loading spinner with modern design
function showSpinner(show = true) {
   
    const existingSpinner = document.querySelector('.paychangu-loading-container');
    if (existingSpinner) existingSpinner.remove();
    
    if (show) {
        // Create spinner HTML with modern design
        const spinnerHTML = `
            <div class="paychangu-loading-container">
                <div class="w-screen h-screen bg-black flex items-center justify-center fixed inset-0 z-[99999]">
                    <section class="text-white text-center">
                        <div class="ml-34">
                            <!-- Custom Spinner using pure CSS -->
                           <svg xmlns="http://www.w3.org/2000/svg" width="2em" height="2em" viewBox="0 0 24 24"><!-- Icon from SVG Spinners by Utkarsh Verma - https://github.com/n3r4zzurr0/svg-spinners/blob/main/LICENSE --><g><circle cx="12" cy="2.5" r="1.5" fill="currentColor" opacity=".14" /><circle cx="16.75" cy="3.77" r="1.5" fill="currentColor" opacity=".29" /><circle cx="20.23" cy="7.25" r="1.5" fill="currentColor" opacity=".43" /><circle cx="21.5" cy="12" r="1.5" fill="currentColor" opacity=".57" /><circle cx="20.23" cy="16.75" r="1.5" fill="currentColor" opacity=".71" /><circle cx="16.75" cy="20.23" r="1.5" fill="currentColor" opacity=".86" /><circle cx="12" cy="21.5" r="1.5" fill="currentColor" /><animateTransform attributeName="transform" calcMode="discrete" dur="0.75s" repeatCount="indefinite" type="rotate" values="0 12 12;30 12 12;60 12 12;90 12 12;120 12 12;150 12 12;180 12 12;210 12 12;240 12 12;270 12 12;300 12 12;330 12 12;360 12 12" /></g></svg>

                        </div>
                        <h1 class="text-4xl font-medium mt-4">Please wait...</h1>
                        <p class="text-white/40 text-xs mt-2">
                            We are processing your request. Thank you for your patience.
                        </p>
                    </section>
                </div>
            </div>
        `;
        
        // Add spinner styles
        const style = document.createElement('style');
        style.textContent = `
            .paychangu-loading-container {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 99999;
            }
            
            .custom-spinner {
                display: flex;
                justify-content: center;
                gap: 12px;
                width: 50px;
                height: 50px;
                margin: 0 auto;
                position: relative;
            }
            
            .spinner-circle {
                width: 12px;
                height: 12px;
                background: rgba(255, 255, 255, 1);
                border-radius: 50%;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                animation: spinnerBounce 1.4s infinite ease-in-out both;
            }
            
            .spinner-circle:nth-child(1) {
                transform: translate(-50%, -50%) translateX(-20px);
                animation-delay: -0.32s;
            }
            
            .spinner-circle:nth-child(2) {
                transform: translate(-50%, -50%);
                animation-delay: -0.16s;
            }
            
            .spinner-circle:nth-child(3) {
                transform: translate(-50%, -50%) translateX(20px);
                animation-delay: 0s;
            }
            
            @keyframes spinnerBounce {
                0%, 80%, 100% { 
                    transform: translate(-50%, -50%) scale(0);
                    opacity: 0.5;
                }
                40% { 
                    transform: translate(-50%, -50%) scale(1);
                    opacity: 1;
                }
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .paychangu-loading-container {
                animation: fadeIn 0.3s ease;
            }
        `;
        
        document.head.appendChild(style);
        document.body.insertAdjacentHTML('beforeend', spinnerHTML);
    }
}

function hideSpinner() {
    const spinner = document.querySelector('.paychangu-loading-container');
    if (spinner) {
        spinner.style.opacity = '0';
        spinner.style.transition = 'opacity 0.3s ease';
        setTimeout(() => spinner.remove(), 300);
    }
}

// Enhanced Modal with Modern Light Theme
function buildDataModal(data, type = "message") {
    // Remove existing modal
    const existingModal = document.getElementById("paychangu-modal");
    if (existingModal) existingModal.remove();
    
    const message = type === "message" 
        ? data.message 
        : Object.values(data.validate || {})[0] || "An error occurred";
    
    // Determine modal type and styling
    const modalConfig = {
        message: {
            icon: 'info',
            title: 'Information',
            color: '#3b82f6',
            gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)'
        },
        validate: {
            icon: 'alert',
            title: 'Validation Error',
            color: '#f59e0b',
            gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
        },
        error: {
            icon: 'error',
            title: 'Error',
            color: '#ef4444',
            gradient: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)'
        },
        success: {
            icon: 'success',
            title: 'Success',
            color: '#10b981',
            gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
        }
    };
    
    const config = modalConfig[type] || modalConfig.message;
    
    const modalHTML = `
        <div id="paychangu-modal" class="paychangu-modal">
            <div class="paychangu-modal-overlay"></div>
            <div class="paychangu-modal-container">
                <div class="paychangu-modal-content">
                    <div class="modal-header" style="background: ${config.gradient}">
                        <div class="modal-icon">
                            ${getIconSVG(config.icon)}
                        </div>
                        <h3 class="modal-title">${config.title}</h3>
                        <button class="modal-close">&times;</button>
                    </div>
                    <div class="modal-body">
                        <p>${message}</p>
                    </div>
                    <div class="modal-footer">
                        <button class="modal-button modal-button-primary" style="background: ${config.color}">
                            OK
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Add modal styles (light theme)
    const style = document.createElement('style');
    style.textContent = `
        .paychangu-modal {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 100000;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }
        
        .paychangu-modal-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(4px);
            animation: modalFadeIn 0.3s ease;
        }
        
        .paychangu-modal-container {
            position: relative;
            z-index: 2;
            width: 90%;
            max-width: 420px;
            animation: modalSlideUp 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        .paychangu-modal-content {
            background: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 20px 50px rgba(0, 0, 0, 0.2);
        }
        
        .modal-header {
            padding: 24px;
            display: flex;
            align-items: center;
            gap: 16px;
            position: relative;
            min-height: 80px;
        }
        
        .modal-icon {
            width: 48px;
            height: 48px;
            border-radius: 12px;
            background: rgba(255, 255, 255, 0.2);
            backdrop-filter: blur(10px);
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        
        .modal-icon svg {
            width: 28px;
            height: 28px;
            color: white;
            filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        }
        
        .modal-title {
            margin: 0;
            font-size: 1.5rem;
            font-weight: 600;
            color: white;
            flex: 1;
            text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }
        
        .modal-close {
            background: rgba(255, 255, 255, 0.2);
            border: none;
            font-size: 28px;
            color: white;
            cursor: pointer;
            padding: 0;
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 8px;
            transition: all 0.2s;
            backdrop-filter: blur(4px);
        }
        
        .modal-close:hover {
            background: rgba(255, 255, 255, 0.3);
            transform: rotate(90deg);
        }
        
        .modal-body {
            padding: 32px 24px;
            color: #374151;
            line-height: 1.6;
            font-size: 1.05rem;
            background: #f9fafb;
        }
        
        .modal-body p {
            margin: 0;
        }
        
        .modal-footer {
            padding: 20px 24px;
            display: flex;
            justify-content: flex-end;
            background: white;
            border-top: 1px solid #e5e7eb;
        }
        
        .modal-button {
            padding: 12px 28px;
            border-radius: 10px;
            border: none;
            font-size: 1rem;
            font-weight: 500;
            cursor: pointer;
            transition: all 0.2s;
            color: white;
            min-width: 100px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
        
        .modal-button-primary {
            background: #3b82f6;
        }
        
        .modal-button-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
            opacity: 0.9;
        }
        
        .modal-button-primary:active {
            transform: translateY(0);
        }
        
        @keyframes modalFadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        
        @keyframes modalSlideUp {
            from {
                opacity: 0;
                transform: translateY(60px) scale(0.95);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
        
        /* Mobile responsiveness */
        @media (max-width: 640px) {
            .paychangu-modal-container {
                width: 95%;
                margin: 0 10px;
            }
            
            .modal-header {
                padding: 20px;
                gap: 12px;
                min-height: 70px;
            }
            
            .modal-icon {
                width: 40px;
                height: 40px;
            }
            
            .modal-icon svg {
                width: 24px;
                height: 24px;
            }
            
            .modal-title {
                font-size: 1.3rem;
            }
            
            .modal-body {
                padding: 24px 20px;
                font-size: 1rem;
            }
            
            .modal-footer {
                padding: 16px 20px;
            }
            
            .modal-button {
                padding: 10px 24px;
                font-size: 0.95rem;
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById("paychangu-modal");
    const closeButtons = modal.querySelectorAll('.modal-close, .modal-button-primary');
    
    // Add enter/exit animations
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.95)';
    
    setTimeout(() => {
        modal.style.transition = 'all 0.3s ease';
        modal.style.opacity = '1';
        modal.style.transform = 'scale(1)';
    }, 10);
    
    closeButtons.forEach(button => {
        button.onclick = () => {
            modal.style.opacity = '0';
            modal.style.transform = 'scale(0.95)';
            setTimeout(() => modal.remove(), 300);
        };
    });
    
    // Close on overlay click
    modal.querySelector('.paychangu-modal-overlay').onclick = () => {
        modal.style.opacity = '0';
        setTimeout(() => modal.remove(), 300);
    };
    
    // Close on escape key
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            modal.style.opacity = '0';
            modal.style.transform = 'scale(0.95)';
            setTimeout(() => {
                modal.remove();
                document.removeEventListener('keydown', escapeHandler);
            }, 300);
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

// Helper function for SVG icons
function getIconSVG(type) {
    const icons = {
        info: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>`,
        alert: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.406 16.5c-.77.833.192 2.5 1.732 2.5z"/>
              </svg>`,
        error: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>`,
        success: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>`
    };
    return icons[type] || icons.info;
}

// Enhanced Toast Notification System
function showToast(message, type = 'info', duration = 5000) {
    const existingToast = document.querySelector('.paychangu-toast');
    if (existingToast) existingToast.remove();
    
    const config = {
        success: { icon: '✓', color: '#10b981', bg: '#ecfdf5', border: '#10b981' },
        error: { icon: '✕', color: '#ef4444', bg: '#fef2f2', border: '#ef4444' },
        warning: { icon: '⚠', color: '#f59e0b', bg: '#fffbeb', border: '#f59e0b' },
        info: { icon: 'ⓘ', color: '#3b82f6', bg: '#eff6ff', border: '#3b82f6' }
    };
    
    const toastConfig = config[type] || config.info;
    
    const toast = document.createElement('div');
    toast.className = 'paychangu-toast';
    toast.innerHTML = `
        <div class="toast-icon" style="background: ${toastConfig.color}">${toastConfig.icon}</div>
        <div class="toast-content">${message}</div>
        <button class="toast-close">×</button>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .paychangu-toast {
            position: fixed;
            top: 24px;
            right: 24px;
            background: white;
            border-radius: 12px;
            padding: 16px 20px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
            display: flex;
            align-items: center;
            gap: 12px;
            min-width: 300px;
            max-width: 400px;
            z-index: 100001;
            animation: toastSlideIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            border-left: 4px solid ${toastConfig.border};
            transform-origin: top right;
        }
        
        .toast-icon {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: ${toastConfig.color};
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            font-size: 14px;
            flex-shrink: 0;
        }
        
        .toast-content {
            flex: 1;
            color: #374151;
            font-size: 14px;
            line-height: 1.4;
        }
        
        .toast-close {
            background: none;
            border: none;
            color: #9ca3af;
            font-size: 20px;
            cursor: pointer;
            padding: 0;
            width: 24px;
            height: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 4px;
            transition: all 0.2s;
        }
        
        .toast-close:hover {
            background: #f3f4f6;
            color: #6b7280;
        }
        
        @keyframes toastSlideIn {
            from {
                opacity: 0;
                transform: translateX(100%);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }
        
        @keyframes toastSlideOut {
            to {
                opacity: 0;
                transform: translateX(100%);
            }
        }
    `;
    
    document.head.appendChild(style);
    document.body.appendChild(toast);
    
    const timer = setTimeout(() => {
        toast.style.animation = 'toastSlideOut 0.3s forwards';
        setTimeout(() => toast.remove(), 300);
    }, duration);
    
    toast.querySelector('.toast-close').onclick = () => {
        clearTimeout(timer);
        toast.style.animation = 'toastSlideOut 0.3s forwards';
        setTimeout(() => toast.remove(), 300);
    };
    
    toast.addEventListener('mouseenter', () => clearTimeout(timer));
    toast.addEventListener('mouseleave', () => {
        setTimeout(() => {
            toast.style.animation = 'toastSlideOut 0.3s forwards';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    });
}

// Enhanced Iframe with Modern Controls
function buildIframe(url, attributes) {
    const existingIframe = document.getElementById("iframe1");
    if (existingIframe) existingIframe.remove();
    
    const wrapper = document.getElementById("wrapper") || document.body;
    const iframe = document.createElement("iframe");
    
    Object.keys(attributes).forEach(key => {
        iframe.setAttribute(key, attributes[key]);
    });
    
    Object.assign(iframe.style, {
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        border: "none",
        margin: "0",
        padding: "0",
        overflow: "hidden",
        "z-index": "99998",
        "background": "white",
        "animation": "iframeFadeIn 0.3s ease"
    });
    
    // Modern close button for iframe
    const closeButton = document.createElement('button');
    closeButton.innerHTML = '✕';
    closeButton.className = 'iframe-close';
    Object.assign(closeButton.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        width: '44px',
        height: '44px',
        borderRadius: '50%',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        border: 'none',
        fontSize: '20px',
        cursor: 'pointer',
        zIndex: '99999',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        fontWeight: 'bold'
    });
    
    closeButton.onclick = () => {
        iframe.style.opacity = '0';
        iframe.style.transform = 'scale(0.95)';
        closeButton.style.opacity = '0';
        closeButton.style.transform = 'scale(0.8)';
        setTimeout(() => {
            iframe.remove();
            closeButton.remove();
            hideSpinner();
            document.removeEventListener('keydown', escapeHandler);
        }, 300);
    };
    
    closeButton.onmouseenter = () => {
        closeButton.style.background = '#ef4444';
        closeButton.style.transform = 'scale(1.1)';
        closeButton.style.boxShadow = '0 6px 16px rgba(239, 68, 68, 0.4)';
    };
    
    closeButton.onmouseleave = () => {
        closeButton.style.background = 'rgba(0, 0, 0, 0.8)';
        closeButton.style.transform = 'scale(1)';
        closeButton.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    };
    
    iframe.onload = () => {
        hideSpinner();
        showToast('Payment gateway loaded successfully', 'success', 2000);
    };
    
    wrapper.appendChild(iframe);
    document.body.appendChild(closeButton);
    
    const escapeHandler = (e) => {
        if (e.key === 'Escape') {
            closeButton.click();
        }
    };
    document.addEventListener('keydown', escapeHandler);
}

// Enhanced PaychanguCheckout function
function PaychanguCheckout(config) {
    showSpinner(true);
    
    const payload = {
        tx_ref: config.tx_ref,
        amount: config.amount,
        currency: config.currency,
        callback_url: config.callback_url,
        return_url: config.return_url,
        customer: {
            email: config.customer?.email || null,
            first_name: config.customer?.first_name || null,
            last_name: config.customer?.last_name || null
        },
        customization: {
            title: config.customization?.title || null,
            description: config.customization?.description || null,
            logo: config.customization?.logo || null,
        },
        meta: config.meta,
    };

    const endpointUrl = "https://api.paychangu.com/popup_transfer";

    fetch(endpointUrl, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + config.public_key,
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        hideSpinner();
        
        if (data.data?.checkout_url) {
            const checkoutUrl = data.data.checkout_url;
            buildIframe(checkoutUrl, { 
                src: checkoutUrl, 
                id: "iframe1", 
                class: "paychangu-checkout-iframe", 
                width: "100%", 
                height: "100%", 
                scrolling: "auto",
                allow: "payment *"
            });
        } else if (data.message) {
            const modalType = data.status === 'error' ? 'error' : 
                            typeof data.message === 'object' ? 'validate' : 'message';
            buildDataModal(data, modalType);
        } else {
            buildDataModal({ message: "An unexpected error occurred" }, "error");
        }
    })
    .catch(error => {
        hideSpinner();
        console.error("Payment Error:", error);
        
        let errorMessage = "A technical error has occurred. Please try again";
        if (navigator.onLine === false) {
            errorMessage = "You are offline. Please check your internet connection";
        } else if (error.message.includes('Failed to fetch')) {
            errorMessage = "Unable to connect to payment service. Please try again later";
        }
        
        buildDataModal({ message: errorMessage }, "error");
    });
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
    console.log("Paychangu Enhanced UI Loaded");
});