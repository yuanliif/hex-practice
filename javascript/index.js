import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';

const app = createApp({
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io/v2',
      user: {
        username: '',
        password: '',
      }
    }
  },
  methods: {
    login() {
      axios.post(`${this.url}/admin/signin`, this.user)
        .then((res) => {
          alert('login success')
          const { token, expired } = res.data
          document.cookie = `yuanToken=${token}; expires=${new Date(expired)}`;
          window.location = 'products_week3.html'
        })
        .catch((err) => {
          console.dir(err)
          alert('access failed')
        })
    }
  },
})

app.mount('#app')