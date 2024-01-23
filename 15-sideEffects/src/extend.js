Number.prototype.pod = function (num) {
    let res = this + '';
    while (num >= 0) {
        res = '0' + res;
        num--;
    }
    return res;
}