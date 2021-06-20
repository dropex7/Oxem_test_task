<template>
  <div className="wrapper">
    <div v-if="!modal">
      <h3>Выполнил: Мирзоев Амиль</h3>
      <div className="content_btns">
        <div>
          <button className="btn" @click="getSmallData()">Small data</button>
          <button className="btn" @click="getBigData()">Big data</button>
        </div>
        <div className="search_form" v-if="data">
          <input
            className="search_form_input"
            type="text"
            v-model="search"
            placeholder="Поиск..."
          />
          <button className="btn" @click="searchData">Найти</button>
          <button className="btn" @click="modal = modal ? false : true">
            Добавить
          </button>
        </div>
      </div>
      <div v-if="data">
        <Table
          ref="dataTable"
          :data="paginatedData()"
          :search="search"
          :sortUp="sortUp"
          @sortById="sortById"
        ></Table>
        <div className="content_btns">
          <button
            className="btn"
            @click="pageNumber--"
            :disabled="pageNumber == 0"
          >
            Prev
          </button>
          <div style="font-size: 24px; font-weight: bold">
            Страница {{ pageNumber + 1 }} из {{ pageCount() }}
          </div>
          <button
            className="btn"
            @click="pageNumber++"
            :disabled="pageNumber >= pageCount() - 1"
          >
            Next
          </button>
        </div>
      </div>
    </div>
    <newRowForm
      v-if="modal"
      @addNewData="addNewData"
      @close="modal = false"
    ></newRowForm>
    <div className="loader" v-if="loadingInProgress">
      <PacmanLoader></PacmanLoader>
    </div>
  </div>
</template>

<script>
import PacmanLoader from "vue-spinner/src/PacmanLoader.vue";
import { getData } from "../backend.js";
import Table from "./Table";
import newRowForm from "./newRowForm.vue";
export default {
  data: function () {
    return {
      loadingInProgress: false,
      loadingFailed: false,
      data: null,
      filteredData: null,
      search: "",
      size: 50,
      pageNumber: 0,
      modal: false,
      sortUp: false,
    };
  },
  components: { Table, PacmanLoader, newRowForm },
  methods: {
    //Загрузка маленького объема данных с сервера.
    async getSmallData() {
      this.data = null;
      this.pageNumber = 0;
      this.loadingInProgress = true;
      const data = await getData(false);
      if (typeof data === "string") {
        this.loadingFailed = true;
        alert("Not connection");
        this.loadingInProgress = false;
        return;
      }
      this.filteredData = data;
      this.data = data;
      this.loadingInProgress = false;
    },

    //Загрузка большого объема данных с сервера.
    async getBigData() {
      this.data = null;
      this.pageNumber = 0;
      this.loadingInProgress = true;
      const data = await getData(true);
      if (typeof data === "string") {
        this.loadingFailed = true;
        alert("Not connection");
        this.loadingInProgress = false;
        return;
      }
      this.data = data;
      this.filteredData = data;
      this.loadingInProgress = false;
    },

    // Метод, возвращающий количество возможных страниц.
    pageCount() {
      if (this.data == null) {
        return 0;
      }
      return Math.ceil(this.filteredData.length / this.size);
    },

    // Метод, разделяющий данные по страницам.
    paginatedData() {
      const start = this.pageNumber * this.size;
      const end = start + this.size;
      return this.filteredData.slice(start, end);
    },

    // Метод, реализующий сортировку в двух направлениях.
    sortBy(field) {
      if (this.sortUp) {
        this.sortUp = false;
        return (a, b) => (a[field] < b[field] ? 1 : -1);
      }
      this.sortUp = true;
      return (a, b) => (a[field] > b[field] ? 1 : -1);
    },

    // Вызов сортировки данных и сохранения отсортированных данных.
    sortById(field) {
      this.filteredData = this.filteredData.sort(this.sortBy(field));
    },

    // Добавление пользователя созданного с помощью формы.
    addNewData(newUser) {
      this.filteredData.unshift(newUser);
    },

    // Метод поиска с помощью фильтрации данных.
    searchData() {
      this.$refs.dataTable.saveTempUser(null);
      this.filteredData = this.data.filter((item) => {
        if (
          item.firstName.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        ) {
          return item;
        } else if (
          item.lastName.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        ) {
          return item;
        } else if (
          item.email.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        ) {
          return item;
        }
      });
    },
  },
};
</script>

<style>
.wrapper {
  display: flex;
  flex-direction: column;
}
.content_btns {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.loader {
  position: fixed;
  left: 45%;
  top: 45%;
  background-color: rgba(255, 255, 255, 0.5);
  z-index: 9999;
}

.btn {
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: transparent;
  border: 2px solid #e74c3c;
  border-radius: 0.6em;
  color: #e74c3c;
  cursor: pointer;
  -webkit-align-self: center;
  -ms-flex-item-align: center;
  align-self: center;
  line-height: 1;
  margin: 5px;
  padding: 12px 20px;
  text-decoration: none;
  text-align: center;
  text-transform: uppercase;
  font-family: "Montserrat", sans-serif;
  border-color: #3498db;
  color: #fff;
  box-shadow: 0 0 40px 40px #3498db inset, 0 0 0 0 #3498db;
  -webkit-transition: all 150ms ease-in-out;
  transition: all 150ms ease-in-out;
}

.btn:disabled {
  color: #cccccc;
  border-color: #cccccc;
  cursor: auto;
}

.btn:hover:not([disabled]) {
  box-shadow: 0 0 10px 0 #3498db inset, 0 0 10px 4px #3498db;
  color: #3498db;
}
.search_form {
  display: flex;
  align-items: center;
}
.search_form_input {
  background-color: white;
  border-radius: 24px;
  outline: none;
  background-image: url("../../public/search_Icon.png");
  background-position: 7px 5px;
  background-repeat: no-repeat;
  padding: 7px 20px 7px 40px;
  font-size: 16px;
  /* padding-left: 40px; */
}
</style>
