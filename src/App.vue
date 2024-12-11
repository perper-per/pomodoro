<template>
  <v-app>
    <v-app-bar>
      <v-container class="d-flex align-center">
        <v-app-bar-title>蕃茄鐘</v-app-bar-title>
        <v-btn pretend-icon="mdi-home" to="/">首頁</v-btn>
        <v-btn pretend-icon="mdi-format-list-bulleted" to="/list">事項</v-btn>
        <v-btn pretend-icon="mdi-cog" to="/settings">設定</v-btn>
      </v-container>
    </v-app-bar>
    <v-main>
      <!-- v-main 要放路由 = 各個頁面的主體 -->
        <!--
        slot = 插槽 = 自訂元件內的某部分 HTML
        v-slot="元件插槽提供的可用變數"
        Component = 目前路由應該顯示的元件
      -->
      <router-view v-slot="{ Component }">
        <!--
          keep-alive 包住的元件不會被銷毀
          include 指定保留的元件
          component = 動態元件
          is = 要使用的元件

          因為 index 換頁的時候 ref 會reset回到初始值
        -->
        <keep-alive include="index">
          <component :is="Component"></component>
        </keep-alive>
      </router-view>
    </v-main>
  </v-app>
</template>
