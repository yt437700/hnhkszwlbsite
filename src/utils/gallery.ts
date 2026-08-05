// src/utils/gallery.ts
export const initGallery = () => {
  console.log('初始化图片画廊...')
  const imageModal = document.getElementById('imageModal')
  const modalImage = document.getElementById('modalImage') as HTMLImageElement
  const modalTitle = document.getElementById('modalImageTitle')
  const modalDescription = document.getElementById('modalImageDescription')
  const imgLoading = document.getElementById('imgLoading')
  const prevBtn = document.querySelector('.prev-btn')
  const nextBtn = document.querySelector('.next-btn')

  if (!imageModal || !modalImage || !modalTitle || !modalDescription || !imgLoading) {
    console.error('画廊所需的DOM元素不完整')
    return
  }

  // 检查是否已经初始化过
  if ((imageModal as any)._galleryInitialized) {
    return
  }
  ;(imageModal as any)._galleryInitialized = true

  // 收集所有图片项
  const galleryItems = Array.from(document.querySelectorAll('.waterfall-item'))
  let currentIndex = 0
  let currentItems: Element[] = []

  // 监听模态框显示事件
  imageModal.addEventListener('show.bs.modal', function (event) {
    const button = (event as any).relatedTarget as HTMLElement
    if (!button) return

    // 获取当前激活的筛选类别
    const activeFilterBtn = document.querySelector('.filter-btn.active') as HTMLElement
    const activeFilter = activeFilterBtn?.getAttribute('data-filter') || '*'

    // 根据筛选条件获取当前可见的图片项
    currentItems = galleryItems.filter((item) => {
      if (activeFilter === '*' || activeFilter === 'all') return true
      return (
        item.classList.contains(activeFilter.slice(1)) ||
        item.querySelector(`[data-category="${activeFilter}"]`)
      )
    })

    // 获取当前点击项的索引
    const currentCard = button.closest('.waterfall-item')
    if (currentCard) {
      currentIndex = currentItems.indexOf(currentCard)
      // 处理索引不存在的状况
      if (currentIndex === -1) currentIndex = 0
    } else {
      currentIndex = 0
    }

    // 加载当前的图片
    loadImage(button)
  })

  // 监听模态框隐藏事件，重置状态
  imageModal.addEventListener('hidden.bs.modal', function () {
    modalImage.src = ''
    modalImage.style.opacity = '1'
    currentIndex = 0
    currentItems = []
  })

  // 加载图片函数
  function loadImage(button: HTMLElement) {
    const title = button.getAttribute('data-title') || '图片预览'
    const description = button.getAttribute('data-description') || '无描述信息'
    const previewSrc = button.getAttribute('data-preview')
    const fullSrc = button.getAttribute('data-full')

    // 更新模态框信息
    if(modalTitle) modalTitle.textContent = title
    if(modalDescription) modalDescription.textContent = description
    modalImage.alt = title

    if (imgLoading) {
      // 显示加载状态
      imgLoading.style.display = 'flex'
      imgLoading.style.opacity = '1'
    }
    modalImage.style.opacity = '0'

    // 重置图片源和事件
    modalImage.src = ''
    modalImage.onload = null
    modalImage.onerror = null

    // 处理图片源为空的情况
    if (!previewSrc && !fullSrc) {
      console.error('图片源不存在')
      modalImage.alt = '图片不存在'
      if (imgLoading) {
        imgLoading.style.opacity = '0'
        setTimeout(() => {
          imgLoading.style.display = 'none'
        }, 300)
      }
      return
    }

    // 如果当前图片已经是目标图片，直接显示
    if (
      (fullSrc && modalImage.src === fullSrc) ||
      (previewSrc && !fullSrc && modalImage.src === previewSrc)
    ) {
      modalImage.style.opacity = '1'

      if (imgLoading) {
        imgLoading.style.opacity = '0'
        setTimeout(() => {
          imgLoading.style.display = 'none'
        }, 300)
      }
      return
    }

    // 先加载预览图
    if (previewSrc) {
      modalImage.src = previewSrc

      modalImage.onload = function () {
        // 预览图加载成功后，开始加载原图
        if (fullSrc) {
          loadFullImage(fullSrc)
        } else {
          // 没有原图时直接显示预览图
          modalImage.style.opacity = '1'

          if (imgLoading) {
            imgLoading.style.opacity = '0'
            setTimeout(() => {
              imgLoading.style.display = 'none'
            }, 300)
          }
        }
      }
      modalImage.onerror = function () {
        console.error('预览图加载失败:', previewSrc)
        // 如果预览图加载失败，直接加载原图
        loadFullImage(fullSrc)
      }
    } else if (fullSrc) {
      // 如果没有预览图，直接加载原图
      loadFullImage(fullSrc)
    }
  }

  function loadFullImage(fullSrc: string | null) {
    if (!fullSrc) {
      // 如果没有原图，隐藏加载状态并显示预览图
      modalImage.style.opacity = '1'

      if (imgLoading) {
        imgLoading.style.opacity = '0'
        setTimeout(() => {
          imgLoading.style.display = 'none'
        }, 300)
      }
      return
    }

    // 如果原图已经加载过，直接显示
    if (modalImage.src === fullSrc) {
      modalImage.style.opacity = '1'
      if (imgLoading) {
        imgLoading.style.opacity = '0'
        setTimeout(() => {
          imgLoading.style.display = 'none'
        }, 300)
      }
      return
    }

    // 加载原图
    const fullImage = new Image()
    fullImage.onload = function () {
      // 在设置modalImage.src之前，先移除所有事件监听器
      modalImage.onload = null
      modalImage.onerror = null

      modalImage.src = fullSrc
      // 添加淡入效果
      modalImage.style.opacity = '0'
      setTimeout(() => {
        modalImage.style.transition = 'opacity 0.3s ease-in-out'
        modalImage.style.opacity = '1'
      }, 50)

      // 隐藏加载状态
      if (imgLoading) {
        imgLoading.style.transition = 'opacity 0.3s ease-in-out'
        imgLoading.style.opacity = '0'
        setTimeout(() => {
          imgLoading.style.display = 'none'
        }, 300)
      }
    }
    fullImage.onerror = function () {
      console.error('大图加载失败:', fullSrc)
      // 隐藏加载状态，但保持预览图（如果有）
      imgLoading!.style.transition = 'opacity 0.3s ease-in-out'
      imgLoading!.style.opacity = '0'
      setTimeout(() => {
        imgLoading!.style.display = 'none'
        // 如果有预览图且未加载，则尝试重新加载预览图
        const previewSrc = modalImage.getAttribute('data-preview')
        if (previewSrc && modalImage.src !== previewSrc) {
          modalImage.src = previewSrc
          modalImage.style.opacity = '1'
        }
      }, 300)
    }
    fullImage.src = fullSrc
  }

  // 上一张按钮
  prevBtn?.addEventListener('click', function () {
    if (!currentItems || currentItems.length <= 1) return

    currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length
    const currentItem = currentItems[currentIndex]
    if (!currentItem) return

    const prevButton = currentItem.querySelector('.view-btn') as HTMLElement
    if (prevButton) loadImage(prevButton)
  })

  // 下一张按钮
  nextBtn?.addEventListener('click', function () {
    if (!currentItems || currentItems.length <= 1) return

    currentIndex = (currentIndex + 1) % currentItems.length
    const currentItem = currentItems[currentIndex]
    if (!currentItem) return

    const nextButton = currentItem.querySelector('.view-btn') as HTMLElement
    if (nextButton) loadImage(nextButton)
  })

  // 键盘导航
  document.addEventListener('keydown', function (e) {
    if (!imageModal || !imageModal.classList.contains('show')) return

    if (e.key === 'ArrowLeft') {
      ;(prevBtn as HTMLElement)?.click()
    } else if (e.key === 'ArrowRight') {
      ;(nextBtn as HTMLElement)?.click()
    } else if (e.key === 'Escape') {
      const modalInstance = (window as any).bootstrap?.Modal?.getInstance(imageModal)
      modalInstance?.hide()
    }
  })

  // 筛选功能
  const filterBtns = document.querySelectorAll('.filter-btn')
  const galleryItemsAll = document.querySelectorAll('.waterfall-item')

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', function (this: HTMLElement) {
      filterBtns.forEach((b) => b.classList.remove('active'))
      this.classList.add('active')

      const filterValue = this.getAttribute('data-filter') || 'all'

      galleryItemsAll.forEach((item) => {
        const category = item.querySelector('.view-btn')?.getAttribute('data-category')
        if (filterValue === 'all' || filterValue === '*' || category === filterValue) {
          ;(item as HTMLElement).style.display = 'block'
        } else {
          ;(item as HTMLElement).style.display = 'none'
        }
      })
    })
  })
}
