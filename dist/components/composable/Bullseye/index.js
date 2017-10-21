"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var PropTypes = require("prop-types");
/*

TODO:

allow any react children! users can include components if they so desire
What is not allowed is any Bullseye component other than layer
- no <Bullseye />, no <Group /> and no primitive bullseye components
- <div />, <any /> are fine (I think?)

*/
var Bullseye = /** @class */ (function (_super) {
    __extends(Bullseye, _super);
    function Bullseye() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Bullseye.prototype.render = function () {
        return (React.createElement("div", null));
    };
    Bullseye.propTypes = {
        width: PropTypes.number.isRequired,
        height: PropTypes.number.isRequired,
        children: function () { return true; },
    };
    return Bullseye;
}(React.Component));
exports.default = Bullseye;
