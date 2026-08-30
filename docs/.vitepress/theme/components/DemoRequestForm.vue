<script setup>
import { ref } from 'vue'

// Web3Forms access key — get one at https://web3forms.com (free, no account
// needed beyond an email confirmation). Submissions are emailed straight to you.
const ACCESS_KEY = 'YOUR-WEB3FORMS-ACCESS-KEY'

const name = ref('')
const email = ref('')
const message = ref('')
const botcheck = ref('')          // honeypot — bots fill it, humans never see it

const state = ref('idle')          // idle | sending | sent | error
const errorText = ref('')

async function submit() {
  if (state.value === 'sending') return

  if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
    state.value = 'error'
    errorText.value = 'Fill in your name, email and a short message.'
    return
  }

  state.value = 'sending'
  errorText.value = ''

  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: 'dd185c12-1742-4a0a-9ffb-d8da98e96a43',
        subject: `Postmate for a team — ${name.value}`,
        from_name: 'Postmate Client site',
        name: name.value,
        email: email.value,
        message: message.value,
        botcheck: botcheck.value,
      }),
    })

    const data = await res.json()

    if (data.success) {
      state.value = 'sent'
    } else {
      state.value = 'error'
      errorText.value = `That didn't send (${data.message || 'unknown error'}). Email hello@postmateclient.com instead and it'll reach the same place.`
    }
  } catch {
    state.value = 'error'
    errorText.value = "That didn't send — you may be offline or behind a proxy that blocked it. Email hello@postmateclient.com instead."
  }
}
</script>

<template>
  <div class="demo-form">
    <div v-if="state === 'sent'" class="demo-form-sent">
      <p class="demo-form-sent-title">Message sent.</p>
      <p class="demo-form-sent-body">
        Most messages are answered within a day. If you don't hear back within two
        working days, email
        <a href="mailto:hello@postmateclient.com">hello@postmateclient.com</a>.
      </p>
    </div>

    <div v-else class="demo-form-fields">
      <div class="demo-form-row">
        <label class="demo-form-label" for="demo-name">Name</label>
        <input
            id="demo-name"
            v-model="name"
            type="text"
            autocomplete="name"
            class="demo-form-input"
            :disabled="state === 'sending'"
        >
      </div>

      <div class="demo-form-row">
        <label class="demo-form-label" for="demo-email">Work email</label>
        <input
            id="demo-email"
            v-model="email"
            type="email"
            autocomplete="email"
            class="demo-form-input"
            :disabled="state === 'sending'"
        >
      </div>

      <div class="demo-form-row">
        <label class="demo-form-label" for="demo-message">
          What does your team need to know?
        </label>
        <textarea
            id="demo-message"
            v-model="message"
            rows="4"
            class="demo-form-input demo-form-textarea"
            placeholder="Security review, proxy or mTLS setup, CI pipeline, migrating a team off Postman, or just a tool demo."
            :disabled="state === 'sending'"
        ></textarea>
      </div>

      <!-- honeypot: hidden from people, visible to bots -->
      <input
          v-model="botcheck"
          type="checkbox"
          name="botcheck"
          class="demo-form-honeypot"
          tabindex="-1"
          autocomplete="off"
          aria-hidden="true"
      >

      <p v-if="state === 'error'" class="demo-form-error" role="alert">
        {{ errorText }}
      </p>

      <button
          type="button"
          class="demo-form-submit"
          :disabled="state === 'sending'"
          @click="submit"
      >
        {{ state === 'sending' ? 'Sending…' : 'Send message' }}
      </button>

      <p class="demo-form-note">
        Your name, email and message are emailed to us and nowhere else. No CRM,
        no marketing list, no follow-up sequence.
      </p>
    </div>
  </div>
</template>

<style scoped>
.demo-form {
  max-width: 34rem;
  margin: 0 auto;
  text-align: left;
}

.demo-form-fields {
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.demo-form-row {
  display: flex;
  flex-direction: column;
  gap: .4rem;
}

.demo-form-label {
  font-size: .85rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.demo-form-input {
  width: 100%;
  padding: .65rem .8rem;
  font-family: inherit;
  font-size: .95rem;
  line-height: 1.5;
  color: var(--vp-c-text-1);
  background: var(--vp-c-bg);
  border: 1px solid var(--vp-c-divider);
  border-radius: 6px;
  transition: border-color .15s ease;
}

.demo-form-input:focus {
  outline: none;
  border-color: #14532d;
}

.dark .demo-form-input:focus {
  border-color: #4ade80;
}

.demo-form-input:disabled {
  opacity: .6;
}

.demo-form-textarea {
  resize: vertical;
  min-height: 6rem;
}

.demo-form-honeypot {
  position: absolute;
  left: -9999px;
  opacity: 0;
  pointer-events: none;
}

.demo-form-submit {
  align-self: flex-start;
  padding: .7rem 1.4rem;
  font-family: inherit;
  font-size: .95rem;
  font-weight: 600;
  color: #fff;
  background: #14532d;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  transition: background .15s ease;
}

.dark .demo-form-submit {
  color: #06170e;
  background: #4ade80;
}

.demo-form-submit:hover:not(:disabled) {
  background: #0b2e1a;
}

.dark .demo-form-submit:hover:not(:disabled) {
  background: #86efac;
}

.demo-form-submit:disabled {
  cursor: default;
  opacity: .6;
}

.demo-form-submit:focus-visible {
  outline: 2px solid #14532d;
  outline-offset: 3px;
}

.demo-form-error {
  margin: 0;
  font-size: .88rem;
  line-height: 1.6;
  color: var(--vp-c-danger-1);
}

.demo-form-note {
  margin: 0;
  font-size: .82rem;
  line-height: 1.6;
  color: var(--vp-c-text-2);
}

.demo-form-sent {
  padding: 1.5rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 8px;
  background: var(--vp-c-bg-soft);
}

.demo-form-sent-title {
  margin: 0 0 .5rem;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.demo-form-sent-body {
  margin: 0;
  font-size: .9rem;
  line-height: 1.65;
  color: var(--vp-c-text-2);
}

@media (prefers-reduced-motion: reduce) {
  .demo-form-input,
  .demo-form-submit {
    transition: none;
  }
}
</style>