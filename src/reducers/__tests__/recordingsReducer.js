import recordingsReducer, { INITIAL_STATE } from '../recordingsReducer';
import * as types from '../../actions/types';

describe('recordingsReducer', () => {
  it('should handle action with unknown type', () => {
    expect(recordingsReducer(INITIAL_STATE, { type: 'unknown-action-type' })).toEqual(INITIAL_STATE);
  });

  it('should handle action FETCH_RECORDINGS', () => {
    expect(recordingsReducer(INITIAL_STATE, { type: types.FETCH_RECORDINGS, payload: [] })).toEqual({ ...INITIAL_STATE, data: [], isFetching: false, errorMessage: '' });
  });

  it('should handle action FETCHING_RECORDINGS', () => {
    expect(recordingsReducer(INITIAL_STATE, { type: types.FETCHING_RECORDINGS })).toEqual({ ...INITIAL_STATE, isFetching: true, errorMessage: '' });
  });

  it('should handle action FETCH_ERROR', () => {
    expect(recordingsReducer(INITIAL_STATE, { type: types.FETCH_ERROR, payload: 'error' })).toEqual({ ...INITIAL_STATE, isFetching: false, errorMessage: 'error' });
  });

  it('should handle action TOGGLE_CONFIRM_LOGOUT', () => {
    expect(recordingsReducer(INITIAL_STATE, { type: types.TOGGLE_CONFIRM_LOGOUT, payload: 'error' })).toEqual({ ...INITIAL_STATE, confirmLogout: !INITIAL_STATE.confirmLogout });
  });
});