// .vitepress/theme/index.js
// Extend the default VitePress theme and inject custom styles.
import DefaultTheme from 'vitepress/theme'
import './custom.css'
import { useRoute } from 'vitepress'
import { watch } from 'vue'

export default {
  extends: DefaultTheme,
  setup() {
    const route = useRoute()

    watch(() => route.path, (path) => {
      if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', 'G-61W8C83CGE', {
          page_path: path
        })
      }
    })
  }
}
