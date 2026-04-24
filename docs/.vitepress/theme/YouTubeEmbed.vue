<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  id: { type: String, required: true },
  title: { type: String, default: 'Video walkthrough' },
})

const loaded = ref(false)

const thumbnail = computed(
    () => `https://img.youtube.com/vi/${props.id}/maxresdefault.jpg`
)

const embedUrl = computed(
    () => `https://www.youtube-nocookie.com/embed/${props.id}?autoplay=1&rel=0`
)

const loadVideo = () => {
  loaded.value = true
}
</script>

<template>
  <div class="yt-embed">
    <button
        v-if="!loaded"
        class="yt-facade"
        :style="{ backgroundImage: `url(${thumbnail})` }"
        :aria-label="`Play video: ${title}`"
        @click="loadVideo"
    >
      <span class="yt-play-button" aria-hidden="true">
        <svg viewBox="0 0 68 48" width="68" height="48">
          <path
              d="M66.52 7.74c-.78-2.93-2.49-5.41-5.42-6.19C55.79.13 34 0 34 0S12.21.13 6.9 1.55c-2.93.78-4.63 3.26-5.42 6.19C.06 13.05 0 24 0 24s.06 10.95 1.48 16.26c.78 2.93 2.49 5.41 5.42 6.19C12.21 47.87 34 48 34 48s21.79-.13 27.1-1.55c2.93-.78 4.64-3.26 5.42-6.19C67.94 34.95 68 24 68 24s-.06-10.95-1.48-16.26z"
              fill="#f00"
          />
          <path d="M45 24L27 14v20" fill="#fff" />
        </svg>
      </span>
    </button>

    <iframe
        v-else
        :src="embedUrl"
        :title="title"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        loading="lazy"
    ></iframe>
  </div>
</template>

<style scoped>
.yt-embed {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 12px;
  overflow: hidden;
  background: #000;
  margin: 1.5rem 0;
}

.yt-facade {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  padding: 0;
  cursor: pointer;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: filter 0.2s ease;
}

.yt-facade:hover,
.yt-facade:focus-visible {
  filter: brightness(0.85);
  outline: none;
}

.yt-play-button {
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
}

.yt-facade:hover .yt-play-button,
.yt-facade:focus-visible .yt-play-button {
  transform: scale(1.1);
}

.yt-embed iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
}
</style>