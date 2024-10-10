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

### LoginView
1. Add a **click event** for **Sign Up button** and create a **new method** for that action
2. Same for **Login button**, add a **click event** and create a **new method** for that action

### SignUpView
3. Add a **click event** for **Sign Up button** and create a **new method** for that action

Note: You will notice that the forms reloads the page so you can add submit prevent modifier in the forms to prevent that

### CategoryForm
7. Add a **click event** for **Close button** and create a **new method** called **reset()**
8. Add a **click event** for **Cancel button** and use the same above method (**reset()**)
9. Add a **click event** for **Save button** and create a **new method** for that action

### CategoryList
10. Add a **click event** for **Edit icon** and create a **new method** for that action, this method should receive the category object
11. Add a **click event** for **Trash icon** and create a **new method** for that action, this method should receive the id category

### NewComment
12. Add a **click event** for **Add button** and create a **new method** for that action

### CategoryList
13. Create a **alert-warning** like in **PostView.vue** to show it when there are not results for categories, you have to create a **computed property** for that and add **v-show** in the table and in the new **alert-warning**

Note: To test that the new methods are working property, you need to rederize different components in **App.vue**
