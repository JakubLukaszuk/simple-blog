import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { postsInRange } from '../../slices/postSlice';
import { RootState, useAppDispatch } from '../../store';
import { BaseButton } from '../UI/BaseButton/BaseButton';
import PostItem from './PostItem/PostItem';


const PostList =()=> {
    const dispatch = useAppDispatch();
    const { posts, isLoading } = useSelector((state: RootState) => state.post);
  
    useEffect(() => {
        dispatch(postsInRange({"addPosts": false, "getArgs": {startIndex: 0, endIndex: 4}}))
    }, [])

    const loadMoreComments = ()=>{
        dispatch(postsInRange( {"addPosts": true,"getArgs":{startIndex: posts.length, endIndex: posts.length+4}}))
    }

    return (
        <section>
            {isLoading? "Loading...":
                <ul>
                    {posts.map(post=> (<PostItem post={post} key={post.id}/>))}
                </ul>
            }
            <div>
                <BaseButton onClick={loadMoreComments}>
                    LoadMore
                </BaseButton>
            </div>
        </section>
    )
}

export default PostList
