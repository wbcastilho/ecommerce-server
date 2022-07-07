const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

var currentUser;

var corsOptions = {
  orgim: '/',
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));
app.use(bodyParser.json());

app.listen(3100, () => {
  console.log('Server Started!');
});

app.route('/api/products').get((request, response) => {
  response.send(PRODUCTS);
});

app.route('/api/product').post((request, response) => {
  let product = request.body;

  const firstId = PRODUCTS ? Math.max.apply(null, PRODUCTS.map(productIterator => productIterator.id)) + 1 : 1;
  product.id = firstId;
  PRODUCTS.push(product);
  

  response.status(201).send(product);
});

app.route('/api/product/:id').put((request, response) => {
  const productId = +request.params['id'];
  const product = request.body;

  const index = PRODUCTS.findIndex(productIterator => productIterator.id === productId);
  PRODUCTS[index] = product;

  response.status(200).send(product);
});

app.route('/api/product/:id').get((request, response) => {
  const productId = +request.params['id'];

  response.status(200).send(PRODUCTS.find(productIterator => productIterator.id === productId));
});

app.route('/api/product/:id').delete((request, response)=> {
  const productId = +request.params['id'];
  PRODUCTS = PRODUCTS.filter(productIterator => productIterator.id !== productId);
  
  response.status(204).send({});
});

var PRODUCTS = [
  {
    id: 1,
    name: 'Drácula - Edição de Luxo',
    price: 34.90,
    quantity: 10,
    category: 'Terror',
    img: '',
    rating: 4,
    author: 'Bram Stoker',
    description: 'Bram Stoker é o criador genial de uma das mais famosas e horripilantes histórias de terror de todos os tempos. Drácula é uma história de vampiros e lobisomens, de criaturas que estando mortas permanecem vivas. Baseado no folclore da Transilvânia e num personagem real (o rei Vlad, o Empalador), redigiu um relato que tem assombrado gerações consecutivas de leitores, transformando-se num mito adaptado para o cinema, quadrinhos e TV, talvez o mais significativo destes últimos dois séculos.Na história, um jovem inglês é mantido em cativeiro, à espera de um destino terrível. Longe dele, sua noiva bela e jovem é atacada por uma doença misteriosa que parece extrair o sangue de suas veias. Por trás de tudo, a força sinistra que ameaça suas vidas: Conde Drácula, o vampiro vindo do fundo dos séculos.',
  },
  {
    id: 2,
    name: 'Sherlock Holmes',
    price: 34.90,
    quantity: 10,
    category: 'Aventura',
    img: '',
    rating: 3,
    author: 'Arthur Conan Doyle',
    description: 'Box contém as histórias: Um estudo em vermelho, O signo dos quatro e O cão dos Baskerville. Mais de 130 anos após sua criação, Sherlock Holmes continua sendo o detetive ficcional mais popular da história. A obra de Sir Arthur Conan Doyle contempla gêneros diversos, porém, seu maior reconhecimento vem dos contos e romances do detetive Sherlock Holmes e seu fiel parceiro e amigo, o Dr. Watson.A primeira aparição dos personagens se dá em Um Estudo em Vermelho, publicado em 1887, que introduziu ao público aqueles que se tornariam os mais conhecidos personagens de histórias de detetive da literatura universal. Doyle não esconde que a obra de Edgar Allan Poe teve grande influência em sua escrita. O personagem de Monsieur C. Auguste Dupin, dos Assassinatos na Rua Morgue, em muito ajudou a compor Holmes, no que diz respeito à técnica do “princípio da dedução”, utilizada para resolver os casos, mas é com Holmes e Watson que o método é imortalizado. Em O signo dos quatro, Holmes está ainda mais confiante em sua técnica e se envolve em uma aventura repleta de drama e suspense, com direito a uma cinematográfica perseguição pelo Tâmisa. Em O cão dos Baskerville, considerado best-seller e melhor romance policial já escrito, Holmes volta em um enredo de horror gótico em que as pistas são estranhas e os suspeitos não são poucos. Baseado em lendas locais sobre cães sobrenaturais e fantasmas que buscam vingança, é mais um caso brilhante para o imbatível detetive de Baker Street resolver.',
  },
];
