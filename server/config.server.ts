const config = {
    port: process.env.PORT || 3000,
    db: process.env.MONGODB_URI || 'mongodb://localhost:27017/librarytech',
    SECRET_TOKEN: 'Syst3mMyL1br4ry'
};

export { config };
