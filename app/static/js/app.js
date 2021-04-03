

const Home = {
    name:'Home',
    template: `
    <div class="home">
 <img src="/static/images/logo.png" alt="VueJS Logo">
 <h1>{{ welcome }}</h1>
 </div>`,
    data(){
        return {
            welcome:'Hello'
        }
    }
}

const NewsList = {
  name:'news-list',
  template: `
    <div class=" justify-content-center"  >
    <div class="form-inline d-flex justify-content-center">
        <div class="form-group mx-sm-3 mb-2">
        <label class="sr-only" for="search">Search</label>
        <input type="search" name="search" v-model="searchTerm"
            id="search" class="form-control mb-2 mr-sm-2" placeholder="Enter search term here" />
            <div class="button-grid">
            <button class="btn btn-primary mb-2" @click="searchNews" >Search</button>
        <button class=" btn btn-primary mb-2" @click="topStories" >Top Stories</button>
            </div>
       
        </div>
    </div>
     <h2 class=" d-flex justify-content-center">News</h2>
     <div class="card-grid ">
             <div class="card " style="width: 18rem;"  v-for="article in articles">
            <img class="card-img-top" :src="article.urlToImage" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">{{ article.title }}</h5>
                    <p class="card-text">{{article.description}}</p>
                </div>
        </div>
     </div>

    </div>
  `,
    data: function() {
      return {
         articles:[],
          searchTerm: ''
      }
  },
  created() {

      this.topStories();


  },
    methods : {
        searchNews() {
         let self = this;
         if(self.searchTerm == ''){
             self.topStories()
         }else {

             fetch('https://newsapi.org/v2/everything?q='+
            self.searchTerm + '&language=en', {
             headers: {
             'Authorization': 'Bearer 405e1cdb82fa4bf38a6362f88e6a4550'
             }
         })
             .then(function(response) {
             return response.json();
         })
             .then(function(data) {
         console.log(data);
         self.articles = data.articles;
         });
         }

     },
        topStories() {
           //vue instance access
    let self = this;

    fetch('https://newsapi.org/v2/top-headlines?country=us' ,
        {
          headers: {
            'Authorization':'Bearer 405e1cdb82fa4bf38a6362f88e6a4550'
          }
        }).then(function (response){
          return response.json();
        }).then(function (data) {
          console.log(data)
          self.articles = data.articles

        }
        )
        }
    },
}


/* Add your Application JavaScript */
const app = Vue.createApp({
  data() {
    return {
      welcome: 'Hello World! Welcome to VueJS'
    }
  },
    components : {
      'home': Home,
        'news-list':NewsList
    }
});

app.component('app-header', {
  name: 'AppHeader',
  template: `
      <header>
          <nav class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
            <a class="navbar-brand" href="#">VueJS App</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
              <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                  <router-link to="/" class="nav-link"> Home</router-link>
                </li>
                <li class="nav-item">
                  <router-link to="/news" class="nav-link"> News</router-link>
                </li>
              </ul>
            </div>
          </nav>
      </header>    
  `,
  data: function() {
    return {};
  }
});

app.component('app-footer', {
  name: 'AppFooter',
  template: `
      <footer>
          <div class="container">
              <p>Copyright &copy {{ year }} Flask Inc.</p>
          </div>
      </footer>
  `,
  data: function() {
      return {
          year: (new Date).getFullYear()
      }
  }
})




const router = VueRouter.createRouter( {
    history: VueRouter.createWebHistory(),
    routes:[
        {path:'/',component:Home},
        {path:'/news', component: NewsList}
    ]
})



app.use(router)
app.mount('#app');