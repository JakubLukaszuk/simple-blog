// array in local storage for registered users
const users = JSON.parse(localStorage.getItem('users')) || [];
let posts = JSON.parse(localStorage.getItem('posts')) || [];
let comments = JSON.parse(localStorage.getItem('comments')) || {};

const TOKEN_VAL = 'fake-jwt-toke';

const VALIDATION_DATA_TYPES = {
    POST_ID: 'POST_ID',
    POST_DATA: 'POST_DATA'
}

export function configureFakeBackend() {
    localStorage.removeItem('users')
    localStorage.setItem('users', JSON.stringify([{
        id: 1,
        username: 'user',
        password: '123'
    }]));
    console.table(users);
    console.table(posts);

    const isUserAuth = (opts) => {
        return opts.headers && opts.headers.Authorization === TOKEN_VAL
    }

    const validate = (dataToValdate, dataType) => {
        const validaitonResult = {
            isValid: true,
            message: ''
        }
        const setValidationResult = (message) => {
            if (message) {
                validaitonResult.isValid = false;
                validaitonResult.message = message;
            }
        }
        const validatePost = (post) => {
            let validationMessage = ''
            if (!post.text) {
                validationMessage += '| Post text is empty';
            }

            if (!post.username) {
                validationMessage += '| UserName  is empty';
            }

            if (!users.some(user => user.username === post.username)) {
                validationMessage += '| Post text is empty';
            }
            return validationMessage;
        }

        const isPostIdValid = (id) => {
            if (!id) {
                return 'Id not passed';
            }

            if (posts.includes(post => post.id === id)) {
                return "Wrong id";
            }
            return '';
        }
        switch (dataType) {
            case VALIDATION_DATA_TYPES.POST_ID: {
                const validationMessage = isPostIdValid(dataToValdate);
                setValidationResult(validationMessage);
            }
            break;
        case VALIDATION_DATA_TYPES.POST_DATA: {
            const validationMessage = validatePost(dataToValdate);
            setValidationResult(validationMessage);
        }
        break;
        default:
            break
        }
        return validaitonResult;
    }

    window.fetch = function (url, opts) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                // authenticate
                if (url.endsWith('/users/authenticate') && opts.method === 'POST') {
                    let params = JSON.parse(opts.body);

                    let filteredUsers = users.filter(user => {
                        return user.username === params.username && user.password === params.password;
                    });

                    if (filteredUsers.length) {
                        let user = filteredUsers[0];
                        let response = {
                            id: user.id,
                            username: user.username,
                            token: TOKEN_VAL
                        };
                        resolve({
                            statusCode: 200,
                            data: response
                        });
                    } else {
                        reject('Username or password is incorrect');
                    }
                    return;
                }

                //add post
                if (url.endsWith('/posts') && opts.method === 'POST') {

                    if (!isUserAuth(opts)) {
                        reject('Unauthorized');
                        return;
                    }

                    let newPost = JSON.parse(opts.body);

                    const validationResult = validate(newPost, VALIDATION_DATA_TYPES.POST_DATA);
                    if (!validationResult.isValid) {
                        reject(validationResult.message);
                    }

                    newPost.id = posts.length ? Math.max(...posts.map(post => post.id)) + 1 : 1;
                    newPost.additionDate = new Date();
                    posts.unshift(newPost);
                    localStorage.setItem('posts', JSON.stringify(posts));

                    // respond 200 OK
                    resolve({
                        statusCode: 200,
                        data: posts
                    });

                    return;
                }
                //updatePost
                if (url.endsWith('/posts') && opts.method === 'PUT') {

                    if (!isUserAuth(opts)) {
                        reject('Unauthorized');
                        return;
                    }

                    let newPost = JSON.parse(opts.body);

                    const idValidationResult = validate(newPost.id, VALIDATION_DATA_TYPES.POST_ID)
                    if (!idValidationResult.isValid) {
                        reject(idValidationResult.message);
                        return
                    }

                    const validationDataResult = validate(newPost, VALIDATION_DATA_TYPES.POST_DATA);
                    if (!validationDataResult.isValid) {
                        reject(validationDataResult.message);
                        return
                    }

                    const foundIndex = posts.findIndex((post => post.id === newPost.id))

                    posts[foundIndex] = {
                        ...posts[foundIndex],
                        text: newPost.text
                    };

                    localStorage.setItem('posts', JSON.stringify(posts));
                    resolve({
                        statusCode: 200,
                        data: posts
                    });
                    return;
                }

                //deletePost
                if (url.endsWith('/posts') && opts.method === 'DELETE') {
                    if (!isUserAuth(opts)) {
                        reject('Unauthorized');
                        return;
                    }

                    let id = JSON.parse(opts.body).id;

                    const idValidationResult = validate(id, VALIDATION_DATA_TYPES.POST_ID)
                    if (!idValidationResult.isValid) {
                        reject(idValidationResult.message);
                        return
                    }

                    const filtredPosts = posts.filter((post) => post.id !== id);
                    filtredPosts.sort((a, b) => a.additionDate - b.additionDate);
                    posts = filtredPosts;

                    delete comments[id]

                    localStorage.setItem('posts', JSON.stringify(filtredPosts));
                    localStorage.setItem('comments', JSON.stringify(comments));

                    resolve({
                        statusCode: 200,
                        data: {deletedPostId: id}
                    });
                    return;
                }

                // get posts pagination
                if (url.match(/\/posts\/\d+\/\d+/) && opts.method === 'GET') {

                    let urlParts = url.split('/');
                    let startIndex = parseInt(urlParts[urlParts.length - 2]);
                    let endIndex = parseInt(urlParts[urlParts.length - 1]);

                    if (startIndex % 1 != 0 || endIndex % 1 != 0) {
                        reject('wrong indexes');
                    }

                    const postsInRange = posts.slice(startIndex, endIndex);

                    resolve({
                        ok: true,
                        data: postsInRange
                    });

                    return;
                }

                //add comment
                if (url.endsWith('/posts/comment') && opts.method === 'POST') {
                    const comment = JSON.parse(opts.body);

                    const idValidationResult = validate(comment.postId, VALIDATION_DATA_TYPES.POST_ID)
                    if (!idValidationResult.isValid) {
                        reject(idValidationResult.message);
                        return
                    }

                    if (!comment.text) {
                        reject('Comment text is empty');
                        return;
                    }

                    if (!comment.username) {
                        reject('Comment text is empty');
                        return;
                    }

                    if (comments[comment.postId]?.length) {
                        comments[comment.postId].push(comment);
                        localStorage.setItem('posts', JSON.stringify(comments));

                        resolve({
                            statusCode: 200,
                            data: comment
                        });
                        return;
                    }

                    comments[comment.postId] = [comment];

                    localStorage.setItem('comments', JSON.stringify(comments));

                    resolve({
                        statusCode: 200,
                        data: comment
                    });

                    return;
                }

            }, 500);

            // get posts pagination
            if (url.match(/\/comments\/\d+\/\d+/) && opts.method === 'GET') {
                const postId = JSON.parse(opts.body).postId;

                const idValidationResult = validate(postId, VALIDATION_DATA_TYPES.POST_ID)
                if (!idValidationResult.isValid) {
                    reject(idValidationResult.message);
                    return
                }

                let urlParts = url.split('/');
                let startIndex = parseInt(urlParts[urlParts.length - 2]);
                let endIndex = parseInt(urlParts[urlParts.length - 1]);

                if (startIndex % 1 != 0 || endIndex % 1 != 0) {
                    reject('wrong indexes');
                }

                const commentsInRange = comments[postId].slice(startIndex, endIndex);

                resolve({
                    statusCode: 200,
                    data: commentsInRange
                });

                return;
            }
        });
    }
}