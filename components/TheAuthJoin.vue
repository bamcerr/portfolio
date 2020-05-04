<template lang="html">
  <div class="theAuthJoin">
    <div class="theAuthJoin__inner">
      <div v-if="true" class="theAuthJoin__notice">
        <h3 class="theAuthJoin__noticeTitle">이 곳을 둘러보시려면</h3>
        <p class="theAuthJoin__noticeText">
          '익명으로 이용하기'를 눌러 주세요.
        </p>
        <br />
        <p class="theAuthJoin__noticeText">
          '회원 등록'을 하셔도 좋습니다.
        </p>
        <br />
        <p class="theAuthJoin__noticeText">
          등록된 회원 정보로 '로그인' 가능 하나
        </p>
        <p class="theAuthJoin__noticeText">
          등록된 회원 정보는 정기적으로 삭제됩니다.
        </p>
        <br />
        <p class="theAuthJoin__noticeText">
          모바일 버전은 준비 중입니다.
        </p>
      </div>

      <form class="theAuthJoin__form">
        <AppButtonPoint
          class="theAuthJoin__signupAnonymouslyBtn"
          @click="signInAnonymously"
        >
          익명으로 이용하기
        </AppButtonPoint>

        <label class="theAuthJoin__label">
          <input
            v-model="email"
            type="text"
            placeholder="abc@abc.com"
            class="theAuthJoin__input"
            @input="resetResponseInvalid"
            @click="triggerWave"
          />
          <div v-if="$v.email.$error" class="theAuthJoin__invalids">
            <span
              v-if="!$v.email.required"
              class="theAuthJoin__invalid"
              title="필수 입력 사항입니다."
            >
              !
            </span>
            <span
              v-if="!$v.email.email"
              class="theAuthJoin__invalid"
              title="이메일 형식을 확인해 주세요."
            >
              !
            </span>
          </div>
        </label>

        <label for="password" class="theAuthJoin__label">
          <input
            v-model="password"
            class="theAuthJoin__input"
            type="password"
            placeholder="p•a•s•s•w•d"
            @input="resetResponseInvalid"
            @click="triggerWave"
          />

          <div v-if="$v.password.$error" class="theAuthJoin__invalids">
            <span
              v-if="!$v.password.required"
              class="theAuthJoin__invalid"
              title="필수 입력 사항입니다."
            >
              !
            </span>
            <span
              v-if="!$v.password.minLength"
              class="theAuthJoin__invalid"
              title="비밀번호는 6자리 이상입니다."
            >
              !
            </span>
          </div>
        </label>

        <div class="theAuthJoin__btns">
          <AppTextHoverUnderlineReplace
            tag-name="button"
            class="theAuthJoin__btn"
            @click="createUserWithEmailAndPassword"
          >
            회원 등록
          </AppTextHoverUnderlineReplace>
          <AppTextHoverUnderlineReplace
            tag-name="button"
            class="theAuthJoin__btn"
            @click="signInWithEmailAndPassword"
          >
            로그인
          </AppTextHoverUnderlineReplace>
        </div>

        <div class="theAuthJoin__invalidTexts">
          <TransitionFade mode="out-in">
            <span
              v-if="$v.email.$error && !$v.email.required"
              key="requiredEmail"
            >
              이메일을 입력해주세요.
            </span>
            <span
              v-else-if="$v.email.$error && !$v.email.email"
              key="invalidEamil"
            >
              이메일형식을 확인해주세요.
            </span>
            <span
              v-else-if="$v.password.$error && !$v.password.required"
              key="requiredPassword"
            >
              비밀번호를 입력해주세요.
            </span>
            <span
              v-else-if="$v.password.$error && !$v.password.minLength"
              key="minLengthPassword"
            >
              비밀번호는 6자리 이상입니다.
            </span>
            <span v-else-if="notFoundEmail" key="notFoundEmail">
              가입되지 않은 이메일입니다.
            </span>
            <span v-else-if="wrongPassword" key="wrongPassword">
              잘못된 비밀번호 입니다.
            </span>
            <span v-else-if="usedEmail" key="usedEmail">
              다른 이메일로 등록해주세요.
            </span>
            <AppSpinner v-else :loading="loading" />
          </TransitionFade>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
import { mapState } from 'vuex'
import clickWaveMotion from '@/mixins/clickWaveMotion'
import AppButtonPoint from '@/components/AppButtonPoint.vue'
import TransitionFade from '@/components/TransitionFade'

