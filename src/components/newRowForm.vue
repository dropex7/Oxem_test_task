<template>
  <transition className="modal">
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
          <h2 style="margin: 0; color: black">Форма заполнения данных</h2>
          <button type="button" class="btn-close" @click="close">X</button>
        </header>

        <section className="modal-body">
          <div className="modal_input">
            <label>ID</label>
            <input
              id="id"
              type="text"
              v-model="newId"
              placeholder="Id"
              maxlength="5"
              v-on:keyup="validateId()"
              required
            />
          </div>
          <hr style="width: 100%" />
          <div className="modal_input">
            <label for="">First name</label
            ><input
              type="text"
              maxlength="20"
              v-model="newFirstName"
              placeholder="First name"
              v-on:keyup="validateNames()"
              required
            />
          </div>
          <hr style="width: 100%" />
          <div className="modal_input">
            <label for="">Last name</label
            ><input
              type="text"
              maxlength="20"
              v-model="newLastName"
              placeholder="Last name"
              v-on:keyup="validateNames()"
              required
            />
          </div>
          <hr style="width: 100%" />
          <div className="modal_input">
            <label for="">Email</label
            ><input
              type="text"
              v-model="newEmail"
              placeholder="Email"
              v-on:keyup="validateEmail()"
              required
            />
          </div>
          <hr style="width: 100%" />
          <div className="modal_input">
            <label for="">Number</label>
            <input
              type="text"
              maxlength="14"
              v-model="newNumber"
              placeholder="Number"
              v-on:keyup="validatePhone()"
              required
            />
          </div>
          <hr style="width: 100%" />

          <button
            className="btn"
            @click="addNewUser"
            :disabled="isFormCorrect()"
          >
            Добавить ряд в таблицу
          </button>
        </section>
      </div>
    </div>
  </transition>
</template>

<script>
/* eslint-disable */
export default {
  data: function () {
    return {
      newId: "",
      newFirstName: "",
      newLastName: "",
      newEmail: "",
      newNumber: "",
    };
  },
  methods: {
    // Закрываем модальное окно.
    close() {
      this.$emit("close");
    },

    // Добавляем новое поле в таблицу.
    addNewUser() {
      let newUser = {
        id: this.newId,
        firstName: this.newFirstName,
        lastName: this.newLastName,
        email: this.newEmail,
        phone: this.newNumber,
        address: {},
      };
      this.$emit("addNewData", newUser);
      this.$emit("close");
    },

    // Проверяем корректно ли введены все поля, если да, то делаем кнопку юзабельной.
    isFormCorrect() {
      return (
        !this.validateId() ||
        !this.validateNames() ||
        !this.validateEmail() ||
        !this.validatePhone()
      );
    },

    // Проверяем корректно ли введен id.
    validateId() {
      return /^[0-9]+$/.test(this.newId);
    },

    // Проверяем корректно ли введены first name и last name.
    validateNames() {
      return (
        /^[a-zA-Z]+$/.test(this.newFirstName) &&
        /^[a-zA-Z]+$/.test(this.newLastName)
      );
    },

    // Проверяем корректно ли введена почта.
    validateEmail() {
      const re =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(this.newEmail.toLowerCase());
    },

    // Проверяем корректно ли введен номер телефона.
    validatePhone() {
      const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/m;
      return re.test(this.newNumber);
    },
  },
};
</script>

<style>
.modal-backdrop {
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  position: fixed;
  top: 20%;
  left: 35%;
  width: 500px;
  z-index: 9999;
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: #4aae9b;
  justify-content: space-between;
}

.modal-footer {
  border-top: 1px solid #eeeeee;
  flex-direction: column;
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
  display: flex;
  flex-direction: column;
}

.modal-body input {
  margin: 7px 5px;
  padding: 8px 10px;
  font-size: 14px;
  border-radius: 5px;
  outline: none;
}

.btn-close {
  position: absolute;
  top: 7px;
  right: 0;
  margin-right: 5px;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: #4aae9b;
  background: transparent;
}

.modal_input {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 5px 40px;
}
.modal_input input {
  margin: 5px;
  padding: 8px 20px;
  border-radius: 7px;
  outline: none;
  font-size: 14px;
}

.modal_input input:invalid {
  border-color: red;
}

.modal_input input:focus:invalid {
  background: url("https://assets.digitalocean.com/labs/icons/exclamation-triangle-fill.svg")
    no-repeat 95% 50% lightsalmon;
  background-size: 25px;
}
</style>
