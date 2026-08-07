<!-- src/components/Sections/HeroSection.vue -->
<template>
  <section class="hero-section">
    <div class="hero-container">
      <!-- 左侧文字内容 -->
      <div class="hero-left">
        <h1 class="hero-title d-md-none">欢迎来到网络部</h1>
        <h1 class="hero-title d-none d-md-block">海口市第四中学网络部</h1>
        <p class="hero-subtitle">Network Department</p>
        <p class="hero-description d-md-none">
          隶属于海口市第四中学团委学生会
        </p>
        <p class="hero-description d-none d-md-block">
          网络部全名"海口市第四中学团委学生会网络管理部"，隶属于海口市第四中学团委学生会。
        </p>
        <a id="加入我们" href="#members" class="hero-cta">
          <span>加入我们</span>
        </a>
      </div>

      <!-- 右侧背景图 -->
      <div class="hero-right" :style="heroBackgroundStyle">
        <div class="hero-overlay"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { heroSlides } from '@/assets/data/heroData'

const isImageLoaded = ref(false)

const heroImage = computed(() => {
  const activeSlide = heroSlides.find(slide => slide.active)
  return activeSlide?.image || heroSlides[0]?.image || '/images/slide/670613950c57a.jpg'
})

const heroBackgroundStyle = computed(() => ({
  backgroundImage: `url('${heroImage.value}')`
}))

onMounted(() => {
  const img = new Image()
  img.src = heroImage.value
  img.onload = () => {
    isImageLoaded.value = true
  }
  img.onerror = () => {
    isImageLoaded.value = true
  }
})
</script>

<style scoped>
.hero-section {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background: #000;
}

.hero-container {
  display: flex;
  width: 100%;
  height: 100%;
}

.hero-left {
  width: 73%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 4rem;
  position: relative;
  z-index: 2;
}

.hero-left::before {
  content: "";
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.hero-left > * {
  position: relative;
  z-index: 2;
}

.hero-right {
  width: 68%;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  opacity: 0;
  animation: heroBgFadeIn 0.6s ease forwards;
}


.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.55) 0%,
    rgba(0, 0, 0, 0.15) 40%,
    rgba(0, 0, 0, 0) 100%
  );
  pointer-events: none;
}

.hero-title {
  font-size: 3.5rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 1rem 0;
  line-height: 1.2;
  opacity: 0;
  transform: translateY(20px);
  animation: heroTitleFadeIn 0.6s ease forwards;
  animation-delay: 0.1s;
}

.hero-subtitle {
  font-size: 1.25rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.6);
  margin: 0 0 1.5rem 0;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  opacity: 0;
  transform: translateY(20px);
  animation: heroTitleFadeIn 0.6s ease forwards;
  animation-delay: 0.2s;
}

.hero-description {
  font-size: 1.1rem;
  font-weight: 300;
  color: rgba(255, 255, 255, 0.75);
  margin: 0 0 2rem 0;
  line-height: 1.6;
  max-width: 480px;
  opacity: 0;
  transform: translateY(20px);
  animation: heroTitleFadeIn 0.6s ease forwards;
  animation-delay: 0.3s;
}

.hero-cta {
  display: inline-block;
  border: 1px solid #fdd835;
  color: #fdd835;
  background: transparent;
  border-radius: 6px;
  padding: 14px 32px;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateY(20px);
  animation: heroTitleFadeIn 0.6s ease forwards;
  animation-delay: 0.4s;
  width: fit-content;
}

.hero-cta:hover {
  background: #fdd835;
  color: #000;
}

@keyframes heroBgFadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes heroTitleFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}


@media (min-width: 992.1px) {

  .hero-right::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 1.943) 0%,
      rgba(0, 0, 0, 0.7) 50%,
      rgba(0, 0, 0, 0) 100%
    );
    z-index: 1;
  }
}

@media (max-width: 992px) and (min-width: 768px) {
  .hero-left {
    width: 70%;
    padding: 0 2rem;
  }

  .hero-right {
    width: 100%;
  }

  .hero-right::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(0, 0, 0, 1.943) 0%,
      rgba(0, 0, 0, 0.7) 55.0%,
      rgba(0, 0, 0, 0.4) 78.0%,
      rgba(0, 0, 0, 0) 100%
    );
    z-index: 1;
  }

  .hero-title {
    font-size: 2.5rem;
  }
}

@media (max-width: 768px) {
  .hero-section {
    height: auto;
    min-height: 100vh;
  }

  .hero-container {
    flex-direction: column;
    height: auto;
    min-height: 100vh;
  }

  .hero-right {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-position: center -30px;
  }

  .hero-overlay {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.35) 0%,
      rgba(0, 0, 0, 0.35) 100%
    );
  }

  .hero-left {
    width: 100%;
    padding: 55vh 1.2rem 3rem;
    justify-content: flex-start;
    text-align: center;
    position: relative;
    z-index: 2;
    min-height: 100vh;
    box-sizing: border-box;
  }

  .hero-left::before {
    opacity: 1;
  }

  .hero-left::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 15%;
    background: linear-gradient(
      to top,
      rgba(0, 0, 0, 0.25) 0%,
      rgba(0, 0, 0, 0.15) 100%
    );
    z-index: 1;
    pointer-events: none;
  }

  .hero-title {
    font-size: 2rem;
    margin: 0 0 0.4rem 0;
    animation: fadeInMobile 0.5s ease forwards;
  }

  .hero-subtitle {
    font-size: 1rem;
    margin: 0 0 0.6rem 0;
    animation: fadeInMobile 0.5s ease forwards;
    animation-delay: 0.1s;
  }

  .hero-description {
    font-size: 0.9rem;
    margin: 0 0 1rem 0;
    max-width: 100%;
    animation: fadeInMobile 0.5s ease forwards;
    animation-delay: 0.15s;
  }

  .hero-cta {
    min-width: 140px;
    padding: 10px 20px;
    font-size: 1rem;
    margin: 0 auto;
    animation: fadeInMobile 0.5s ease forwards;
    animation-delay: 0.2s;
  }

  .hero-cta:hover {
    background: transparent;
    color: #fdd835;
  }

  .hero-cta:active {
    background: #fdd835;
    color: #000;
    box-shadow: 0 0 8px rgba(253, 216, 53, 0.4);
  }

  @keyframes fadeInMobile {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
}
</style>