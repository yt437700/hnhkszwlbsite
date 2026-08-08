<!-- src/components/Layout/Navbar.vue -->
<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" style="opacity: 0.7">
    <div class="container-fluid">
      <a class="navbar-brand nav-link nav-link-text d-block" href="/">
        <strong>海口市第四中学网络部</strong>
        <div class="small">wlb.yt437700.top</div>
      </a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#">概览</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#我们的工作">我们的工作</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#benefits">各种福利</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/compare">我们 vs 老师</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#关于">关于</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
// 导航栏逻辑可以在这里添加
</script>