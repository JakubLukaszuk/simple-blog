import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { IAddPost, IDeletePost, IDeltedPost, IUpdatePost, IPost, postService, IGetPostsInRange } from '../services/postService';

export interface IEnchencedPost extends IPost {
    error: string | undefined;
    isLoading: boolean;
}

interface IPostsState {
    posts: Array<IEnchencedPost>;
    isLoading: boolean;
    error: any;
}

const echnacePost = (posts: Array<IPost>) => {
    const echnacedPosts
        = posts.map(post => {
            const enchancedPost: IEnchencedPost = {
                ...post,
                isLoading: false,
                error: undefined
            };
            return enchancedPost;
        });

    return echnacedPosts;
};

const handlePostsArrayResponse = (response: IPost[] | undefined) =>{
    if (!response?.length) {
        return new Array(0);
    }
    const echnacedPosts = echnacePost(response);
    return echnacedPosts;
}

export const getPostsInRange = createAsyncThunk<Array<IEnchencedPost>, IGetPostsInRange, { rejectValue: string }>
    ('post/get', async (userName) => {
        try {
            const response = await postService.getPostsInRange(userName);
            const enchancedPosts = handlePostsArrayResponse(response);
            return enchancedPosts;
        }
        catch (err) {
            return err;
        }
    });

export const addPost = createAsyncThunk<Array<IEnchencedPost>, IAddPost, { rejectValue: string }>
    ('post/add', async (postToAdd) => {
        try {
            const response = await postService.addPost(postToAdd);
            const enchancedPosts = handlePostsArrayResponse(response);
            return enchancedPosts;
        }
        catch (err) {
            throw err;
        }
    });
export const deletePost = createAsyncThunk<IDeltedPost, IDeletePost, { rejectValue: string }>
    ('post/delete', async (postToDelete) => {
        try {
            const response = await postService.deletePost(postToDelete);
            if (!response?.deletedPostId) {
                throw Error();
            }
            return response;
        }
        catch (err) {
            throw err;
        }
    });

    export const updatePost = createAsyncThunk<Array<IEnchencedPost>, IUpdatePost, { rejectValue: string }>
    ('post/update', async (postToAdd) => {
        try {
            const response = await postService.updatePost(postToAdd);
            const enchancedPosts = handlePostsArrayResponse(response);
            return enchancedPosts;
        }
        catch (err) {
            throw err;
        }
    });

const initialState: IPostsState = {
    posts: [],
    isLoading: false,
    error: undefined
};

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder.addCase(getPostsInRange.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getPostsInRange.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.posts = payload;
        });
        builder.addCase(getPostsInRange.rejected, (state, action) => {
            state.isLoading = false;
            console.log(action.error);
            state.error = 'error'
        });


        builder.addCase(addPost.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addPost.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.posts.push(...payload);
        });
        builder.addCase(addPost.rejected, (state, action) => {
            state.isLoading = false;
            //action.error
            state.error = 'error';
        });


        builder.addCase(deletePost.pending, (state, action) => {
            const id = action.meta.arg.postId
            state.posts = state.posts.map(postItem => {
                if(postItem.id === id)
                {
                    postItem.isLoading = true;
                }
                return postItem;
            })
        });
        builder.addCase(deletePost.fulfilled, (state, { payload }) => {
            state.posts = state.posts.filter( post => post.id !== payload.deletedPostId);
        });
        builder.addCase(deletePost.rejected, (state, action) => {
            const id = action.meta.arg.postId
            state.posts = state.posts.map(post => {
                if(post.id === id)
                {
                    post.isLoading = false;
                    post.error = 'error'
                }
                return post;
            })
        });


        builder.addCase(updatePost.pending, (state, action) => {
            const id = action.meta.arg.id
            state.posts = state.posts.map(post => {
                if(post.id === id)
                {
                    post.isLoading = true;
                }
                return post;
            })
        });
        builder.addCase(updatePost.fulfilled, (state, action) => {
            state.posts = state.posts.map((post, index) => {
                if(post.id === action.payload[0].id)
                {
                    post = action.payload[0];
                }
                return post;
            })
        });
        builder.addCase(updatePost.rejected, (state, action) => {
            const id = action.meta.arg.id
            state.posts = state.posts.map(posst => {
                if(posst.id === id)
                {
                    posst.isLoading = false;
                    posst.error = 'error';
                }
                return posst;
            })
        });

    }
});

export default postSlice.reducer;
