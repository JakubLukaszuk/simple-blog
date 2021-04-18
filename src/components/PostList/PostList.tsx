import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { postsInRange } from '../../slices/postSlice';
import { RootState, useAppDispatch } from '../../store';
import { BaseButton } from '../UI/BaseButton/BaseButton';
import PostItem from './PostItem/PostItem';
import './PostList.css'

const PostList =()=> {
    const dispatch = useAppDispatch();
    const { posts, isLoading } = useSelector((state: RootState) => state.post);
  
    useEffect(() => {
        dispatch(postsInRange({"addPosts": false, "getArgs": {startIndex: 0, endIndex: 4}}))
    }, [])

    const loadMoreComments = ()=>{
        if(posts.length){
            dispatch(postsInRange( {"addPosts": true,"getArgs":{startIndex: posts.length, endIndex: posts.length+4}}))
        }
    }

    return (
        <section className="PostList">
            {isLoading? "Loading...":
                <ul>
                    {posts.map(post=> (<PostItem post={post} key={post.id}/>))}
                </ul>
            }
            <div className="PostList__Load">
                <BaseButton onClick={loadMoreComments}>
                    LoadMore
                </BaseButton>
            </div>
        </section>
    )
}

export default PostList
