<template>
  <div class="login">
    <div class="back">
      <i class="iconfont icon-jiantou2" @click="$router.back()"></i>
    </div>
    <div class="main-login">
      <div class="shop-name">
        小龙外卖
      </div>
      <div class="change-way">
        <span
          @click="changeWay($event, 'phone')"
          class="phone-way"
          :class="{ 'way-choose': wayChoose }"
          >短信登录</span
        >
        <span
          @click="changeWay($event, 'secret')"
          class="secret-way"
          :class="{ 'way-choose': !wayChoose }"
          >密码登录</span
        >
      </div>
      <div class="login-content">
        <div class="phone-content" v-if="wayChoose">
          <div class="phone">
            <input
              type="phone"
              placeholder="手机号"
              maxlength="11"
              v-model="phoneNumber"
              @input="phoneInput($event)"
            />
            <span
              :class="{ 'right-phone': rightPhone }"
              :disabled="!rightPhone"
              @click="getCode($event)"
              >{{
                clearNumber > 0
                  ? `从新获取需${this.clearNumber}秒`
                  : "获取验证码"
              }}</span
            >
          </div>
          <div class="code">
            <input type="text" placeholder="验证码" v-model="phoneCode" />
          </div>
          <div class="protocal">
            温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
            <a href="#">《用户服务协议》</a>
          </div>
        </div>
        <div class="secret-content" v-else>
          <div class="phone-wrap">
            <input
              type="text"
              placeholder="手机/邮箱/用户名"
              v-model="accountNumber"
            />
          </div>
          <div class="secret-wrap">
            <input
              :type="switchValue ? 'text' : 'password'"
              placeholder="密码"
              v-model="secretNumber"
            />
            <mt-switch
              class="switch-wrap"
              v-model="switchValue"
              @change="switchChange"
              >{{ switchWord }}</mt-switch
            >
          </div>
          <div class="code-wrap">
            <input type="text" placeholder="验证码" v-model="secretCode" />
            <img
              :src="imgCodeSrc + `?time=${nowTime}`"
              alt=""
              @click="imgClick($event)"
            />
          </div>
        </div>
      </div>
      <div class="submit-wrap">
        <div class="submit" @click="submit($event)">登录</div>
        <a href="" class="bout">关于我们{{ new Date() | dateFormat }}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { reqLoginpwd, reqSendCode, reqLoginsms } from "@/api/index.js";
