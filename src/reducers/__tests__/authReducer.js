import authReducer, { INITIAL_STATE } from '../authReducer';
import * as types from '../../actions/types';

describe('authReducer', () => {
  it('should handle action with unknown type', () => {
    expect(authReducer(INITIAL_STATE, { type: 'unknown-action-type' })).toEqual(INITIAL_STATE);
  });

  it('should handle action SENT_AUTH', () => {
    expect(authReducer(INITIAL_STATE, { type: types.SENT_AUTH })).toEqual({ ...INITIAL_STATE, error: '', isAuthenticating: true });
  });

  it('should handle action AUTH_USER', () => {
    expect(authReducer(INITIAL_STATE, { type: types.AUTH_USER })).toEqual({ ...INITIAL_STATE, error: '', authenticated: true, isAuthenticating: false });
  });

  it('should handle action UNAUTH_USER', () => {
    expect(authReducer(INITIAL_STATE, { type: types.UNAUTH_USER })).toEqual({ ...INITIAL_STATE, authenticated: false, isAuthenticating: false });
  });

  it('should handle action AUTH_ERROR', () => {
    expect(authReducer(INITIAL_STATE, { type: types.AUTH_ERROR, payload: 'error' })).toEqual({ ...INITIAL_STATE, error: 'error', isAuthenticating: false });
  });
});