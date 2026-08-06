// @/src/main.ts
// import { ViteSSG } from 'vite-ssg'
// import { createPinia } from 'pinia'
// import App from './App.vue'
// import router from './router'

// // 使用 ViteSSG 代替 createApp
// export const createApp = ViteSSG(
//   App,
//   {
//     routes: router.options.routes, // 使用 router 配置的路由
//     scrollBehavior(to, from, savedPosition) {
//       // 保留浏览器返回时的滚动位置
//       return savedPosition || { top: 0 }
//     },
//   },
//   // 第三个参数是回调，可注册插件或全局逻辑
//   ({ app, router, routes, isClient }) => {
//     app.use(createPinia())
//   },
// )

// const app = createApp(App)

// app.use(createPinia())
// app.use(router)

// app.mount('#app')

//

async function initapp() {
  try {
    const loadCSS = (url: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        // 检查是否已经加载过
        if (document.querySelector(`link[href="${url}"]`)) {
          resolve()
          return
        }

        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = url
        link.onload = () => resolve()
        link.onerror = () => reject(new Error(`Failed to load CSS: ${url}`))

        document.head.appendChild(link)
      })
    }
    const loadScript = (url: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${url}"]`)) {
          resolve()
          return
        }

        const script = document.createElement('script')
        script.src = url
        script.type = 'text/javascript'
        script.onload = () => resolve()
        script.onerror = () => reject(new Error(`Failed to load script: ${url}`))

        document.head.appendChild(script)
      })
    }
    const waitForPageChange = (): Promise<void> => {
      return new Promise((resolve) => {
        const observer = new MutationObserver((mutations) => {
          // 检测到任何变化就停止观察并解析
          observer.disconnect()
          resolve()
        })

        // 观察整个文档的变化
        observer.observe(document.body, {
          childList: true, // 子节点的变化
          subtree: true, // 所有后代节点
          attributes: false, // 不观察属性变化
          characterData: false, // 不观察文本内容变化
        })

        // 设置超时，确保不会无限等待
        setTimeout(() => {
          observer.disconnect()
          resolve()
        }, 10000) // 10秒超时
      })
    }
    function preloadBootstrapIcons() {
      const icon = document.createElement('i')
      icon.className = 'bi bi-alarm'
      icon.style.cssText = 'opacity:0; position:absolute; left:-9999px;'
      document.body.appendChild(icon)

      // 下一帧删除
      requestAnimationFrame(() => {
        icon.remove()
      })
    }

    const { setLoadingTitle, removeLoadingContainer, updateProgress } = await import(
      '@/utils/after-app-mounted-dom'
    )

    updateProgress(5)
    setLoadingTitle('Downloading BootStrap ...')

    await loadCSS(
      'https://static-cf4-cf6.yt437700.top/resources/bootstrap/5.3.3-dist/css/bootstrap.min.css',
    )
    updateProgress(15)
    await loadScript(
      'https://static-cf4-cf6.yt437700.top/resources/bootstrap/5.3.3-dist/js/bootstrap.bundle.min.js',
    )

    updateProgress(35)
    setLoadingTitle('Downloading BootStrap Icons ...')
    await loadCSS(
      'https://static-cf4-cf6.yt437700.top/resources/bootstrap-icons@1.13.1/font/bootstrap-icons.min.css',
    )
    preloadBootstrapIcons()

    updateProgress(50)
    await loadScript(
      'https://static-cf4-cf6.yt437700.top/resources/plyr/release_latest/plyr.min.js',
    )
    await loadCSS('https://static-cf4-cf6.yt437700.top/resources/plyr/release_latest/plyr.min.css')
    updateProgress(65)
    setLoadingTitle('Initializing Application...')
    await new Promise((resolve) => setTimeout(resolve, 100))

    const { ViteSSG } = await import('vite-ssg')
    const { createPinia } = await import('pinia')
    const { default: App } = await import('./App.vue') // 改成解构
    const { default: router } = await import('./router') // 正确获取默认导出

    updateProgress(85)
    // 使用 ViteSSG 代替 createApp
    const createApp = ViteSSG(
      App,
      {
        routes: router.options.routes, // 使用 router 配置的路由
        scrollBehavior(to, from, savedPosition) {
          // 保留浏览器返回时的滚动位置
          return savedPosition || { top: 0 }
        },
      },
      // 第三个参数是回调，可注册插件或全局逻辑
      ({ app, router, routes, isClient }) => {
        app.use(createPinia())
      },
    )

    updateProgress(95)
    setLoadingTitle('Rendering Application...')
    // app.mount('#app')
    waitForPageChange().then(() => {
      // removeLoadingContainer();
      waitForPageChange().then(() => {
        updateProgress(100)
        setTimeout(() => removeLoadingContainer(), 250)
      })
    })

    return createApp
  } catch (e) {
    try {
      const { setAppLoadingError } = await import('@/utils/after-app-mounted-dom')
      setAppLoadingError(e)
    } catch {
      // 忽略错误处理中的错误
    }
  }
}

export const createApp = await initapp();