import Immutable from 'immutable';
import ActionTypes from '../constants';
import createReducer from '../../tools/reducer';

const initialState = Immutable.fromJS({});

export default createReducer(initialState, {
 	[ActionTypes.About.getData](state, { res }) {
    	return state.merge({
    		'data': res.text
    	})
  	}
})