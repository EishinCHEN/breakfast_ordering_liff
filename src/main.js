import { createApp } from 'vue';
import App from './App.vue';
import router from "./router";
import store from "./store";
import liff from '@line/liff';

const initLiff = async () => {
    try {
        await liff.init({ liffId: '2007174070-weWpE9bE' });
        if (!liff.isLoggedIn()) {
            liff.login();
        } else {
            // 成功登入後，取得使用者資訊
            const profile = await liff.getProfile();
            console.log("使用者名稱:", profile.displayName);

            // 導向菜單頁
            router.push('/');
        }
    } catch (error) {
        console.error('LIFF 初始化失敗:', error);
    }
};

initLiff();

createApp(App).use(store).use(router).mount('#app')
