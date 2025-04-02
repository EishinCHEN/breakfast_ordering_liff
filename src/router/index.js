import { createRouter, createWebHistory } from "vue-router";
import menu from "../views/Menu.vue";

const routes = [
    {
        path: "/",
        name: "Menu",
        component: menu
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, form, next) => {
    if (to.path == "/") {
        next();
    }
})

export default router;