import Banner from '../../Banner';
import Comments from '../../Comments';
import {
  Container,
  BannerContainer,
  CommentsContainer,
  DescriptionContainer,
} from "./PostPage.styles";

const post = {
  image:
    'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f1/Eiffel_tower_%28369%29.JPG/800px-Eiffel_tower_%28369%29.JPG?20160209051035',
  title: 'Eiifel Tower',
  postID: '1',
  comments: [
    {
      _id: '1',
      author: 'Miguel',
      content: 'Al llegar y ver de cerca este impresionante monumento de metal uno se queda con la boca abierta. Que decir tiene que hay que subir hasta la cima si uno se atreve. Desde el segundo piso las vistas son espectaculares.',
      createdAt: '',
      updatedAt: '',
      __v: 0
    },{
      _id: '2',
      author: 'mariaferndanez1995',
      content: 'La Torre Eiffel en París es simplemente impresionante. Su majestuosidad y belleza son incomparables. Recomiendo encarecidamente visitarla, ¡es una experiencia que no olvidarás!',
      createdAt: '',
      updatedAt: '',
      __v: 0
    },{
      _id: '3',
      author: 'Poliwis 06',
      content: 'Uno de los lugares más emblemáticos del mundo es la Torre Eiffel. Algunas personas creen que está sobrevalorada, pero en mi experiencia, no lo está. Pasamos toda una tarde esperando para subir a la torre y no nos decepcionó en absoluto.',
      createdAt: '',
      updatedAt: '',
      __v: 0
    },
  ],
  description:
    'Venga a descubrir la Torre Eiffel en un viaje ascendente único en el mundo y déjese llevar por las emociones que vivirá en su ascenso desde el atrio hasta la cima.'
};

function PostPage() {
  // const postID = "664128a212f505651c18d676"
  // ACT 9 - Use postID variable to fetch the post data
  return (
    <Container container>
      Post page
      <BannerContainer item>
        {/*✅ ACT 1 - Render Banner component */} <Banner postImage={ post.image } postTitle={ post.title }></Banner>
        {/*✅ ACT 3 - Send postImage and postTitle as props to Banner component */}
      </BannerContainer>
      <DescriptionContainer item>
        <p>{post.description}</p> {/*✅ ACT 1 - Render post description */}
      </DescriptionContainer>
      <CommentsContainer item>
        <Comments comments={ post.comments }></Comments> {/*✅ ACT 1 - Render Comments component */}
        {/*✅ ACT 3 - Send comments as prop to Comments component */}
      </CommentsContainer>
    </Container>
  );
}

export default PostPage;
