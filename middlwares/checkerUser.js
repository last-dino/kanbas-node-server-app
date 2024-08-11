function checkerUser(req, res, next) {
    const user = req.session.currentUser;
    req.user = user;
    next();
}

export {
    checkerUser
}