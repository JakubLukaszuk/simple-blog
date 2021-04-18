import { serviceCommon } from "./serviceCommon";
import { userService } from "./userService";

export interface IUpdatePost {
    id: number;
    text: string;
    title: string;
}
export interface IComment {
    postId: number
    text: string
    username: string
}
export interface IAddComent extends IComment { };

export interface IAddPost {
    text: string
    title: string
}

export interface IDeltedPost{
    deletedPostId: number
}

export interface IDeletePost {
    postId: number
}

export interface IPost extends IAddPost {
    id: number
    additionDate: Date
}

export interface IGetPostsInRange {
    startIndex: number
    endIndex: number
}

export interface IGetCommentsInRange {
    startIndex: number
    endIndex: number
    postId: number
}

const addPost = async (args: IAddPost) => {
    const { text, title } = args;

    const user = userService.getUserData();

    if (!user) {
        return;
    }

    const requestOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': user.token
        },
        body: JSON.stringify({ 'title': title, 'text': text })
    };

    return fetch('/posts', requestOptions)
        .then(serviceCommon.handleResponse)
        .then((data: Array<IPost>) => {
            return data;
        });
};

const deletePost = async (args: IDeletePost) => {
    const { postId } = args;
    const user = userService.getUserData();

    if (!user) {
        return;
    }

    const requestOptions = {
        method: "DELETE",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': user.token
        },
        body: JSON.stringify({ 'id': postId })
    };

    return fetch('/posts', requestOptions)
        .then(serviceCommon.handleResponse)
        .then((data: IDeltedPost) => {
            return data;
        });
};

const updatePost = async (postToModify: IUpdatePost) => {

    const user = userService.getUserData();

    if (!user) {
        return;
    }

    const requestOptions = {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': user.token
        },
        body: JSON.stringify(postToModify)
    };

    return fetch('/posts', requestOptions)
        .then(serviceCommon.handleResponse)
        .then((data: Array<IPost>) => {
            return data;
        });
};

const getPostsInRange = async (args: IGetPostsInRange) => {
    const { startIndex, endIndex } = args;
    const requestOptions = {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`/posts/${startIndex}/${endIndex}`, requestOptions)
        .then(serviceCommon.handleResponse)
        .then((data: Array<IPost>) => {
            return data;
        });

};

const addComment = async (comment: IAddComent) => {

    const user = userService.getUserData();

    if (!user) {
        return;
    }

    const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json', },
        body: JSON.stringify(comment)
    };

    return fetch('/posts/comment', requestOptions)
        .then(serviceCommon.handleResponse)
        .then((data: IComment) => {
            return data;
        });
};

const getCommentsInRange = async (args: IGetCommentsInRange) => {
    const {postId, startIndex, endIndex} = args;
    const requestOptions = {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'postId': postId })
    };

    return fetch(`/comments/${startIndex}/${endIndex}`, requestOptions)
        .then(serviceCommon.handleResponse)
        .then((data: Array<IComment>) => {
            return data;
        });

};



export const postService = { addPost, deletePost, updatePost, getPostsInRange, addComment, getCommentsInRange };
