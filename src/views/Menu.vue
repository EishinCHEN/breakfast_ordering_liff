<template>
    <div class="container">
        <h1 class="title">🍽 早餐店菜單 🍽</h1>
      
        <div v-for="category in menuCategories" :key="category.name" class="category">
            <h2 class="category-title">
                <img :src="`/images/${category.icon}`" alt="category-icon" class="category-icon"> {{ category.name }}
            </h2>
            <ul class="menu-list">
                <li v-for="item in category.items" :key="item.id" class="menu-list-item">
                    <span class="menu-name">{{ item.name }}</span>
                    <span class="menu-price">{{ item.price }} 元</span>
                    <button @click="openCustomization(item)" class="add-to-cart">🛒 加入購物車</button>
                </li>
            </ul>
        </div>
      
        <div v-if="selectedItem" class="customization-modal">
            <h2>客製化您的 {{ selectedItem.name }}</h2>
            <div class="custom-options">
                <label class="custom-option">
                    <input type="checkbox" v-model="customOptions.egg"> 
                    <span>加蛋 (+10元)</span>
                </label>
                <label class="custom-option">
                    <input type="checkbox" v-model="customOptions.cheese"> 
                    <span>加起司 (+15元)</span>
                </label>
            </div>
            <div class="modal-actions">
            <button @click="confirmAddToCart">確定</button>
            <button @click="closeCustomization">取消</button>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            menuCategories: [
            {
                name: "漢堡", 
                icon: "hamburger.svg",
                items: [
                    { id: 1, name: "培根蛋堡", price: 50 },
                    { id: 2, name: "火腿蛋堡", price: 45 }
                ]
            },
            {
                name: "飲品", 
                icon: "drinks.svg",
                items: [
                { id: 3, name: "牛奶紅茶", price: 30 },
                { id: 4, name: "美式咖啡", price: 40 }
                ]
            },
            {
                name: "點心",
                icon: "franchfries.svg",
                items: [
                    { id: 5, name: "薯條", price: 35 },
                    { id: 6, name: "雞塊", price: 50 }
                ]
            }],
            selectedItem: null,
            customOptions: {
                egg: false,
                cheese: false
            }
        };
    },
    methods: {
        openCustomization(item) {
            this.selectedItem = item;
            this.customOptions = { egg: false, cheese: false };
        },
        confirmAddToCart() {
            let finalPrice = this.selectedItem.price;
            if (this.customOptions.egg) finalPrice += 10;
            if (this.customOptions.cheese) finalPrice += 15;
            console.log(`加入購物車: ${this.selectedItem.name}, 最終價格: ${finalPrice} 元`);
            this.closeCustomization();
        },
        closeCustomization() {
            this.selectedItem = null;
        }
    }
};
</script>
  
<style>
body {
  font-family: 'Arial', sans-serif;
  background-color: #f8f9fa;
}

.container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}

.title {
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}

.category {
  margin-bottom: 40px;
}

.category-title {
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
}

.category-icon {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.menu-list {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr; /* 預設為單列顯示 */
  gap: 20px; /* 增加項目間距 */
}

.menu-list-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: white;
  margin-bottom: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  width: 100%; /* 保持每個項目的寬度為100% */
}

.menu-name {
  font-size: 1.2rem;
  color: #444;
}

.menu-price {
  color: #666;
  font-size: 1rem;
}

.add-to-cart {
  padding: 10px 20px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-align: center;
  font-weight: bold;
}

.add-to-cart:hover {
  background-color: #555;
}

.customization-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  width: 300px;
}

.custom-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
}

.custom-option {
  display: flex;
  align-items: center;
  gap: 10px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
}

.modal-actions button {
  padding: 10px;
  background-color: #333;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

.modal-actions button:hover {
  background-color: #555;
}

/* 當螢幕寬度大於768px時，改為每列顯示兩項，並確保項目有間距 */
@media (min-width: 768px) {
  .menu-list {
    grid-template-columns: repeat(2, 1fr); /* 每列顯示兩項 */
    gap: 20px; /* 設定項目間的間距 */
  }

  .menu-list-item {
    width: 100%; /* 每個項目寬度為100%，確保每個項目自動填滿列 */
    box-sizing: border-box; /* 確保項目包含 padding 在內 */
  }
}

@media (max-width: 480px) {
  /* 手機時仍為單列，但保持長條形的樣式和按鈕在右邊 */
  .menu-list {
    grid-template-columns: 1fr; /* 手機時仍為單列 */
  }

  .menu-list-item {
    flex-direction: row; /* 項目按原來的長條形顯示 */
    justify-content: space-between; /* 按鈕仍在右邊 */
  }

  .add-to-cart {
    order: 2; /* 確保按鈕在右邊 */
  }

  .menu-name, .menu-price {
    flex: 1; /* 確保名稱和價格能夠擴展 */
  }
}
</style>
  