<!--
 * @Descripttion: Vincent
 * @version: v1.0
 * @Author: hongda_huang
 * @Date: 2019-10-29 17:20:46
 * @LastEditors: vincent_Huanghd@126.com
 * @LastEditTime: 2019-12-17 14:34:33
 * @description: 
 -->
<template>
  <div>

    <div class="i-input-number">
      <!-- :class="['i-input-number-size-'+size]" -->
      <div class="i-input-number-minus" :class="[value <= min ? 'i-input-number-disabled' : '']" :data-disabled="value <= min" @click="handleMinus">
        <div class="i-input-number-minus-icon" :class="[value <= min ? 'i-input-number-minus-icon-disabled' : '']"></div>
      </div>
      <!--  @change="handleChange" -->
      <input class="i-input-number-text" :class="[min >= max ? 'i-input-number-disabled' : '']" type="number" :value="value" :disabled="min >= max" @input="handleBlur" />
      <div class="i-input-number-plus" :class="[value >= max ? 'i-input-number-disabled' : '']" :data-disabled="value >= max" @click="handlePlus">
        <div class="i-input-number-plus-icon" :class="[value >= max ? 'i-input-number-plus-icon-disabled' : '']">
          <div class="i-input-number-plus-icon-two" :class="[value >= max ? 'i-input-number-plus-icon-two-disabled' : '']"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
    // card
  },
  props: {
    // small || default || large
    size: {
      type: String,
      default: "small"
    },
    value: {
      type: Number,
      default: 1
    },
    min: {
      type: Number,
      default: 1
    },
    max: {
      type: Number,
      default: 100
    },
    step: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      any: ""
    };
  },
  computed: {
    isDisabled() {
      let { value, min } = this;
      return value <= min;
    }
  },
  methods: {
    addNum(num1, num2) {
      let sq1, sq2, m;
      try {
        sq1 = num1.toString().split(".")[1].length;
      } catch (e) {
        sq1 = 0;
      }
      try {
        sq2 = num2.toString().split(".")[1].length;
      } catch (e) {
        sq2 = 0;
      }
      m = Math.pow(10, Math.max(sq1, sq2));
      return (Math.round(num1 * m) + Math.round(num2 * m)) / m;
    },
    handleChange(e) {
      let value = Number(e.target.value);
      setTimeout(() => {
        this.handleEmit(value);
      }, 0);
    },
    handleChangeStep(e, type) {
      // console.log(this.value+'---'+this.max+'---'+this.min);
      // const { dataset = {} } = e.currentTarget;
      // const { disabled } = dataset;
      const { step } = this;
      let { value } = this;

      // if (disabled) return null;
      // console.log(1)
      if (type === "minus") {
        value = this.addNum(value, -step);
      } else if (type === "plus") {
        value = this.addNum(value, step);
      }
      if (value < this.min || value > this.max) return null;

      this.handleEmit(value, type);
    },

    handleMinus(e) {
      this.handleChangeStep(e, "minus");
    },

    handlePlus(e) {
      this.handleChangeStep(e, "plus");
    },

    handleBlur(e) {
      let value = e.target.value;
      console.log(value);
      const { min, max } = this;

      if (!value) {
        setTimeout(() => {
          this.handleEmit(value);
        }, 16);
        return;
      }

      // value = +value;
      if (value > max) {
        value = max;
      } else if (value < min) {
        value = min;
      }

      this.handleEmit(value);
    },
    handleEmit(value, type) {
      const data = {
        value: value
      };
      if (type) data.type = type;
      // this.value = value;
      this.$emit("changeNumber", data); //改变value
    }
  },
  created() {}
};
</script>
<style scoped lang='less'>
.i-input-number {
  color: #495060;
  display: flex;
  flex-direction: row;
}

.i-input-number > div {
  display: inline-block;
  /* line-height: 20px; */
  /* padding: 5px 0; */
  text-align: center;
  // min-width: 40px;
  height: 60px;
  width: 60px;
  box-sizing: border-box;
  vertical-align: middle;
  font-size: 12px;
  background-color: #f8fafb;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 1px solid #dddee1; */
}

.i-input-number-minus {
  border-right: none;
  &-icon {
    width: 30px;
    height: 6px;
    background-color: #999999;
    &-disabled {
      background-color: #cccccc;
    }
  }

  /* border-radius: 2px 0 0 2px */
}

.i-input-number-plus {
  border-left: none;
  &-icon {
    width: 30px;
    height: 6px;
    background-color: #999999;
    position: relative;
    &-disabled {
      background-color: #cccccc;
    }
    &-two {
      height: 30px;
      width: 6px;
      background-color: #999999;
      left: 12px;
      top: -12px;
      position: absolute;
      &-disabled {
        background-color: #cccccc;
      }
    }
  }
  // border-radius: 0 2px 2px 0
}

.i-input-number-text {
  // border: 1px solid #dddee1;
  display: inline-block;
  background-color: #f8fafb;
  text-align: center;
  vertical-align: middle;
  // height: 60px;
  width: 80px;
  min-height: auto;
  font-size: 30px;
  line-height: 30px;
  margin: 0 2px;
  color: #666;
  border: none;
}

.i-input-number-disabled {
  border-color: #dddee1;
  color: #bbbec4;
  background: #f7f7f7;
}
</style>
