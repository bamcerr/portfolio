<template lang="html">
  <form class="contactForm" autocomplete="off" @submit.prevent>
    <div class="contactForm__item _child_first">
      <input
        id="email"
        ref="email"
        type="email"
        :value="email"
        placeholder="Enter your email"
        class="contactForm__input _type_email _name_email"
        @input="
          email = $event.target.value
          $v.email.$touch()
        "
        @blur="email = $event.target.value.trim()"
        @click="triggerWave"
      />
      <label for="email" class="contactForm__label">Email</label>
      <span
        class="contactForm__validator _status_normal"
        :class="{
          _status_success: !$v.email.$invalid,
          _status_error: $v.email.$error
        }"
      ></span>
    </div>

    <div class="contactForm__item">
      <textarea
        id="message"
        :value="message"
        class="contactForm__input _type_textarea"
        placeholder="Enter some text"
        @click="triggerWave"
        @input="
          message = $event.target.value
          $v.message.$touch()
        "
        @blur="message = $event.target.value.trim()"
      ></textarea>
      <label for="message" class="contactForm__label">Text</label>
      <span
        class="contactForm__validator _status_normal"
        :class="{
          _status_success: !$v.message.$invalid,
          _status_error: $v.message.$error
        }"
      ></span>
    </div>

    <p class="contactForm__text">
      보내신 메시지는 데이터베이스에 저장됩니다.
    </p>

    <div class="contactForm__submitWrap">
      <AppButtonPoint class="contactForm__submit" @click.prevent="sendMessage">
        메시지 보내기
      </AppButtonPoint>
    </div>
  </form>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import AppButtonPoint from '@/components/AppButtonPoint'
import clickWaveMotion from '@/mixins/clickWaveMotion'

export default {
  components: {
    AppButtonPoint
  },

  mixins: [clickWaveMotion],

  data() {
    return {
      email: null,
      message: null
    }
  },

  validations: {
    email: {
      required,
      email
    },
    message: {
      required,
      minLength: minLength(10)
    }
  },

  methods: {
    sendMessage() {
      this.$v.$touch()
      if (this.$v.$invalid) return

      this.$fireStore
        .collection('contact')
        .add({
          date: this.$moment().format('YYYY-MM-DD hh:mm:ss'),
          email: this.email,
          message: this.message
        })
        .then(() => {
          this.$notify({
            group: 'contact',
            title: '',
            text: '메시지가 성공적으로 등록되었습니다!',
            type: 'success',
            closeOnClick: true
          })
        })
        .catch(() => {
          this.$notify({
            group: 'contact',
            title: '',
            text: '메시지 등록을 실패하였습니다!',
            type: 'error',
            closeOnClick: true
          })
        })
    }
  }
}
</script>

<style lang="postcss" scoped>
.contactForm {
  overflow: hidden;
}

.contactForm__item {
  position: relative;
  width: 490px;
  margin: 50px auto 0;

  &._child_first {
    margin-top: 63px;
  }
}

.contactForm__input {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 17px 16px;
  border: 0;
  color: var(--color-base-8, #111111);
  background-color: var(--color-base-2, #c0c2c9);
  font-size: var(--font-size-base-5, 38px);

  &._type_email {
    height: 62px;
  }

  &._type_textarea {
    height: 180px;
    line-height: 1.2;
  }

  &::placeholder {
    font-size: 0;
  }

  &:placeholder-shown ~ .contactForm__label {
    top: 11px;
    left: 16px;
    font-size: var(--font-size-base-5, 38px);
  }

  &:focus ~ .contactForm__label {
    top: -34px;
    left: -2px;
    font-size: var(--font-size-base-7, 24px);
  }

  &::-ms-input-placeholder {
    font-weight: 300;
    transform: scale(0.6);
    transform-origin: left center;
  }
}

.contactForm__label {
  display: block;
  width: 100%;
  position: absolute;
  top: -34px;
  left: -2px;
  color: var(--color-base-3, #71727a);
  font-size: var(--font-size-base-7, 24px);
  line-height: 1;
  font-weight: 300;
  transition: top 0.2s, font-size 0.2s, left 0.2s;
}

.contactForm__validator {
  display: block;
  width: 4px;
  height: 100%;
  position: absolute;
  top: 0;
  left: -4px;

  &._status_normal {
    background-color: var(--color-status-normal, #c0c2c9);
  }

  &._status_error {
    background-color: var(--color-status-error, #ff6347);
  }

  &._status_success {
    background-color: var(--color-status-success, #3cb371);
  }
}

.contactForm__text {
  width: 490px;
  margin: 12px auto 0;
  color: var(--color-base-7, #232427);
  font-size: var(--font-size-base-7, 24px);
  line-height: 1.3;
}

.contactForm__submitWrap {
  width: 490px;
  text-align: right;
  margin: 50px auto 78px auto;
}

.contactForm__submit {
  display: inline-block;
  width: 210px;
  height: 55px;
  font-size: var(--font-size-base-8, 22px);
}
</style>
