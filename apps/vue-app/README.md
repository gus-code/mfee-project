# Vue App

## Instructions

To start the development server you can run the following commands:

### `npm run start:vue`

## Plugins

This project is using the followings things:

https://getbootstrap.com/

https://github.com/avil13/vue-sweetalert2

https://vuelidate-next.netlify.app/

## Activities

### CategoryForm
1. Define a new prop (**categorySelected**) of type **Object**

### CategoryList
2. Define a new data value (**categorySelected)** and set it in the **updateCategory()** method with the value that receives
3. Pass that value to **CategoryForm** as prop 

### store.js
4. Add a new attribute in the **store** for categories and create its method to set it (as posts value)
5. Create a new value (boolean) in the **store** to control when the nav bar will be visible with its method to change the value

### App.vue
6. Add a **v-show** validation in the nav with the store's new value to display it or hidden it
7. You should change that value to hidden it when the user is on PostDetailView (you can use the **life cycle hooks** for that)

### router.js
8. Create the routes for **LoginView**, **SignUpView** and **CategoryView**
9. Add the redirects to that views in the nav bar
