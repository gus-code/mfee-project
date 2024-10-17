import { reactive } from 'vue';
import { getPosts } from '../helpers/posts';
export const store = reactive({
  currentCategoryId: '1',
  setCurrentCategory(categorySelected) {
    this.currentCategoryId = categorySelected;
  },
  posts: [],
  async getPosts() {
    this.posts = await getPosts();
  },
  categories: [],
  getCategories() {
    this.categories = [
      {
        _id: '2',
        name: 'Category 1'
      },
      {
        _id: '3',
        name: 'Category 2'
      },
      {
        _id: '4',
        name: 'Category 3'
      }
    ];
  },
  showNavBar: true,
  setShowNavBar(show) {
    this.showNavBar = show;
  }
});
