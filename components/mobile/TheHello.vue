<script>
import TheHello from '@/components/TheHello'
export default {
  extends: TheHello
}
</script>

<style lang="css" scoped>
.hello {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
}

.hello__inner {
  color: var(--color-base-3, #71727a);
  font-size: var(--font-size-base-3, 2.42rem);

  &._status_done {
    transition: color 1s;
    color: var(--color-base-4, #38393d);
  }

  &._status_done >>> span {
    color: var(--color-base-1, #bab8c2);
  }
}

.hello__inner >>> .hello__cursor {
  animation: blink 0.5s infinite;
}

.hello__inner._status_done >>> .hello__cursor {
  animation: initial;
  opacity: 0;
}

@keyframes blink {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
