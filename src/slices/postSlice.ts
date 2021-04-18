import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { IAddPost, IDeletePost, IDeltedPost, IUpdatePost, IPost, postService, IGetPostsInRange, IGetCommentsInRange, IComment, IAddComent } from '../services/postService';
import { IError } from './common';

export interface IEnchencedPost extends IPost {
    error: IError | undefined;
    isLoading: boolean;
}

interface IPostsInRange
{
    addPosts: boolean
    getArgs: IGetPostsInRange
}

interface IPostsState {
    posts: Array<IEnchencedPost>;
    isLoading: boolean
    error: IError | undefined
    areCommetsLoading: boolean
    commentsError: IError | undefined
    addCommentsError: IError | undefined
    comments:Array<Array<IComment>>
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

export const postsInRange = createAsyncThunk<Array<IEnchencedPost>, IPostsInRange, { rejectValue: IError }>
    ('post/get', async (args) => {
        try {
            const response = await postService.getPostsInRange(args.getArgs);
            const enchancedPosts = handlePostsArrayResponse(response);
            return enchancedPosts;
        }
        catch (err) {
            return err;
        }
    });

export const addPost = createAsyncThunk<Array<IEnchencedPost>, IAddPost, { rejectValue: IError }>
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
export const deletePost = createAsyncThunk<IDeltedPost, IDeletePost, { rejectValue: IError }>
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

    export const updatePost = createAsyncThunk<Array<IEnchencedPost>, IUpdatePost, { rejectValue: IError }>
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

    export const addComment = createAsyncThunk<Array<IComment>, IAddComent, { rejectValue: IError }>
    ('post/comments/add', async (commentToAdd) => {
        try {
            const commets = await postService.addComment(commentToAdd);
            return commets;
        }
        catch (err) {
            return err;
        }
    });

    export const getCommentsInRange = createAsyncThunk<Array<IComment>, IGetCommentsInRange, { rejectValue: IError }>
    ('post/comments/get', async (commentToAdd) => {
        try {
            const commets = await postService.getCommentsInRange(commentToAdd);
            return commets;
        }
        catch (err) {
            return err;
        }
    });

const initialState: IPostsState = {
    posts: [],
    isLoading: false,
    error: undefined,
    areCommetsLoading: false,
    commentsError: undefined,
    addCommentsError: undefined,
    comments: []
};

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        deleteCommentsFromState(state, action: PayloadAction<number>) {
            state.comments = state.comments.filter((comment,index) => index !== action.payload)
          },
    },
    extraReducers: (builder) => {
        builder.addCase(postsInRange.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(postsInRange.fulfilled, (state, action) => {
            state.isLoading = false;
            if(action.meta.arg.addPosts)
            {
                state.posts.push(...action.payload)
                return;
            }
            state.posts = action.payload;
        });
        builder.addCase(postsInRange.rejected, (state, {payload}) => {
            state.isLoading = false;
            state.error = payload
        });


        builder.addCase(addPost.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addPost.fulfilled, (state, { payload }) => {
            state.isLoading = false;
            state.posts.push(...payload);
        });
        builder.addCase(addPost.rejected, (state, {payload}) => {
            state.isLoading = false;
            //action.error
            state.error = payload;
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
                    post.error = action.payload
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
            state.posts = state.posts.map(post => {
                if(post.id === id)
                {
                    post.isLoading = false;
                    post.error = action.payload;
                }
                return post;
            })
        });

        //commets
        builder.addCase(getCommentsInRange.pending, (state, action) => {
            state.areCommetsLoading= true;
            state.commentsError=undefined;
        });
        builder.addCase(getCommentsInRange.fulfilled, (state, action) => {
            state.commentsError=undefined;
            state.areCommetsLoading= false;
            state.comments.splice(action.meta.arg.postId, state.comments[action.meta.arg.postId]?.length-1 ? state.comments[action.meta.arg.postId]?.length-1 : 0 , action.payload)
        });
        builder.addCase(getCommentsInRange.rejected, (state, action) => {
            state.commentsError = action.payload;
            state.areCommetsLoading= false;
        });


        builder.addCase(addComment.pending, (state, action) => {
            state.areCommetsLoading= true;
            state.addCommentsError=undefined;
        });
        builder.addCase(addComment.fulfilled, (state, action) => {
            state.commentsError=undefined;
            state.areCommetsLoading= false;
            state.comments.splice(action.meta.arg.postId, 0, action.payload)
        });
        builder.addCase(addComment.rejected, (state, action) => {
            state.addCommentsError = action.payload;
            state.areCommetsLoading= false;
        });

    }
});
export const { deleteCommentsFromState } = postSlice.actions;

export default postSlice.reducer;
