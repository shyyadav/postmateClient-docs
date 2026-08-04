<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'

// A GIF-replacement video that maximises on click, matching the medium-zoom
// behaviour we use for images. medium-zoom itself only binds to <img>, so
// videos need their own overlay — the styling below deliberately mirrors it.
const props = defineProps({
  src: { type: String, required: true },
  poster: { type: String, default: '' },
  label: { type: String, default: 'Video demonstration' },
})

// The #t=0.1 fragment makes the browser seek to the first frame and paint it,
// so the block is never empty if autoplay is blocked (iOS low-power mode,
// data saver) or the observer never fires. Skipped when a poster is supplied.
const inlineSrc = computed(() =>
    props.poster ? props.src : `${props.src}#t=0.1`
)

const zoomed = ref(false)
const inlineVideo = ref(null)
let observer = null

const open = () => {
  zoomed.value = true
  document.body.style.overflow = 'hidden'
}

const close = () => {
  zoomed.value = false
  document.body.style.overflow = ''
}

const onKey = (e) => {
  if (e.key === 'Escape' && zoomed.value) close()
}

onMounted(() => {
  const el = inlineVideo.value
  if (el) {
    // Set as a property, not just an attribute — browsers only allow
    // autoplay on videos that are muted at the property level.
    el.muted = true
  }

  window.addEventListener('keydown', onKey)

  // preload="metadata" costs only the header + first frame up front; the full
  // file is fetched lazily, once play() is called as the video nears the
  // viewport. Autoplay is an enhancement here, never a requirement — if this
  // never fires, the first frame is still painted.
  if (el && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              el.play().catch(() => {})
            } else {
              el.pause()
            }
          })
        },
        { rootMargin: '200px' }
    )
    observer.observe(el)
  }
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  if (observer) observer.disconnect()
  document.body.style.overflow = ''
})
</script>

<template>
  <video
      ref="inlineVideo"
      class="zoom-video"
      :src="inlineSrc"
      :poster="poster"
      :aria-label="`Maximise: ${label}`"
      muted
      loop
      playsinline
      preload="metadata"
      @click="open"
  ></video>

  <Teleport to="body">
    <div
        v-if="zoomed"
        class="zoom-video-overlay"
        role="dialog"
        aria-modal="true"
        :aria-label="label"
        @click="close"
    >
      <video
          class="zoom-video-full"
          :src="src"
          autoplay
          loop
          controls
          playsinline
          @click.stop
      ></video>
    </div>
  </Teleport>
</template>

<style scoped>
.zoom-video {
  width: 100%;
  height: auto;
  display: block;
  border-radius: 8px;
  cursor: zoom-in;
}

/* Mirrors the medium-zoom overlay: same backdrop and stacking as custom.css */
.zoom-video-overlay {
  position: fixed;
  inset: 0;
  z-index: 9998;
  background: rgba(0, 0, 0, 0.85);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  cursor: zoom-out;
  animation: zoom-video-fade 0.2s ease;
}

.zoom-video-full {
  position: relative;
  z-index: 9999;
  max-width: calc(100vw - 48px);
  max-height: calc(100vh - 48px);
  border-radius: 8px;
  cursor: default;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.45);
}

@keyframes zoom-video-fade {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .zoom-video-overlay { animation: none; }
}
</style>
