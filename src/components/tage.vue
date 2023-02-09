<template>
  <div class="tage">
    <el-tag
      v-for="(tag, index) in tabsList"
      :key="tag.name"
      :closable="tag.label !== '首页'"
      :effect="tag.path === $route.path ? 'dark' : 'plain'"
      @close="handleClose(tag, index)"
      @click="toTage(tag)"
    >{{ tag.label }}</el-tag>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    handleClose(tag, index) {
      this.$store.commit("handleClose", tag);
      // console.log(i);
      if (this.$route.path !== tag.path) {
        return;
      } else if (this.$route.path === tag.path) {
        this.$router.push(this.tabsList[index - 1].path);
      } else {
        this.$router.push(this.tabsList[index].path);
      }
    },
    toTage(item) {
      if (this.$route.path !== item.path) {
        this.$router.push(item.path);
      }
    }
  },
  computed: {
    tabsList() {
      return this.$store.state.menu.tabsList;
    },
  }
};
</script>

<style>
.tage {
  padding: 20px;
}

.el-tag {
  cursor: pointer;
  margin-right: 20px;
}
</style>