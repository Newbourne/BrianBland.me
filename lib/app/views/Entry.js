'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _EntryActions = require('./../actions/EntryActions');

var EntryActions = _interopRequireWildcard(_EntryActions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Entry = function (_Component) {
    _inherits(Entry, _Component);

    function Entry(props, context) {
        _classCallCheck(this, Entry);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Entry).call(this, props, context));
    }

    _createClass(Entry, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _props = this.props;
            var dispatch = _props.dispatch;
            var endpoint = _props.endpoint;
            var params = _props.params;
            var actions = _props.actions;

            if (params.key != endpoint) {
                //actions.getEntry(params.key)
            }
        }
    }, {
        key: 'dataFn',
        value: function dataFn() {
            var entry = this.props.entry;

            return {
                __html: entry
            };
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement('div', { dangerouslySetInnerHTML: this.dataFn() });
        }
        // static fetch(id) {
        //     return EntryActions.getEntry(id)
        // }

    }]);

    return Entry;
}(_react.Component);

function mapStateToProps(state) {
    return {
        entry: state.EntryReducer.entry,
        endpoint: state.EntryReducer.endpoint
    };
}

function mapDispatchToProps(dispatch) {
    return {
        actions: (0, _redux.bindActionCreators)(EntryActions, dispatch)
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(Entry);