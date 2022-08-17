exports.getDay = function () {

    const date = new Date();

    const options = {
        weekday: "long",
        month: "long",
        day: "numeric"
    }

    return date.toLocaleDateString("en-US", options);
}

exports.getYear = function () {

    const date = new Date();

    const options = {
        year: "numeric"
    }

    return date.toLocaleDateString("en-US", options);
}