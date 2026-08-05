// ... existing code ...
export const initImageLoader = () => {
  console.log('初始化图片加载器...')
  console.log('initImageLoader 函数开始执行')

  // 记录已处理的图片元素，避免重复处理
  const processedImages = new WeakSet<HTMLImageElement>()
  
  // 触发器+限速+懒查询配置
  const TRIGGER_CONFIG = {
    debounceDelay: 100,    // 防抖延迟
    lazyQueryInterval: 12000, // 持续懒查询间隔
    maxLazyQueries: 50       // 最大懒查询次数
  }

  // 状态管理
  let debounceTimeout: number | null = null
  let lazyQueryTimeout: number | null = null
  let lazyQueryCount = 0
  let isProcessing = false

  // 防抖触发器函数
  const triggerDebouncedProcess = () => {
    // 清除之前的防抖定时器
    if (debounceTimeout !== null) {
      clearTimeout(debounceTimeout)
    }
    
    // 设置新的防抖定时器
    debounceTimeout = window.setTimeout(() => {
      console.log('防抖延迟结束，开始处理图片')
      processImages()
    }, TRIGGER_CONFIG.debounceDelay)
  }

  // 启动持续懒查询
  const startLazyQuery = () => {
    if (lazyQueryCount >= TRIGGER_CONFIG.maxLazyQueries) {
      console.log('达到最大懒查询次数，停止持续查询')
      return
    }

    lazyQueryTimeout = window.setTimeout(() => {
      lazyQueryCount++
      console.log(`第${lazyQueryCount}次持续懒查询检查`)
      processImages()
      startLazyQuery() // 继续下一次懒查询
    }, TRIGGER_CONFIG.lazyQueryInterval)
  }

  // 停止持续懒查询
  const stopLazyQuery = () => {
    if (lazyQueryTimeout !== null) {
      clearTimeout(lazyQueryTimeout)
      lazyQueryTimeout = null
      console.log('停止持续懒查询')
    }
  }

  // 重置懒查询计数器
  const resetLazyQuery = () => {
    lazyQueryCount = 0
    console.log('重置懒查询计数器')
  }

  // 图片加载函数
  const setimg = async (element: HTMLImageElement, url: string): Promise<boolean> => {
    console.log('setimg 函数开始执行，URL:', url)
    const alt = element.alt
    console.log('保存原始alt文本:', alt)

    element.src = ''
    element.alt = '加载中...'
    console.log('清空图片src并设置加载中状态')

    try {
      console.log('开始获取图片资源:', url)
      const response = await fetch(url)
      console.log('获取图片响应:', {
        status: response.status,
        statusText: response.statusText,
        ok: response.ok,
        headers: Array.from(response.headers.entries())
          .map(([key, value]) => `${key}: ${value}`)
          .join(', '),
      })

      if (!response.ok) {
        console.error('图片响应状态异常:', response.status, response.statusText)
        throw new Error(`状态码异常:${response.status}`)
      }

      console.log('开始读取图片数据...')
      const blob = await response.blob()
      console.log('图片数据读取完成，blob类型:', blob.type, '大小:', blob.size, 'bytes')

      const objectUrl = URL.createObjectURL(blob)
      console.log('创建对象URL:', objectUrl)

      element.src = objectUrl
      element.alt = alt
      console.log('设置图片src和alt完成')

      element.onload = () => {
        // 尝试移除.lazyload类名
        try {
          element.classList.remove('lazyload')
        } catch (e) {
          console.error('移除.lazyload类名时出错:', e)
        }
        console.log('图片加载完成，释放对象URL:', objectUrl)
        URL.revokeObjectURL(objectUrl)
      }

      return true
    } catch (e) {
      console.error('图片加载过程中出错:', e)
      element.alt = '点击重载'
      console.warn('图片加载失败，设置点击重载功能')

      element.onclick = () => {
        console.log('用户点击重载图片，URL:', url)
        setimg(element, url)
      }

      return false
    }
  }

  // 自动设置图片函数
  async function autosetimg(element: HTMLImageElement) {
    // 如果已经处理过，直接返回
    if (processedImages.has(element)) {
      console.log('图片元素已处理过，跳过:', element)
      return
    }
    
    console.log('开始处理图片元素:', element)
    
    // 标记为已处理
    processedImages.add(element)
  
    console.log('图片元素详细信息:', {
      src: element.src,
      alt: element.alt,
      attributes: Array.from(element.attributes)
        .map((attr) => `${attr.name}="${attr.value}"`)
        .join(', '),
    })

    const imagepreviewsrc = element.getAttribute('preview-image-src')
    const realSrc = element.getAttribute('resourcesrc')
    const dataSrc = element.getAttribute('data-src')
    let url: string | null = null

    console.log('获取到的图片属性:', {
      imagepreviewsrc,
      realSrc,
      dataSrc,
    })

    // 优先使用data-src属性，其次是imagepreviewsrc，最后是resourcesrc
    if (dataSrc) {
      console.log('使用data-src图片源:', dataSrc)
      url = dataSrc
    } else if (imagepreviewsrc) {
      console.log('使用预览图片源:', imagepreviewsrc)
      url = imagepreviewsrc
    } else if (realSrc) {
      console.log('使用实际图片源:', realSrc)
      url = realSrc
    } else {
      console.log('未找到有效的图片源属性')
    }

    if (url) {
      console.log('开始设置图片:', url)
      try {
        await setimg(element, url)
        console.log('图片设置成功:', url)

        // 检查是否需要设置点击查看原图功能
        const previewSrc = dataSrc || imagepreviewsrc
        const originalSrc = realSrc || (previewSrc ? null : dataSrc)

        if (previewSrc && originalSrc && previewSrc !== originalSrc) {
          console.log('设置点击查看原图功能')
          element.title = '点击查看原图'
          element.onclick = () => {
            console.log('用户点击查看原图，切换到实际图片源:', originalSrc)
            setimg(element, originalSrc)
          }
        }
      } catch (error) {
        console.error('设置图片时出错:', error)
      }
    } else {
      console.warn('没有有效的图片URL，跳过处理')
    }
  }

  // 处理图片元素的函数
  const processImages = () => {
    if (isProcessing) {
      console.log('正在处理中，跳过本次处理')
      return
    }

    isProcessing = true
    console.log('开始查找需要处理的图片元素...')
    
    // 获取所有带有 resourcesrc 或 data-src 属性的 img 标签
    const allImages = document.querySelectorAll('img[resourcesrc], img[data-src]')
    console.log('找到', allImages.length, '个需要处理的图片元素')

    if (allImages.length === 0) {
      console.log('未找到图片元素')
      isProcessing = false
      return
    }

    // 过滤出未处理的图片
    const newImages = Array.from(allImages).filter(img => !processedImages.has(img as HTMLImageElement))
    console.log('发现', newImages.length, '个新图片元素需要处理')

    if (newImages.length > 0) {
      // 使用Set去重，避免重复处理同一个元素
      const uniqueImages = new Set(newImages)
      console.log('去重后需要处理', uniqueImages.size, '个新图片元素')

      // 转换为数组后使用forEach
      Array.from(uniqueImages).forEach((img, index) => {
          console.log('开始处理第', index + 1, '个新图片元素')
          autosetimg(img as HTMLImageElement)
        })

      // 重置懒查询计数器，因为发现了新图片
      resetLazyQuery()
    } else {
      console.log('没有发现新图片元素')
    }

    isProcessing = false

    // 如果所有图片都已处理，停止持续懒查询
    if (allImages.length > 0 && newImages.length === 0) {
      console.log('所有图片都已处理，停止持续懒查询')
      stopLazyQuery()
    }
  }

  // 使用MutationObserver监听DOM变化
  const observer = new MutationObserver((mutations) => {
    let hasNewImages = false
    
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        // 检查新增的节点中是否有图片元素
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element
            // 检查当前节点是否是图片
            if (element.tagName === 'IMG' && 
                (element.hasAttribute('resourcesrc') || element.hasAttribute('data-src'))) {
              hasNewImages = true
              return
            }
            // 检查子节点中是否有图片
            const images = element.querySelectorAll('img[resourcesrc], img[data-src]')
            if (images.length > 0) {
              hasNewImages = true
            }
          }
        })
      }
    })

    if (hasNewImages) {
      console.log('检测到DOM变化，触发防抖处理')
      triggerDebouncedProcess()
    }
  })

  // 开始观察DOM变化
  observer.observe(document.body, {
    childList: true,
    subtree: true
  })

  // 初始处理
  processImages()

  // 启动持续懒查询
  startLazyQuery()

  console.log('图片加载器初始化完成，已启动触发器+限速+持续懒查询模式')
}