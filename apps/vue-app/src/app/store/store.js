import { reactive } from 'vue';
import { getPosts } from '../helpers/posts';
import { getCategories } from '../helpers/categories';

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
  async getCategories() {
    this.categories = await getCategories()
  },
  showNavBar: true,
  setShowNavBar(show) {
    this.showNavBar = show;
  }
});
