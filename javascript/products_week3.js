import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
import pagination from './../components/pagination.js'
let productModal = null;
let delProductModal = null;

const app = createApp({
  components: {
    pagination
  },
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'pastelsy',
      products: [],
      isNew: false,
      tempProduct: {
        imagesUrl: [],
      },
      pagination: {}
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
    getProducts(page=1) {
      axios.get(`${this.url}/api/${this.apiPath}/admin/products?page=${page}`)
        .then((res) => {
          const { products, pagination } = res.data
          this.pagination = pagination
          this.products = products
          console.log(res)
        })
    },
    logout() {
      axios.post(`${this.url}/logout`)
        .then(() => {
          alert('logout success')
          window.location = 'index.html'
        })
    },
    openModal(isNew, item) {
      if (isNew==='new') {
        this.tempProduct = {
          imagesUrl: []
        }
        this.isNew = true
        productModal.show()
      } else if (isNew==='edit') {
        this.tempProduct = {...item}
        this.isNew = false
        productModal.show()
      } else if (isNew==='delete') {
        this.tempProduct = {...item}
        delProductModal.show()
      }
    },
    updateProduct() {
      let url = `${this.url}/api/${this.apiPath}/admin/product`
      let http = 'post'

      if(!this.isNew) {
        url = `${this.url}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`
        http = 'put'
      }

      axios[http](url, {data: this.tempProduct})
        .then((res) => {
          alert(res.data.message)
          productModal.hide()
          this.getProducts()
        })
        .catch((err)=> {
          alert(err.data.message)
        }) 
    },
    delProduct() {
      const url = `${this.url}/api/${this.apiPath}/admin/product/${this.tempProduct.id}`
      axios.delete(url)
        .then((res) => {
          alert(res.data.message)
          delProductModal.hide();
          this.getProducts();
        })
        .catch((err) =>{
          alert(err.data.message)
        })
    },
    createImages() {
      this.tempProduct.imagesUrl = [];
      this.tempProduct.imagesUrl.push('')
    },
  },
  mounted() {
    productModal = new bootstrap.Modal(document.getElementById('productModal'), {
      keyboard: false
    })
    delProductModal = new bootstrap.Modal(document.getElementById('delProductModal'), {
      keyboard: false
    })

    const token = document.cookie.replace(/(?:(?:^|.*;\s*)yuanToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    axios.defaults.headers.common.Authorization = token; 
  
    this.checkAdmin()
  },
})

app.mount('#app')