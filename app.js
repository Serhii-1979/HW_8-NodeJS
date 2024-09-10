import express from 'express';
import sequelize from './config/db.js';
import Book from './models/book.js';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, Bookstore!');
});

app.get('/books', async (req, res) => {
  try {
    const books = await Book.findAll();
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при получении книг' });
  }
});

app.post('/books', async (req, res) => {
  try {
    const { title, author, year } = req.body;
    const newBook = await Book.create({ title, author, year });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при создании книги' });
  }
});

app.put('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, year } = req.body;
    await Book.update({ title, author, year }, { where: { id } });
    res.json({ message: 'Книга успешно обновлена' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при обновлении книги' });
  }
});

app.delete('/books/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Book.destroy({ where: { id } });
    res.json({ message: 'Книга успешно удалена' });
  } catch (error) {
    res.status(500).json({ error: 'Ошибка при удалении книги' });
  }
});


const PORT = 3000;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log('Соединение с базой данных установлено успешно.');
  } catch (error) {
    console.error('Ошибка соединения с базой данных:', error);
  }
  console.log(`Сервер запущен на порту ${PORT}`);
});
