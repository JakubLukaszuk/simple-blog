import { serviceCommon } from "./serviceCommon";
import { userService } from "./userService";

interface IModifyPost{
    id: number,
    text: string,
    username: string,
}

interface IAddComent{
    postId: number,
    text: string
    username: string,
}

const addPost = async (text: string) => {

    const user = userService.getUserData();

    if(!user)
    {
        return;
    }

    const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json',
                    'Authorization': user.token },
        body: JSON.stringify({'username': user.username, 'text': text})
    };

    return fetch('/posts', requestOptions)
        .then(serviceCommon.handleResponse)
        .then(data => {

            return data;
        });
}

const deletePost = async (postId: number) => {

    const user = userService.getUserData();

    if(!user)
    {
        return;
    }

    const requestOptions = {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json',
                    'Authorization': user.token },
        body: JSON.stringify({'id': postId})
    };

    return fetch('/posts', requestOptions)
        .then(serviceCommon.handleResponse)
        .then(data => {
            return data;
        });
}

const modifyPost = async (postToModify: IModifyPost) => {

    const user = userService.getUserData();

    if(!user)
    {
        return;
    }

    const requestOptions = {
        method: "PUT",
        headers: { 'Content-Type': 'application/json',
                    'Authorization': user.token },
        body: JSON.stringify(postToModify)
    };

    return fetch('/posts', requestOptions)
        .then(serviceCommon.handleResponse)
        .then(data => {
            return data;
        });
}

const getPostsInRange = async (startIndex: number, endIndex: number) => {
    const requestOptions = {
        method: "GET",
        headers: { 'Content-Type': 'application/json' }
    };

    return fetch(`/posts/${startIndex}/${endIndex}`, requestOptions)
        .then(serviceCommon.handleResponse)
        .then(data => {
            return data;
        });

}

const addComment = async (comment: IAddComent) => {

    const user = userService.getUserData();

    if(!user)
    {
        return;
    }

    const requestOptions = {
        method: "POST",
        headers: { 'Content-Type': 'application/json',},
        body: JSON.stringify(comment)
    };

    return fetch('/posts/comment', requestOptions)
        .then(serviceCommon.handleResponse)
        .then(data => {
            return data;
        });
}

const getCommentsInRange = async (startIndex: number, endIndex: number, postId: number) => {
    const requestOptions = {
        method: "GET",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({'postId': postId})
    };

    return fetch(`/comments/${startIndex}/${endIndex}`, requestOptions)
        .then(serviceCommon.handleResponse)
        .then(data => {
            return data;
        });

}



export const postService = {addPost, deletePost, modifyPost, getPostsInRange, addComment, getCommentsInRange};
