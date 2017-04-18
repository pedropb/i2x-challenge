import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import * as actions from './'
import * as types from './types'


const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)
const history = { 
  push: jest.fn()
};
let mockAxios = new MockAdapter(axios);
let store = mockStore({ auth: {}, recordings: {} });

describe('actions ', () => {
  afterEach(() => {
    mockAxios.reset();
    store = mockStore({ auth: {}, recordings: {} });
  });

  describe('loginUser()', () => {
    const params = {
      email: 'email',
      password: 'pass'
    };
    
    it('should dispatch SENT_AUTH and AUTH_USER on success', () => {
      mockAxios.onPost(actions.LOGIN_ENDPOINT, params)
        .reply(200, { token: 'some-token' });

      const expectedActions = [
        { type: types.SENT_AUTH },
        { type: types.AUTH_USER }
      ]

      return store.dispatch(actions.loginUser(params))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      });
    });

    it('should dispatch AUTH_ERROR on failure', () => {
      mockAxios.onPost(actions.LOGIN_ENDPOINT, params)
        .reply(401);

      const expectedActions = [
        { type: types.SENT_AUTH },
        { type: types.AUTH_ERROR, payload: 'Invalid credentials.' }
      ]

      return store.dispatch(actions.loginUser(params))
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      });
    });
  });

  describe('logoutUser()', () => {
    it('should dispatch UNAUTH_USER', () => {
      store.dispatch(actions.logoutUser());

      const expectedActions = [
        { type: types.UNAUTH_USER }
      ]

      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  
  describe('fetchRecordings()', () => {
    it('should dispatch FETCHING_RECORDINGS and FETCH_RECORDINGS on success', () => {
      mockAxios.onGet(actions.RECORDINGS_ENDPOINT)
         .reply(200, { results: []});

      const expectedActions = [
        { type: types.FETCHING_RECORDINGS },
        { type: types.FETCH_RECORDINGS, payload: [] }
      ]

      return store.dispatch(actions.fetchRecordings())
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      });
    });

    it('should dispatch FETCH_ERROR with Request failed with status code 401', () => {
      mockAxios.onGet(actions.RECORDINGS_ENDPOINT)
         .reply(401);

      const expectedActions = [
        { type: types.FETCHING_RECORDINGS },
        { type: types.FETCH_ERROR, payload: 'Request failed with status code 401' }
      ]

      return store.dispatch(actions.fetchRecordings())
      .then(() => { // return of async actions
        expect(store.getActions()).toEqual(expectedActions)
      });
    });
  });

  describe('confirmLogout()', () => {
    it('should dispatch TOGGLE_CONFIRM_LOGOUT', () => {
      store.dispatch(actions.confirmLogout());

      const expectedActions = [
        { type: types.TOGGLE_CONFIRM_LOGOUT }
      ]

      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});