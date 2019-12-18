Array.prototype.findIndexOf = function(property, val) {
    var result = this.findIndex(function(el) {
        return el[property] === val
    })
    return result;
}