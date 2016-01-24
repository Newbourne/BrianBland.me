'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require('react-router');

var _reactRouterRedux = require('react-router-redux');

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Navigation = function (_Component) {
    _inherits(Navigation, _Component);

    function Navigation(props, context) {
        _classCallCheck(this, Navigation);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Navigation).call(this, props, context));

        _this.state = {
            isOpen: false
        };
        return _this;
    }

    _createClass(Navigation, [{
        key: 'goHome',
        value: function goHome() {
            var dispatch = this.props.dispatch;

            dispatch(_reactRouterRedux.routeActions.push('/'));
        }
    }, {
        key: 'render',
        value: function render() {
            return _react2.default.createElement(
                'div',
                { className: 'nav-container' },
                _react2.default.createElement(
                    'div',
                    { className: 'nav-item' },
                    _react2.default.createElement(
                        'div',
                        { className: 'b-icon', onClick: this.goHome.bind(this) },
                        _react2.default.createElement(
                            'svg',
                            { xmlns: 'http://www.w3.org/2000/svg',
                                viewBox: '0 0 400 600' },
                            _react2.default.createElement('path', { className: 'b-base', d: 'M299.24,94.63c1.15,40.09,7.77,79.8,14.37,119.35l58.16,348.33' }),
                            _react2.default.createElement('path', { className: 'b-curves', d: 'M345.17,95a134.65,134.65,0,0,1,45.52-59.09c7-5.14,15-9.72,23.66-10.07,14.83-.59,27.76,11.8,32.36,25.91s2.63,29.46-.25,44A378.45,378.45,0,0,1,328.61,302.53c16.79-34.08,55.5-52.11,93.05-57.89,29-4.47,60-2.86,85.71,11.2,49.12,26.82,65.61,92.67,52.27,147-11.17,45.51-40.47,87-81.52,109.63s-93.6,24.72-134.76,2.33' })
                        )
                    )
                )
            );
        }
    }]);

    return Navigation;
}(_react.Component);

Navigation.propTypes = {
    dispatch: _react.PropTypes.func.isRequired
};

exports.default = (0, _reactRedux.connect)()(Navigation);