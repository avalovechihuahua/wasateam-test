# wasateam-test

## 製作重點簡介
### 1. 切換主題顏色的功能
- 將資料打包成 js 檔案，並放在 src/data 底下，讓需要切換主題的頁面可以匯入資料進行相對應設定。
- 在 vuex 保存當前主題的設定，並且有相對應的 mutations 可供設定主題。
- 頁面中因主題不同所需切換顏色的元素，以 :style + computed obj 的方式去做實現。
- 對於維護性與沿用性而言，新增顏色主題或是修改默認主題時只要編輯 themes.js 檔案即可。

### 2. 共用 UI 提高沿用性與維護性 
- 將共用的 .container、h1 、.button 撰寫在 main.scss 中方便統一編輯與控管。

### 3. SelectInput 組件
- 會根據外部所傳遞的 props 值，來顯示相對應的輸入類型，好處是內部不用自行決定，因此增加此組建的沿用性。
- 由外部傳入資料，根據資料來顯示相對應需要的選項數量。
- 因 vue 為單向數據流，所以內部更新選取項目時，會透過 $emit 來傳遞新的值到外面供儲存。
- 整體來說，SelectInput 組件的資料都是由外部所供應的，所以在沿用性與維護性上是良好的。

### 4. 串接 API
- 在 src 底下新增 plugins 資料夾，並新增一支名為 axios.js 的檔案，該檔案負責設定 axios 的全局設定。
- 另外在 src 底下新增 request 資料夾，底下可以存放不同的請求檔案，以此來提高整體專案架構的維護簡便性。
- 需要打 API 的地方可以直接將請求檔案匯入到該組件/頁面中，並且做相對應的呼叫，而不是直接把 axios 相關的呼叫程式碼寫在頁面組件中(這樣比較不好管理)。





## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).
