<template>
  <div>
    <div>
      <h2>{{ productName }}</h2>
      <h2 v-for="(peca, index) in productDesc.split('<br>')" :key="index">{{ peca.trim() }}</h2>
      <img :src="productImage" width="250" alt="Photo of a computer">
      <h2 v-if="productPrice < 1000">{{ productPrice }}€</h2>
      <h2 v-if="productAvailability">Disponível</h2>
      <h2 v-else>Não Disponível</h2>
    </div>
    <div>
      <button @click="productPrice = 1200">Repor preço</button>
    </div>
    <br>
    <div>
      <button @click="productAvailability = false">Vender</button>
    </div>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      productName: "Computador Titan W599",
      productDesc: "Processador i7<br>Disco SSD 256GB<br> Monitor Samsung 21’",
      productImage: "https://bizon-tech.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/d/s/dsc01648_1.jpg",
      productPrice: 500,
      productAvailability: true
    }
  }
}
</script>

<style>

</style>