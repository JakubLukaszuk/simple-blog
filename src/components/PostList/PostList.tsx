import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { getPostsInRange } from '../../slices/postSlice';
import { RootState, useAppDispatch } from '../../store';
import PostItem from './PostItem/PostItem';


const PostList =()=> {
    const dispatch = useAppDispatch();
    const [postIndexes, setPostIndexes] = useState({startIndex: 0, endIndex: 4});
    const { posts, isLoading } = useSelector((state: RootState) => state.post);

    useEffect(() => {
        dispatch(getPostsInRange({startIndex: postIndexes.startIndex, endIndex: postIndexes.endIndex}))
    }, [])

    return (
        <section>
            {isLoading? "Loading...":
                <ul>
                    {posts.map(post=> (<PostItem post={post} key={post.id}/>))}
                </ul>
            }
            <div>
                <button>
                    LoadMore
                </button>
            </div>
        </section>
    )
}

export default PostList
