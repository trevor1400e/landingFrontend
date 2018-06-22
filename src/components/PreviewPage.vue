<script>
  export default {
    name: "preview-page",
    props: {
      component: {
        type: Object,
        default: () => 'div'
      },
      customData: {
        type: Object,
        default: () => ({})
      },
      fullscreen: {
        type: Boolean,
        default: false,
      },
      forceUpdate: {
        type: Boolean,
        default: true
      }
    },
    watch: {
      forceUpdate: {
        deep: true, handler(v) {
          this.$forceUpdate()
        }
      }
    },
    render(createElement) {
      return createElement(this.component, {
        props: {propData: Object.assign({}, this.customData)},
        attrs: {
          style: `padding-top: ${this.fullscreen ? 0 : 64}px`
        }
      })
    }
  }
</script>

