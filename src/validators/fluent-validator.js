/** @format */

'use strict';

let errors = [];

function ValidationContract() {
  errors = [];
}

ValidationContract.prototype.isRequired = (value, message) => {
  if (!value || value.length <= 0) {
    errors.push({ message });
  }
};

ValidationContract.prototype.hasMinLen = (value, min, message) => {
  if (!value || value.length <= min) {
    errors.push({ message });
  }
};

ValidationContract.prototype.hasMaxLen = (value, max, message) => {
  if (!value || value.length <= max) {
    errors.push({ message });
  }
};

ValidationContract.prototype.isFixedLen = (value, len, message) => {
  if (value.length != len) {
    errors.push({ message });
  }
};

ValidationContract.prototype.isEmail = (value, message) => {
  const regex = new RegExp(/^[A-z0-9\-\.\$]{1,}\@\w+\.\w{1,4}(\.\D{1,3})?$/);
  if (!regex.test(value)) {
    errors.push({ message });
  }
};

ValidationContract.prototype.errors = () => {
  return errors;
};

ValidationContract.prototype.clear = () => {
  errors = [];
};

ValidationContract.prototype.isValid = () => {
  return errors.length === 0;
};

module.exports = ValidationContract;
