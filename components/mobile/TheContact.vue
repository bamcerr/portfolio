<script>
import TheContact from '@/components/TheContact'

export default {
  extends: TheContact
}
</script>
<style lang="postcss" scoped>
.contactForm {
  padding-bottom: 10rem;
  width: 58rem;
  margin: auto;
}

.contactForm__item {
  position: relative;
  width: 100%;
  margin: 5rem auto 0;

  &._child_first {
    margin-top: 4.5rem;
  }
}

.contactForm__input {
  position: relative;
  width: 100%;
  box-sizing: border-box;
  padding: 2rem 1.6rem;
  border: 0;
  color: var(--color-base-8, #111111);
  background-color: var(--color-base-2, #c0c2c9);
  font-size: var(--font-size-base-5, 38px);

  &._type_email {
    height: 6.2rem;
  }

  &._type_textarea {
    height: 18rem;
    line-height: 1.2;
  }

  &::placeholder {
    font-size: 0;
  }

  &:placeholder-shown ~ .contactForm__label {
    top: 2rem;
    left: 1.6rem;
    font-size: var(--font-size-base-5, 38px);
  }

  &:focus ~ .contactForm__label {
    top: -2.4rem;
    left: -0.2rem;
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
  position: absolute;
  top: -2.4rem;
  left: -0.2rem;
  color: var(--color-base-3, #71727a);
  font-size: var(--font-size-base-7, 24px);
  line-height: 1;
  font-weight: 300;
  transition: top 0.2s, font-size 0.2s, left 0.2s;
}

.contactForm__validator {
  display: block;
  width: 0.4rem;
  height: 100%;
  position: absolute;
  top: 0;
  left: -0.4rem;

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
  margin: 1.2rem auto 0;
  color: var(--color-base-7, #232427);
  font-size: var(--font-size-base-7, 24px);
  line-height: 1.3;
}

.contactForm__submitWrap {
  width: 100%;
  text-align: right;
  margin: 5rem auto 7.8rem auto;
}

.contactForm__submit {
  display: inline-block;
  width: 21rem;
  height: 4.5rem;
  font-size: var(--font-size-base-8, 22px);
}
</style>