import { checkPhone } from "@/util/index.js";
export default {
  data() {
    return {
      wayChoose: true, //false选择密码登录，true选择手机登录
      inputType: "", //密码显示或隐藏
      switchValue: false,
      switchWord: "。。",
      rightPhone: false,
      clearNumber: 0,
      phoneNumber: "",
      phoneCode: "",
      accountNumber: "",
      secretNumber: "",
      secretCode: "",
      imgCodeSrc: "http://localhost:4000/captcha",
      nowTime: 0
    };
  },
  methods: {
    changeWay(event, bool) {
      if (bool === "secret") {
        if (this.wayChoose === true) {
          this.wayChoose = false;
        }
      } else if (bool === "phone") {
        if (this.wayChoose === false) {
          this.wayChoose = true;
        }
      }
    },
    phoneInput(event) {
      let reg = /^1\d{10}$/;
      if (reg.test(event.target.value.trim())) {
        this.rightPhone = true;
      } else {
        this.rightPhone = false;
      }
    },
    getCode(event) {
      if (!checkPhone(this.phoneNumber.trim())) {
        return;
      }
      this.rightPhone = false;
      this.clearNumber = 10;
      reqSendCode({ phone: this.phoneNumber }).then(res => {});
      const timer = setInterval(() => {
        this.clearNumber--;
        if (this.clearNumber <= 0) {
          clearInterval(timer);
          let reg = /^1\d{10}$/;
          if (reg.test(this.phoneNumber.trim())) {
            this.rightPhone = true;
          }
        }
      }, 1000);
    },
    switchChange(e) {
      if (e) {
        this.switchWord = "。。";
      } else {
        this.switchWord = "abc";
      }
    },
    imgClick(event) {
      this.nowTime = Date.now();
    },
    callback(routeWay) {
      this.$router.replace(routeWay);
    },
    submit(event) {
      var self = this;
      var { callback } = this;
      if (this.wayChoose) {
        let reg = /^1\d{10}$/;
        if (!reg.test(this.phoneNumber.trim())) {
          this.$messageBox.alert("手机号不正确", "notice").then(() => {
            console.log("fanghui");
            return;
          });
        }
        this.$store.dispatch("user/receiveLoginsms", {
          phone: this.phoneNumber,
          code: this.phoneCode,
          // callback: self.callback.bind(self)
          callback: callback.bind(self)
        });
      } else {
        if (!this.accountNumber || !this.secretNumber || !this.secretCode) {
          this.$messageBox.alert("信息填写不全", "notice");
        }
        this.$store.dispatch("user/receiveLoginpwd", {
          name: this.accountNumber,
          pwd: this.secretNumber,
          captcha: this.secretCode,
          // callback: self.callback.bind(self)
          callback: callback.bind(self)
        });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  .back {
    position: absolute;
    top: 4px;
    left: 4px;
    .iconfont {
      font-size: 20px;
    }
  }
  .main-login {
    width: 80%;
    box-sizing: border-box;
    padding-top: 60px;
    margin: 0 auto;
    .shop-name {
      font-size: 40px;
      font-weight: bold;
      color: #02a774;
      text-align: center;
    }
    .change-way {
      padding-top: 40px;
      text-align: center;
      span {
        color: #333;
        font-size: 14px;
        padding-bottom: 4px;
      }
      .phone-way {
        margin-right: 40px;
      }
      .way-choose {
        color: #02a774;
        font-weight: 700;
        border-bottom: 2px solid #02a774;
      }
    }
    .login-content {
      margin-top: 16px;
      .phone-content {
        .phone {
          position: relative;
          height: 48px;
          font-size: 14px;
          background: #fff;
        }
        .code {
          position: relative;
          margin-top: 16px;
          height: 48px;
          font-size: 14px;
          background: #fff;
        }
        input {
          width: 100%;
          height: 100%;
          padding-left: 10px;
          -webkit-box-sizing: border-box;
          box-sizing: border-box;
          border: 1px solid #ddd;
          border-radius: 4px;
          outline: 0;
          font: 400 14px Arial;
        }
        span {
          position: absolute;
          top: 12px;
          right: 10px;
          color: #aaa;
        }
        .right-phone {
          color: #000;
        }
      }
      .secret-content {
        .phone-wrap {
          position: relative;
          margin-top: 16px;
          height: 48px;
          font-size: 14px;
          background: #fff;
          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;
          }
        }
        .secret-wrap {
          position: relative;
          margin-top: 16px;
          height: 48px;
          font-size: 14px;
          background: #fff;
          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;
          }
          .switch-wrap {
            position: absolute;
            right: 10px;
            top: 12px;
          }
        }
        .code-wrap {
          position: relative;
          margin-top: 16px;
          height: 48px;
          font-size: 14px;
          background: #fff;
          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            -webkit-box-sizing: border-box;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;
          }
          img {
            position: absolute;
            top: 1px;
            right: 10px;
            width: 160px;
            height: 46px;
          }
        }
      }
      .protocal {
        margin-top: 12px;
        color: #999;
        font-size: 14px;
        line-height: 20px;
        a {
          color: #02a774;
          text-decoration: none;
        }
      }
    }
    .submit-wrap {
      .submit {
        display: block;
        width: 100%;
        height: 42px;
        margin-top: 30px;
        border-radius: 4px;
        background: #4cd96f;
        color: #fff;
        text-align: center;
        font-size: 16px;
        line-height: 42px;
        border: 0;
      }
      a {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
        text-decoration: none;
      }
    }
  }
}
</style>

<style lang="scss">
.login {
  .mint-switch-core {
    width: 52px;
    height: 24px;
    &::before {
      height: 22px;
    }
    &::after {
      height: 22px;
    }
  }
}
</style>
