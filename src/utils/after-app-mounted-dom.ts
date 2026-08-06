async function setAppLoadingError(errorMessage: unknown) {
    try {// 精确定位到 #before-app-mounted 内的 loading-error 和 error-message 元素
        const beforeAppMounted = document.getElementById('before-app-mounted');
        if (beforeAppMounted) {
            // 显示错误容器
            const loadingError = beforeAppMounted.querySelector('.loading-error') as HTMLElement | null;
            if (loadingError) {
                loadingError.style.display = '';
            }

            // 设置错误信息
            const errorMessageElement = beforeAppMounted.querySelector('.error-message');
            if (errorMessageElement) {
                if (errorMessage instanceof Error) errorMessageElement.textContent = errorMessage.message;
            }

            // 隐藏加载动画
            const elementLoader = beforeAppMounted.querySelector('.element-loader') as HTMLElement | null;
            if (elementLoader) {
                elementLoader.style.display = 'none';
            }

            // 隐藏加载标题
            const loadingTitle = beforeAppMounted.querySelector('.loading-title') as HTMLElement | null;
            if (loadingTitle) {
                loadingTitle.style.display = 'none';
            }
        }
    }
    catch {

    }
}
async function setLoadingTitle(title: string) {
    try {
        // 精确定位到 #before-app-mounted 内的 loading-title 元素
        const beforeAppMounted = document.getElementById('before-app-mounted');
        if (beforeAppMounted) {
            const loadingTitle = beforeAppMounted.querySelector('.loading-title');
            if (loadingTitle) {
                loadingTitle.textContent = title;
            } else {
                console.warn("Not found!")
            }
        }
    }
    catch {

    }
}
function removeLoadingContainer() {
    try {
        const loadingContainer = document.getElementById("before-app-mounted")
        if (loadingContainer) {
            loadingContainer.remove();
        } else { console.warn("No C Found!") }
    }
    catch {
        try {
            if (confirm("Unexpected Error Occurred. Please try again.")) window.location.reload()
        } catch { }
    }
}
export {
    setAppLoadingError,
    setLoadingTitle,
    removeLoadingContainer
}