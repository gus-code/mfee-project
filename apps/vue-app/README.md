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

### store.js
1. In the method **getCategories** call the function to get the categories from de API and save it
2. Changes in the components that use the categories to obtain them from the store

### helpers
3. Create a new file to have the axios calls for **/auth/login** and **/auth/register**
4. In **categories.js** add the axios calls for **create**, **deletes** and **update** category

### LoginView.vue
5. Add the validations for this form
6. When the form is valid call the **/auth/login** that you already have created
7. If the call was successfully redirect to **home** if not show an error in the form

Note: You can save the token in the LS and inject it in the **capstoneApi.js**

### SignUpView.vue
8. Add the validations for this form
9. When the form is valid call the **/auth/register** that you already have created
10. If the call was successfully redirect to **login** if not print a console.error
   
### CategoryList
11. Call **getCategories** from the store and show them in the table
12. Call the function **deleteCategory** that you have already create to delete it

## CategoryForm
13.  Add the validations for this form
14.  When the form is valid call the endpoint to save a category that you already have created
15.  If the call was successfully call **getCategories** from the store if not print a console.error
