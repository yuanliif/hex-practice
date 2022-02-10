import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

const app = createApp({
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'pastelsy',
      products: [],
      tempProduct: {},
    }
  },
  methods: {
    checkAdmin() {
      axios.post(`${this.url}/api/user/check`)
        .then(() => {
          this.getProducts()
        })
        .catch((err) => {
          alert('error access')
          console.dir(err)
        })
    },
    getProducts() {
      axios.get(`${this.url}/api/${this.apiPath}/admin/products`)
        .then((res) => {
          this.products = res.data.products
        })
    },
    logout() {
      axios.post(`${this.url}/logout`)
        .then(() => {
          alert('logout success')
          window.location = 'index.html'
        })
    },
    openProduct(item) {
      this.tempProduct = item
    }
  },
  mounted() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)yuanToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token; 
    
    this.checkAdmin()
  },
})

app.mount('#app')