export default {
  components: {
    TransitionFade,
    AppButtonPoint
  },

  mixins: [clickWaveMotion],

  data() {
    return {
      email: '',
      password: '',
      notFoundEmail: null,
      wrongPassword: null,
      usedEmail: null,
      loading: 'stop' // 'progress' || 'success' || 'error' || 'stop'
    }
  },

  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },

  computed: {
    ...mapState('auth', {
      authUser: (state) => state.authUser
    })
  },

  methods: {
    resetResponseInvalid() {
      this.notFoundEmail = false
      this.wrongPassword = false
      this.usedEmail = false
      this.loading = 'stop'
    },

    clearAuthentication() {
      this.loading = 'stop'
      this.email = ''
      this.password = ''
      this.$v.$reset()
    },

    createUserWithEmailAndPassword() {
      this.$v.$touch()
      if (this.$v.$invalid) return
      this.loading = 'progress'
      this.$store
        .dispatch('auth/createUserWithEmailAndPassword', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.loading = 'success'
        })
        .catch((error) => {
          if (error.code === 'auth/email-already-in-use') {
            this.usedEmail = true
          }
          this.loading = 'error'
        })
    },

    signInWithEmailAndPassword() {
      this.$v.$touch()
      if (this.$v.$invalid) return
      this.loading = 'progress'
      this.$store
        .dispatch('auth/signInWithEmailAndPassword', {
          email: this.email,
          password: this.password
        })
        .then(() => {
          this.loading = 'success'
        })
        .catch((error) => {
          if (error.code === 'auth/user-not-found') {
            this.notFoundEmail = true
          } else if (error.code === 'auth/wrong-password') {
            this.wrongPassword = true
          }
          this.loading = 'error'
        })
    },

    signInAnonymously() {
      this.loading = 'progress'
      this.$store
        .dispatch('auth/signInAnonymously')
        .then(() => {
          this.loading = 'success'
        })
        .catch((error) => {
          if (error.code === 'auth/operation-not-allowed') {
            alert('You must enable Anonymous auth in the Firebase Console.')
          }
          this.loading = 'error'
        })
    }
  }
}
</script>

<style lang="css" scoped>
.theAuthJoin {
  box-sizing: border-box;
}
.theAuthJoin__inner {
  display: flex;
  position: relative;
  width: 900px;
  height: 470px;
  margin: auto;
  top: 50%;
  margin-top: -235px;
  padding: 70px;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.45);
  color: #111111;
  color: var(--color-base-8, #111111);
  box-shadow: 0px 0px 10px 5px rgba(0, 0, 0, 0.2);
  border-radius: 2px;
  border: 1px solid rgba(0, 0, 0, 0.1);
}

.theAuthJoin__notice {
  width: 58%;
  height: 100%;
  padding-right: 40px;
  box-sizing: border-box;
  border-right: 1px solid rgba(255, 255, 255, 0.3);
}
.theAuthJoin__noticeTitle {
  font-size: var(--font-size-auth-title, 29px);
  font-weight: 300;
  margin-top: 20px;
  margin-bottom: 17px;
}
.theAuthJoin__noticeText {
  font-size: var(--font-size-auth-text, 22px);
  font-weight: 300;
}
.theAuthJoin__form {
  width: 42%;
  height: 100%;
  box-sizing: border-box;
  padding-left: 40px;
  font-size: var(--font-size-auth-form, 26px);
}
.theAuthJoin__signupAnonymouslyBtn,
.theAuthJoin__label,
.theAuthJoin__btns {
  display: block;
  width: 100%;
  margin: auto;
}

.theAuthJoin__signupAnonymouslyBtn {
  margin-top: 32px;
  margin-bottom: 62px;
}

.theAuthJoin__label {
  display: block;
  margin-top: 13px;
  position: relative;
}
.theAuthJoin__input {
  width: 100%;
  box-sizing: border-box;
  border: 0;
  height: 50px;
  padding: 4px;
  text-align: center;
}
.theAuthJoin__input::placeholder {
  color: var(--color-base-2, #c0c2c9);
  font-weight: 300;
}
.theAuthJoin__invalids {
  position: absolute;
  right: 10px;
  top: 0;
  bottom: 0;
  margin: auto;
  width: 17px;
  height: 17px;
  text-align: center;
}
.theAuthJoin__invalid {
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
  left: -1px;
  top: -1px;
  line-height: 17px;
  text-indent: -0.5px;
  font-size: var(--font-size-auth-invalid, 16px);
  font-weight: 500;
  border-radius: 50%;
  border: 1px solid var(--color-status-error, #ff6347);
  color: var(--color-status-error, #ff6347);
}
.theAuthJoin__btns {
  display: flex;
  justify-content: space-between;
}
.theAuthJoin__btn {
  padding: 4px 0 2px 0;
  background-color: transparent;
  font-size: var(--font-size-auth-join, 18px);
  font-weight: 300;
}
.theAuthJoin__invalidTexts {
  position: relative;
  text-align: center;

  font-size: var(--font-size-auth-join, 18px);

  color: var(--color-status-error, #ff6347);
  margin-top: 12px;
  font-weight: 300;
}
</style>
