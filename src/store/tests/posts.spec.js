import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getPosts, getPost, addPost, deletePost, likePost, updatePost } from '../posts';
import createStore from '../store'


describe('PostsSlice', () => {
    let fakeAxios;
    let store;

    beforeEach(()=>{
        fakeAxios = new MockAdapter(axios);
        store = createStore();
    })

    //helper functions
    const postsSlice = () => store.getState().posts;

    describe('addPost', () => {   
        it("should add the post to the store if it's saved to the server", async()=> {
            const post = {title: 'a', description: 'b'};
            const savedPost = {...post, id: 1};
            fakeAxios.onPost('/posts').reply(200, savedPost)
    
            await store.dispatch(addPost(post));
            
            expect(postsSlice().list).toContainEqual(savedPost)
        })
     
        it("should not add the post to the store if it's not saved to the server", async()=> {
            const post = {title: 'a', description: 'b'};
            fakeAxios.onPost('/posts').reply(500)
    
            await store.dispatch(addPost(post));
            
            expect(postsSlice().list).toHaveLength(0)
        })
    })

    describe('loading Posts', () => {

        describe('loading indicator', () => {
            it('should be true when loading posts', () => {
                fakeAxios.onGet('/posts').reply(()=> {
                    expect(postsSlice().loading).toBe(true)
                    return [200, [{id:1}]]
                })

                store.dispatch(getPosts())
            })
            
            it('should be false after the posts are fetched', async () => {
                fakeAxios.onGet('/posts').reply(200, [{id:1}])

                await store.dispatch(getPosts())

                expect(postsSlice().loading).toBe(false)
            })
            
            it('should be false if the server returns an error', async () => {
                fakeAxios.onGet('/posts').reply(500)

                await store.dispatch(getPosts())

                expect(postsSlice().loading).toBe(false)
            })
        })

        it("should put the posts in the store if it's fetched from the server", async()=> {
            const post = {title: 'a', description: 'b'};
            const page = 1
            fakeAxios.onGet(`/posts?page=${page}`).reply(200, {data: [{...post}], currentPage: page, numberOfPages: 1})
    
            await store.dispatch(getPosts(page));
            
            expect(postsSlice().list).toContainEqual(post)
        })
        
        it("should not put the posts in the store if it's not fetched from the server", async()=> {
            const page = 1
            fakeAxios.onGet(`/posts?page=${page}`).reply(500)
    
            await store.dispatch(getPosts(page));
            
            expect(postsSlice().list).toHaveLength(0)
        })
    })

    // describe('getPostsBySearch', () => {
    //     it("should add a searched post to the store if it's ")
    // })

    describe('getPost', () => {
        it('should add a post to the store if its already loaded from the server', async() =>{
            const post = {title: 'a', description: 'b'};
            const savedPost = {...post, id: 1};
            fakeAxios.onGet('/posts/1').reply(200, savedPost)
    
            await store.dispatch(getPost(1));

            expect(postsSlice().post).toEqual(savedPost);
        })
        
        it("shouldn't add a post to the store if its not loaded from the server", async() =>{
            fakeAxios.onGet(`/posts/1`).reply(500)
    
            await store.dispatch(getPost(1));

            expect(postsSlice().post).toBeNull();
        })
    })

    describe('UpdatePost', () => {
        it("should update the post in the store if it's saved to the server", async () => {
            const post = {description: 'a'}
            const updatedPost = {_id: 1, description: 'b'} 
            fakeAxios.onPost('/posts').reply(200, { _id: 1, ...post })
            fakeAxios.onPatch('/posts/1').reply(200, updatedPost)
    
            await store.dispatch(addPost(post));
            await store.dispatch(updatePost(updatedPost));
            
            // expect(postsSlice().list).toContainEqual(updatedPost);
            expect(postsSlice().list[0]).toEqual(updatedPost);
        })
        
        it("should not update the post in the store if it's not saved to the server", async () => {
            const post = {description: 'a'}
            const updatedPost = {_id: 1, description: 'b'} 
            fakeAxios.onPost('/posts').reply(200, { _id: 1, ...post })
            fakeAxios.onPatch('/posts/1').reply(500)
    
            await store.dispatch(addPost(post));
            await store.dispatch(updatePost(updatedPost));
            
            expect(postsSlice().list[0].description).toEqual('a');
        })
    })
    
    describe('likePost', () => {

        it("should increment the like counter of a post in the store if it's an increment in the server", async()=> {
            const post = {title: 'a', description: 'b'};
            const id = 1
            const savedPost = {...post, id}
            fakeAxios.onPost('/posts').reply(200, savedPost)
            fakeAxios.onPatch(`/posts/${id}/likePost`).reply(200, {...savedPost, likeCounter: 1})
    
            await store.dispatch(addPost(post));
            await store.dispatch(likePost(1));
    
            expect(postsSlice().list).toContainEqual({...savedPost, likeCounter: 1})
        })
    
        it("should not increment the like counter of a post in the store if it's not increment in the server", async()=> {
            const post = {title: 'a', description: 'b'};
            const id = 1
            const savedPost = {...post, id}
            fakeAxios.onPost('/posts').reply(200, savedPost)
            fakeAxios.onPatch(`/posts/${id}/likePost`).reply(500)
    
            await store.dispatch(addPost(post));
            await store.dispatch(likePost(1));
    
            expect(postsSlice().list[0]).toEqual(expect.not.objectContaining({likeCounter: 1}))
        })
    })

    describe('deletePost', () => {

        it("should delete the post from the store if it's deleted from the server", async()=> {
            const post = {title: 'a', description: 'b'};
            const id = 1
            const savedPost = {...post, id}
            fakeAxios.onPost('/posts').reply(200, savedPost)
            fakeAxios.onDelete(`/posts/${id}`).reply(200, savedPost)
    
            await store.dispatch(addPost(post));
            await store.dispatch(deletePost(1));
    
            expect(postsSlice().list).toHaveLength(0)
        })
    
        it("should not delete the post from the store if it's not deleted from the server", async()=> {
            const post = {title: 'a', description: 'b'};
            const id = 1
            const savedPost = {...post, id}
            fakeAxios.onPost('/posts').reply(200, savedPost)
            fakeAxios.onDelete(`/posts/${id}`).reply(500)
    
            await store.dispatch(addPost(post));
            await store.dispatch(deletePost(1));
    
            expect(postsSlice().list).toContainEqual(savedPost)
        })
    })
}) 