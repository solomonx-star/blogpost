
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axios);

mock.onPost('/auth/login').reply(200, {
    message: 'Login successful',
});

mock.onPost('/auth/signup').reply(200, {
    message: 'Signup successful',
});

mock.onGet('/blog-post').reply(200, [
    {
        id: 1,
        title: 'My First Blog Post',
        content: 'This is the content of my first blog post.',
        createdAt: '2025-09-21',
    },
    {
        id: 2,
        title: 'My Second Blog Post',
        content: 'This is the content of my second blog post.',
        createdAt: '2025-09-22',
    },
]);

export default mock;
