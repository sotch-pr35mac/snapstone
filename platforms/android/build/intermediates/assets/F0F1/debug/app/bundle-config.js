if (global.TNS_WEBPACK) {
    //registers tns-core-modules UI framework modules
    require("bundle-entry-points");

    //register application modules
    global.registerModule("camera/camera-page", function () { return require("./camera/camera"); });
}
