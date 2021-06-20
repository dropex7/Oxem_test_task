<template>
  <div>
    <hr />
    Выбран пользователь
    <b>{{ `${tempUser.firstName} ${tempUser.lastName} ` }}</b>
    <hr />
    <div className="card_description">
      Описание:
      <textarea style="margin-left: 5px">Fortis ac felicitas amor</textarea>
    </div>
    <hr />
    Адрес проживания: <b>{{ ` ${tempUser.address.streetAddress}` }}</b>
    <hr />
    Город: <b>{{ ` ${tempUser.address.city}` }}</b>
    <hr />
    Провинция/штат: <b>{{ ` ${tempUser.address.state}` }}</b>
    <hr />
    Индекс:<b>{{ ` ${tempUser.address.zip}` }}</b>
    <hr />
  </div>
</template>

<script>
export default {
  name: "userCard",
  props: { tempUser: Object },
};
</script>

<style>
.card_description {
  display: flex;
  align-items: center;
}
</style>
