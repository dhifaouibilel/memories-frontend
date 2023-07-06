// auth.test.js
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import createStore from '../store'

import { signin, signup, signupWithGoogle, logout } from '../auth.js';

// Mock localStorage
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
};

global.localStorage = localStorageMock;

describe('AuthSlice', () => {
  let fakeAxios;
  let store;

  beforeEach(() => {
    fakeAxios = new MockAdapter(axios);
    store = createStore();
    localStorageMock.setItem.mockClear();
    localStorageMock.removeItem.mockClear();
  });

  describe('signin', () => {
    describe('localStorage', () => {
      it('should contain the token if the user seccussfully logged in', async () => {
        const result = {token: 'abc123', result: {id: 1}};
        
        fakeAxios.onPost('/users/signin').reply(200, result)

        await store.dispatch(signin({ }));

        expect(localStorageMock.setItem).toHaveBeenCalledWith('profile', JSON.stringify(result));
      });
      
      it('should not contain the token if the user not seccussfully logged in', async () => {        
        fakeAxios.onPost('/users/signin').reply(500)

        await store.dispatch(signin({ }));

        expect(localStorageMock.setItem).not.toHaveBeenCalledWith('profile');
      });

    })

    describe('token attribute in the store', () => {
      it('should be set to that returned from the server if the user logged in successfully', async () => {
        const result = {token: 'abc123', result: {id: 1}};
        
        fakeAxios.onPost('/users/signin').reply(200, result)
  
        await store.dispatch(signin({ }));
  
        expect(store.getState().auth.token).toEqual(result.token);
      });
      
      it('should be empty if the user not successfully logged in', async () => {        
        fakeAxios.onPost('/users/signin').reply(500)
  
        await store.dispatch(signin({ }));
  
        expect(store.getState().auth.token).toBe('');
      });

    })
      
    describe('profile object in the store', ()=> {
      it('should be set to that returned from the server if the user seccussfully logged in', async () => {
        const result = {token: 'abc123', result: {id: 1}};
        
        fakeAxios.onPost('/users/signin').reply(200, result)

        await store.dispatch(signin({ }));

        expect(store.getState().auth.profile).toEqual(result.result);
      });
      
      it('should be an empty object if the user not seccussfully logged in', async () => {        
        fakeAxios.onPost('/users/signin').reply(500)

        await store.dispatch(signin({ }));

        expect(store.getState().auth.profile).toMatchObject({});
      });

    }) 
  
  })

  describe('signup', () => {
    describe('localStorage', () => {
      it('should contain the token if the user seccussfully signed up', async () => {
        const result = {token: 'abc123', result: {id: 1}};
        
        fakeAxios.onPost('/users/signup').reply(200, result)

        await store.dispatch(signup({ }));

        expect(localStorageMock.setItem).toHaveBeenCalledWith('profile', JSON.stringify(result));
      });
      
      it('should not contain the token if the user not seccussfully signed up', async () => {        
        fakeAxios.onPost('/users/signin').reply(500)

        await store.dispatch(signin({ }));

        expect(localStorageMock.setItem).not.toHaveBeenCalledWith('profile');
      });

    })

    describe('token attribute in the store', () => {
      it('should be set to that returned from the server if the user successfully signed up', async () => {
        const result = {token: 'abc123', result: {id: 1}};
        
        fakeAxios.onPost('/users/signup').reply(200, result)
  
        await store.dispatch(signup({ }));
  
        expect(store.getState().auth.token).toEqual(result.token);
      });
      
      it('should be empty if the user not successfully signed up', async () => {        
        fakeAxios.onPost('/users/signup').reply(500)
  
        await store.dispatch(signup({ }));
  
        expect(store.getState().auth.token).toBe('');
      });

    })
      
    describe('profile object in the store', ()=> {
      it('should be set to that returned from the server if the user seccussfully signed up', async () => {
        const result = {token: 'abc123', result: {id: 1}};
        
        fakeAxios.onPost('/users/signup').reply(200, result)

        await store.dispatch(signup({ }));

        expect(store.getState().auth.profile).toEqual(result.result);
      });
      
      it('should be an empty object if the user not seccussfully signed up', async () => {        
        fakeAxios.onPost('/users/signup').reply(500)

        await store.dispatch(signup({ }));

        expect(store.getState().auth.profile).toMatchObject({});
      });

    })  

  })
  
  describe('signupWithGoogle', () => {
    describe('localStorage', () => {
      it('should contain the token if the user seccussfully signed up with google api', async () => {
        const result = {token: 'abc123', result: {id: 1}};
        
        fakeAxios.onPost('/users/signupWithGoogle').reply(200, result)

        await store.dispatch(signupWithGoogle({ }));

        expect(localStorageMock.setItem).toHaveBeenCalledWith('profile', JSON.stringify(result));
      });
      
      it('should not contain the token if the user not seccussfully signed up with google api', async () => {        
        fakeAxios.onPost('/users/signupWithGoogle').reply(500)

        await store.dispatch(signupWithGoogle({ }));

        expect(localStorageMock.setItem).not.toHaveBeenCalledWith('profile');
      });

    })

    describe('token attribute in the store', () => {
      it('should be set to that returned from the server if the user successfully signed up with google api', async () => {
        const result = {token: 'abc123', result: {id: 1}};
        
        fakeAxios.onPost('/users/signupWithGoogle').reply(200, result)
  
        await store.dispatch(signupWithGoogle({ }));
  
        expect(store.getState().auth.token).toEqual(result.token);
      });
      
      it('should be empty if the user not successfully signed up with google api', async () => {        
        fakeAxios.onPost('/users/signupWithGoogle').reply(500)
  
        await store.dispatch(signupWithGoogle({ }));
  
        expect(store.getState().auth.token).toBe('');
      });

    })
      
    describe('profile object in the store', ()=> {
      it('should be set to that returned from the server if the user seccussfully signed up with google api', async () => {
        const result = {token: 'abc123', result: {id: 1}};
        
        fakeAxios.onPost('/users/signupWithGoogle').reply(200, result)

        await store.dispatch(signupWithGoogle({ }));

        expect(store.getState().auth.profile).toEqual(result.result);
      });
      
      it('should be an empty object if the user not seccussfully signed up with google api', async () => {        
        fakeAxios.onPost('/users/signupWithGoogle').reply(500)

        await store.dispatch(signupWithGoogle({ }));

        expect(store.getState().auth.profile).toMatchObject({});
      });

    })  

  })

  describe('logout function', () => {
      it('should remove token from localStorage', async () => {
        await store.dispatch(logout());
        expect(localStorageMock.removeItem).toHaveBeenCalledWith('profile');
      });
      
      it('should set token to be null in the store', async () => {
        await store.dispatch(logout());
        expect(store.getState().auth.token).toBe(null);
      });

      it('should set profile to be empty in the store', async () => {
        await store.dispatch(logout());
        expect(store.getState().auth.profile).toMatchObject({});
      });

  })

  
});






