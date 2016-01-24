'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _redux = require('redux');

var _reactRedux = require('react-redux');

var _reactRouterRedux = require('react-router-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Error = function (_Component) {
    _inherits(Error, _Component);

    function Error(props, context) {
        _classCallCheck(this, Error);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Error).call(this, props, context));
    }

    _createClass(Error, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            var _props = this.props;
            var error = _props.error;
            var dispatch = _props.dispatch;

            if (!error || error.lengh > 0) {
                dispatch(_reactRouterRedux.routeActions.push('/'));
            }
        }
    }, {
        key: 'render',
        value: function render() {
            var error = this.props.error;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'h2',
                    null,
                    'Ah man, I\'m so sorry!'
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    'An unexpected error has occurred. Hopefully, this has been reported and I will be able to fix in a timely fashion. '
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    error
                )
            );
        }
    }]);

    return Error;
}(_react.Component);

function mapStateToProps(state) {
    return {
        error: state.ErrorReducer.error
    };
}

exports.default = (0, _reactRedux.connect)(mapStateToProps, null)(Error);