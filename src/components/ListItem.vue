<template>
  <li class="list-group-item">
    <div class="d-flex justify-content-between align-items-center">
      <span>{{ name }}</span>
      <a
        class="btn btn-primary btn-sm"
        role="button"
        style="width:50px"
        v-on:click="onClick(name)"
        >{{ `${price} €` }}</a
      >
    </div>
  </li>
</template>

<script lang="ts">
export default {
  props: {
    name: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    onClick: {
      type: Function
    }
  }
};
</script>
