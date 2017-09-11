const config = {
    port: process.env.PORT || 3000,
    db: process.env.MONGODB_URI || 'mongodb://localhost:27017/librarytech',
    SECRET_TOKEN: 'd665c2a5-9602-48b6-be12-309f98166160',
    remoteservice: 'http://127.0.0.1:8000/json/',
    SOURCE_LIBRARY: '/mnt/library' // 'c:\\mnt'
}

export { config }
