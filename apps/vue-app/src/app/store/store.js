import { reactive } from 'vue';

export const store = reactive({
  currentCategoryId: '1',
  setCurrentCategory(categorySelected) {
    this.currentCategoryId = categorySelected;
  },
  posts: [],
  getPosts() {
    this.posts = [
      {
        _id: '6661055a82f08e5ed86ae7f5',
        title: 'Torre Eiffel UPDATED',
        image: 'https://wallpaper.forfun.com/fetch/1f/1fb47ac98e070792db4d1d7949716b4c.jpeg',
        description:
          'La Torre Eiffel es un monumento excepcional y las vistas desde sus plataformas son alucinantes. Tiene tres niveles, el primero a 57 metros, el segundo a 115 metros y el tercero a unos vertiginosos 276 metros.',
        category: {
          _id: '6667d88982f08e5ed86ae88a',
          name: 'Sport',
          createdAt: '2024-06-11T04:54:33.269Z',
          updatedAt: '2024-06-11T04:54:40.365Z',
          __v: 0
        },
        comments: ['6682419a82f08e5ed86af27a', '668242a582f08e5ed86af28e', '66942d6a4891864731f93985'],
        createdAt: '2024-06-06T00:39:54.397Z',
        updatedAt: '2024-07-14T19:56:26.702Z',
        __v: 3
      },
      {
        _id: '668238a582f08e5ed86af1eb',
        title: 'NEW POST',
        image: 'https://images.pexels.com/photos/842711/pexels-photo-842711.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        description: 'DESC',
        category: {
          _id: '667ee7e882f08e5ed86af174',
          name: 'Food updated 2',
          createdAt: '2024-06-28T16:42:16.635Z',
          updatedAt: '2024-07-10T22:36:26.649Z',
          __v: 0
        },
        comments: [],
        createdAt: '2024-07-01T05:03:33.756Z',
        updatedAt: '2024-07-01T05:16:59.051Z',
        __v: 0
      }
    ];
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
