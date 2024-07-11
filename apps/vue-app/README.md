# Vue App

## Instructions

To start the development server you can run the following commands:

### `npm run start:vue`

## Plugins

This project is using the followings things:

https://getbootstrap.com/

https://github.com/avil13/vue-sweetalert2

https://vuelidate-next.netlify.app/

### Activities

1. Create **auth** and **categories** folders inside **modules** folder
2. Create **LoginView** and **SignUpView** component inside **auth/views**
3. Create **CategoryView** component inside **categories/views**
4. Create **CategoryForm** and **CategoryList** components inside **categories/components**

It should looks like this: 

![Screenshot 2024-07-09 at 12 52 42 p m](https://github.com/gus-code/mfee-project/assets/52582787/302d6ce6-8c8b-4c6c-90e7-fb176e30db00)

  5. For **LoginView** you can use this template:

```
<div class="d-flex justify-content-center align-items-center" style="height: 100vh">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title text-center">Login</h5>
        <form>
          <div class="form-group pb-3">
            <label>Username</label>
            <input type="text" class="form-control is-invalid" />
            <span class="form-text text-danger"> Error </span>
          </div>
          <div class="form-group pb-3">
            <label>Password</label>
            <input type="password" class="form-control" />
            <span class="form-text text-danger"> Error </span>
          </div>

          <span class="form-text text-danger"> Error </span>
          <div class="d-flex justify-content-end mt-1">
            <button class="btn btn-outline-primary me-1">Sign Up</button>
            <button class="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
```

6. For **SignUpView** you can use this one:

```
   <div class="d-flex justify-content-center align-items-center" style="height: 100vh">
    <div class="card">
      <div class="card-body">
        <h5 class="card-title text-center">Sign Up</h5>
        <form>
          <div class="form-group pb-3">
            <label>Username</label>
            <input type="text" class="form-control" />
            <span class="form-text text-danger"> Error </span>
          </div>
          <div class="form-group pb-3">
            <label>Password</label>
            <input type="password" class="form-control" />
            <span class="form-text text-danger"> Error </span>
          </div>
          <div class="form-group pb-3">
            <label>Confirm Password</label>
            <input type="password" class="form-control" />
            <span class="form-text text-danger"> Error </span>
          </div>
          <span class="form-text text-danger"> Error </span>
          <div class="d-flex justify-content-center mt-1">
            <button class="btn btn-primary">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  </div>
```
7. For **CategoryForm** you can use this:

```
  <div class="modal fade" id="createCategoryModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header text-center">
          <h5 class="modal-title">(Action) Category</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group pb-3">
              <label>Name</label>
              <input type="text" class="form-control" />
              <span class="form-text text-danger"> Error </span>
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" ref="btnCloseModal">Cancel</button>
          <button class="btn btn-primary">Save</button>
        </div>
      </div>
    </div>
  </div>

```

8. For **CategoryList** you can use this:

```
  <div class="container mt-5">
    <div class="d-flex justify-content-between">
      <h1 class="display-6">Categories</h1>
      <button class="btn btn-outline-success" data-bs-toggle="modal" data-bs-target="#createCategoryModal">Add Category</button>
    </div>

    <hr />
    <table class="table table-striped">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Category name</td>
          <td>
            <i class="fa-solid fa-pen me-3" data-bs-toggle="modal" data-bs-target="#createCategoryModal"></i>
            <i class="fa-solid fa-trash"></i>
          </td>
        </tr>
      </tbody>
    </table>
```

9. Render **CategoryForm** at the end of **CategoryList** in such a way that clicking on the Add Category button triggered the modal.
10. Render **CategoryList** in **CategoryView**

Note: You can test that your new components are working redering them on **App.vue**
