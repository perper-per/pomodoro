<template>
  <svg
    id="_x38_"
    class="digit"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlns:xlink="http://www.w3.org/1999/xlink"
    x="0px"
    y="0px"
    width="560px"
    height="960px"
    viewBox="0 0 560 960"
    enable-background="new 0 0 560 960"
    xml:space="preserve"
  >
    <rect
      :class="{ active: data === ':' }"
      x="245.984"
      y="247.078"
      fill="#EF5656"
      width="68.031"
      height="68.031"
    />
    <rect
      :class="{ active: data === ':' }"
      x="245.984"
      y="632.078"
      fill="#EF5656"
      width="68.031"
      height="68.031"
    />

    <polygon
      class="d_ur"
      :class="{ active: '01234789'.includes(data) }"
      fill="#EF5656"
      points="420.617,422.643 452.52,454.544 486.153,420.91 486.153,140.478 486.153,99.303
      420.617,164.838 "
    />
    <polygon
      class="d_um"
      :class="{ active: '02356789'.includes(data) }"
      fill="#EF5656"
      points="394.066,140.478 459.604,74.94 420.617,74.94 420.617,74.941 139.382,74.941 139.382,74.94
    100.396,74.94 165.934,140.478 "
    />
    <polygon
      class="d_ul"
      :class="{ active: '045689'.includes(data) }"
      fill="#EF5656"
      points="139.382,422.643 139.382,164.838 73.847,99.303 73.847,140.478 73.847,420.91
      107.48,454.544 "
    />
    <polygon
      class="d_mm"
      :class="{ active: '2345689'.includes(data) }"
      fill="#EF5656"
      points="172.951,439.985 132.937,480 158.458,505.521 401.541,505.521 427.063,480 387.049,439.985"
    />
    <polygon
      class="d_dl"
      :class="{ active: '0268'.includes(data) }"
      fill="#EF5656"
      points="139.382,537.357 107.48,505.456 73.847,539.09 73.847,819.522 73.847,860.697
      139.382,795.162 "
    />
    <polygon
      class="d_dm"
      :class="{ active: '0235689'.includes(data) }"
      fill="#EF5656"
      points="165.934,819.522 100.396,885.06 139.382,885.06 420.617,885.06 459.604,885.06
      394.066,819.522 "
    />
    <polygon
      class="d_dr"
      :class="{ active: '013456789'.includes(data) }"
      fill="#EF5656"
      points="420.617,537.357 420.617,795.162 486.153,860.697 486.153,819.522 486.153,539.09
      452.52,505.456 "
    />
  </svg>
</template>

<script setup>
defineProps({
  data: {
    type: String,
    default() {
      return ''
    },
  },
  color: {
    type: String,
    default() {
      return 'white'
    },
  },
})
</script>

<style scoped lang="sass">
.digit
  width: 50px
  height: 60px
  margin: 0
polygon, rect
  fill: transparent
  &.active
    fill: v-bind(color)
</style>
<!-- v-bind 把 CSS 的值和 Vue 的變數綁定
  fill 是 svg 的填滿，預設是透明 -->
