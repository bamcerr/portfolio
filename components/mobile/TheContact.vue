<script>
import TheContact from '@/components/TheContact'

export default {
  extends: TheContact
}
</script>

<style lang="postcss" scoped>
#honeypot {
  display: none;
}
.contactForm {
  padding-bottom: 4.17rem;
  width: 24.17rem;
  margin: auto;
}

.contactForm__item {
  position: relative;
  width: 100%;
  margin: 2.08rem auto 0;

  &._child_first {
    margin-top: 1.88rem;
  }
}

.contactForm__input {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 0.83rem 0.67rem;
  border: 0;
  color: var(--color-base-8, #111111);
  background-color: var(--color-base-2, #c0c2c9);
  font-size: var(--font-size-base-5, 1.58rem);

  &._type_email {
    height: 2.58rem;
  }

  &._type_textarea {
    height: 7.5rem;
    line-height: 1.2;
  }

  &::placeholder {
    font-size: 0;
  }

  &:placeholder-shown ~ .contactForm__label {
    top: 0.5rem;
    left: 0.67rem;
    font-size: var(--font-size-base-5, 1.58rem);
  }

  &:focus ~ .contactForm__label {
    top: -1.25rem;
    left: -0.08rem;
    font-size: var(--font-size-base-7, 1rem);
  }

  &::-ms-input-placeholder {
    font-weight: 300;
    transform: scale(0.6);
    transform-origin: left center;
  }
}

.contactForm__label {
  display: block;
  position: absolute;
  top: -1.25rem;
  left: -0.08rem;
  color: var(--color-base-3, #71727a);
  font-size: var(--font-size-base-7, 1rem);
  line-height: 1;
  font-weight: 300;
  transition: top 0.2s, font-size 0.2s, left 0.2s;
}

.contactForm__validator {
  display: block;
  width: 0.17rem;
  height: 100%;
  position: absolute;
  top: 0;
  left: -0.17rem;

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
  width: 100%;
  margin: 0.5rem auto 0;
  color: var(--color-base-7, #232427);
  font-size: var(--font-size-base-7, 1rem);
  line-height: 1.3;
}

.contactForm__submitWrap {
  width: 100%;
  text-align: right;
  margin: 2.08rem auto 3.25rem auto;
}

.contactForm__submit {
  display: inline-block;
  width: 8.75rem;
  height: 1.88rem;
  font-size: var(--font-size-base-7, 1.83rem);
}
</style>
