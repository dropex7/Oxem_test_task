<template>
  <div>
    <table
      cellspacing="1"
      border="1"
      cellpadding="5"
      width="100%"
      className="table"
    >
      <thead>
        <tr>
          <template v-for="head in headers" :key="head.name">
            <td :id="head.name" @click="sortById(head.name)">
              <span style="margin-right: 5px"
                ><b>{{ head.value }}</b></span
              ><span v-if="!sortUp">&#8595;</span
              ><span v-if="sortUp">&#8593;</span>
            </td>
          </template>
        </tr>
      </thead>
      <tbody>
        <template v-for="item in data" :key="item.email">
          <tr @click="saveTempUser(item)">
            <td>{{ item.id }}</td>
            <td>{{ item.firstName }}</td>
            <td>{{ item.lastName }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.phone }}</td>
          </tr>
        </template>
      </tbody>
    </table>
    <div v-if="!!tempUser">
      <userCard :tempUser="tempUser"></userCard>
    </div>
  </div>
</template>

<script>
import userCard from "./userCard.vue";

// Создаем шаблоны заголовков таблицы.
const headers = [
  { name: "id", value: "ID" },
  { name: "firstName", value: "First Name" },
  { name: "lastName", value: "Last Name" },
  { name: "email", value: "Email" },
  { name: "phone", value: "Phone Number" },
];

export default {
  name: "Table",
  props: { data: Array, search: String, sortUp: Boolean },
  data: function () {
    return {
      sortedData: null,
      tempUser: null,
      headers: headers,
      tempHeader: null,
    };
  },
  components: { userCard },
  computed: function () {
    this.sortedData = this.data;
  },
  methods: {
    // Сохраняем данные выбранного юзера.
    saveTempUser(row) {
      this.tempUser = row;
    },

    // Сортировка по любому полю объекта.
    sortById(field) {
      let tableHeader;
      if (!this.tempHeader) {
        tableHeader = document.getElementById(field);
        tableHeader.style.background = "#cccccc";
        this.tempHeader = field;
      } else if (this.tempHeader != field) {
        tableHeader = document.getElementById(this.tempHeader);
        tableHeader.style.background = "#ffffff";
        tableHeader = document.getElementById(field);
        tableHeader.style.background = "#cccccc";
        this.tempHeader = field;
      }
      // Вызор родительского метода.
      this.$emit("sortById", field);
    },
  },
};
</script>

<style>
.table {
  border: 1px solid #3498db;
  table-layout: fixed;
  width: 100%;
  margin: 8px 0px;
}
.table th {
  font-weight: bold;
  padding: 5px;
  background: #efefef;
  border: 1px solid #3498db;
}
.table td {
  padding: 5px 10px;
  border: 1px solid #eee;
  text-align: left;
}
.table tbody tr:nth-child(odd) {
  background: #fff;
}
.table tbody tr:nth-child(even) {
  background: #f7f7f7;
}
</style>
