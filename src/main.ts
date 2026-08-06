// @/src/main.ts
import { ViteSSG } from 'vite-ssg'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

export const createApp = ViteSSG(
  App,
  {
    routes: router.options.routes,
    scrollBehavior(to, from, savedPosition) {
      return savedPosition || { top: 0 }
    },
  },
  async ({ app }) => {
    app.use(createPinia())
    if (typeof document !== 'undefined') {
      const {
        setLoadingTitle,
        removeLoadingContainer,
        updateProgress,
      } = await import('./utils/after-app-mounted-dom')

      const loadCSS = (url: string): Promise<void> => {
        return new Promise((resolve, reject) => {
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
          const observer = new MutationObserver(() => {
            observer.disconnect()
            resolve()
          })

          observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: false,
            characterData: false,
          })

          setTimeout(() => {
            observer.disconnect()
            resolve()
          }, 1000)
        })
      }
      function preloadBootstrapIcons() {
        const icon = document.createElement('i')
        icon.className = 'bi bi-alarm'
        icon.style.cssText = 'opacity:0; position:absolute; left:-9999px;'
        document.body.appendChild(icon)

        requestAnimationFrame(() => {
          icon.remove()
        })
      }

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
      await loadCSS(
        'https://static-cf4-cf6.yt437700.top/resources/plyr/release_latest/plyr.min.css',
      )
      updateProgress(65)
      setLoadingTitle('Initializing Application...')
      await new Promise((resolve) => setTimeout(resolve, 100))

      updateProgress(85)

      updateProgress(95)
      setLoadingTitle('Rendering Application...')
      waitForPageChange().then(() => {
        waitForPageChange().then(() => {
          updateProgress(100)
          setTimeout(() => removeLoadingContainer(), 250)
        })
      })
    }
  },
)