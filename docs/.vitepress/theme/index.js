import DefaultTheme from 'vitepress/theme'
import './custom.css'
import { useRoute } from 'vitepress'
import { onMounted, watch, nextTick } from 'vue'
import mediumZoom from 'medium-zoom'
import YouTubeEmbed from './YouTubeEmbed.vue'
import ZoomVideo from './ZoomVideo.vue'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component('YouTubeEmbed', YouTubeEmbed)
    app.component('ZoomVideo', ZoomVideo)
  },
  setup() {
    const route = useRoute()

    let zoom = null

    // Initialise medium-zoom on docs content images.
    // Re-runs after client-side navigation so newly rendered pages get it too.
    const initZoom = () => {
      // Tear the previous instance down first. Each mediumZoom() call creates a
      // separate instance, so without this every client-side navigation leaves
      // another one attached. Those stale instances keep their opened state and
      // strand their cloned <img> nodes in <body>, where the z-index: 9999 rule
      // parks them above the page and they swallow later clicks.
      if (zoom) {
        zoom.close()
        zoom.detach()
      }

      zoom = mediumZoom(
          '.main img:not(.no-zoom), .VPHome img:not(.no-zoom), .VPPage img:not(.no-zoom)',
          {
            background: 'rgba(0, 0, 0, 0.85)',
            margin: 24
          }
      )
    }

    onMounted(() => {
      initZoom()
    })

    watch(() => route.path, (path) => {
      // Re-init zoom after the new page's DOM is in place
      nextTick(() => initZoom())

      // Existing GA page tracking
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', 'G-61W8C83CGE', {
          page_path: path
        })
      }
    })
  }
}
