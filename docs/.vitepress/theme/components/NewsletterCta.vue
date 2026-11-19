<script setup>
import { computed } from 'vue'
import { useRoute } from 'vitepress'

// Kit "Blog signup" form. Plain HTML POST, no Kit script on our pages.
// After subscribing, Kit redirects to /newsletter-thanks (set in Kit's form settings).
const KIT_FORM_ACTION = 'https://app.kit.com/forms/10211576/subscriptions'

const route = useRoute()

// Show only on individual blog posts, not on the blog index.
const show = computed(() => {
  const p = route.path.replace(/\.html$/, '').replace(/\/$/, '')
  return p.startsWith('/blog/') && p !== '/blog' && p !== '/blog/index'
})
</script>

<template>
  <aside v-if="show" class="pm-newsletter" aria-label="Newsletter">
    <p class="pm-newsletter__kicker">Newsletter · Monthly</p>
    <p class="pm-newsletter__title">Get one email a month from Postmate Client</p>
    <p class="pm-newsletter__desc">
      What's new in Postmate, one practical API testing tip, and the API news worth knowing.
      No spam, unsubscribe anytime.
    </p>
    <form class="pm-newsletter__form" :action="KIT_FORM_ACTION" method="post">
      <label class="pm-newsletter__sr" for="pm-newsletter-email">Email address</label>
      <input
        id="pm-newsletter-email"
        class="pm-newsletter__input"
        type="email"
        name="email_address"
        placeholder="you@company.com"
        autocomplete="email"
        required
      />
      <button class="pm-newsletter__btn" type="submit">Subscribe</button>
    </form>
  </aside>
</template>

<style scoped>
.pm-newsletter {
  margin-top: 48px;
  padding: 24px 28px;
  border: 1px solid var(--vp-c-brand-soft);
  border-left: 4px solid var(--vp-c-brand-1);
  border-radius: 12px;
  background: var(--vp-c-bg-soft);
}
.pm-newsletter__kicker {
  margin: 0;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--vp-c-brand-3);
}
.pm-newsletter__title {
  margin: 6px 0 0;
  font-size: 18px;
  font-weight: 700;
  line-height: 1.35;
  color: var(--vp-c-text-1);
}
.pm-newsletter__desc {
  margin: 6px 0 0;
  font-size: 14px;
  line-height: 1.5;
  color: var(--vp-c-text-2);
}
.pm-newsletter__form {
  margin-top: 16px;
  display: flex;
  gap: 10px;
}
.pm-newsletter__input {
  flex: 1;
  min-width: 0;
  padding: 10px 14px;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg);
  color: var(--vp-c-text-1);
  font-size: 15px;
}
.pm-newsletter__input:focus {
  outline: none;
  border-color: var(--vp-c-brand-1);
}
.pm-newsletter__btn {
  flex-shrink: 0;
  padding: 10px 22px;
  border: 0;
  border-radius: 8px;
  background: var(--vp-c-brand-1);
  color: var(--vp-c-white);
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.pm-newsletter__btn:hover { background: var(--vp-c-brand-2); }
:global(.dark) .pm-newsletter__btn { color: #052e16; }

.pm-newsletter__sr {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  white-space: nowrap;
}

@media (max-width: 640px) {
  .pm-newsletter__form { flex-direction: column; }
}
</style>
