import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getUsers } from '../users';
import createStore from '../store'

describe('UsersSlice', () => {
    let fakeAxios;
    let store;

    beforeEach(()=>{
        fakeAxios = new MockAdapter(axios);
        store = createStore();
    })

    //helper functions
    const usersSlice = () => store.getState().users;

    describe('getUsers', ()=>{
        describe("if the users exists in the cache", ()=>{
            it("they should not be fetched from the server again", async()=>{
                fakeAxios.onGet('/users').reply(200, [{id: 1}])

                await store.dispatch(getUsers())
                await store.dispatch(getUsers())

                expect(fakeAxios.history.get.length).toBe(1)

            })
        });
        
        describe("if the users don't exists in the cache", ()=>{
            it("they should be fetched from the server and put in the store", async()=>{
                fakeAxios.onGet('/users').reply(200, [{id: 1}])

                await store.dispatch(getUsers())

                expect(usersSlice().list).toHaveLength(1)

            })

            describe("loading indicator", ()=>{
                it("should be true while fetching the users", ()=>{
                    fakeAxios.onGet('/users').reply(()=>{
                        expect(usersSlice().loading).toBe(true)
                        return [200, [{id: 1}]]
                    })

                    store.dispatch(getUsers())
                })

                it("should be false after users are fetched", async()=>{
                    fakeAxios.onGet('/users').reply(200, [{id: 1}])

                    await store.dispatch(getUsers())

                    expect(usersSlice().loading).toBe(false)
                })

                it("should be false if the server fails", async()=>{
                    fakeAxios.onGet('/users').reply(500)

                    await store.dispatch(getUsers())

                    expect(usersSlice().loading).toBe(false)
                })
            })
        });
    })

})
