<template>
  <div id="slide-box" :class="isExpired ? '' : 'pink-slide-box'">
    <div v-if="showArrow" class="top-arrow-wrapper" :class="index > 0 ? 'enable' : 'disable'"
         @click="index > 0 && index--">
      <div class="top-arrow"/>
    </div>
    <div class="slide-wrapper">
      <div class="slide" :style="{top: index * -10.25 + 'rem'}">
        <template v-for="(item, index) in hiddenData">
          <div class="task-box" :key="index" :title="item.startTime + '-' + item.endTime">
            {{ item.name }}
          </div>
        </template>
      </div>
    </div>
    <div v-if="showArrow" class="down-arrow-wrapper" :class="index < maxIndex ? 'enable' : 'disable'"
         @click="index < maxIndex && index++">
      <div class="down-arrow"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'slideBox',
  props: ['hiddenData', 'isExpired'],
  data () {
    return {
      index: 0
    }
  },
  computed: {
    showArrow () {
      return this.hiddenData.length > 5
    },
    maxIndex () {
      return Math.ceil(this.hiddenData.length / 5) - 1
    }
  }
}
</script>

<style scoped lang="scss">
#slide-box {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
}

.top-arrow-wrapper {
  height: 19px;
  width: 100%;
  border-bottom: 1px solid #e0e2e8;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.down-arrow-wrapper {
  height: 19px;
  width: 100%;
  border-top: 1px solid #e0e2e8;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.top-arrow {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-bottom: 10px solid #555555;
}

.down-arrow {
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 10px solid #555555;
}

.enable {
  background: #f0f5ff;

  &:hover {
    background: #5f88f4;

    > div {
      border-top-color: #ffffff;
      border-bottom-color: #ffffff;
    }
  }

  &:active {
    background: #416feb;

    > div {
      border-top-color: #ffffff;
      border-bottom-color: #ffffff;
    }
  }
}

.disable {
  background: #e0e2e8;

  > div {
    border-top-color: #999999;
    border-bottom-color: #999999;
  }
}

.slide-wrapper {
  height: 210px;
  width: 100%;
  overflow: hidden;
  position: relative;

  .slide {
    position: absolute;
    transition: top linear 0.5s;
    width: 100%;
  }
}

.task-box {
  box-sizing: border-box;
  width: 38px;
  height: 36px;
  border-radius: 4px;
  border: 1px solid #cfd8dc;
  margin: 5px auto;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(236, 239, 241, 0.5);
  color: #555555;
  font-size: 14px;
}

.pink-slide-box {
  .top-arrow-wrapper, .down-arrow-wrapper {
    border-color: #ffccc7;
  }

  .top-arrow, .down-arrow {
    border-top-color: #ff4d4f;
    border-bottom-color: #ff4d4f;
  }

  .enable {
    background: #fff1f0;

    &:hover {
      background: #ff4d4f;

      > div {
        border-top-color: #ffffff;
        border-bottom-color: #ffffff;
      }
    }

    &:active {
      background: #f5222d;

      > div {
        border-top-color: #ffffff;
        border-bottom-color: #ffffff;
      }
    }
  }

  .disable {
    background: #ffccc7;

    > div {
      border-top-color: #ff7875;
      border-bottom-color: #ff7875;
    }
  }

  .task-box {
    background: rgba(255, 241, 240, 0.5);
    border: 1px solid rgba(207, 19, 34, 0.5);
  }
}

</style>
