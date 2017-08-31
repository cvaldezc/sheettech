import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
// const formidable = require('express-formidable');


import { urls } from './apps/routes/urls';


const serve = express();

serve.use( express.static(path.join(__dirname, 'media')));

// serve.use(formidable())
serve.use(bodyParser.json({limit: "50mb"}));
serve.use(bodyParser.urlencoded({limit: "50mb", extended: false, parameterLimit:50000}));

serve.use('/restful', urls);

serve.use('/', (req, res) => {
    // console.log(req);
    res.sendFile(path.join(__dirname, '../index.html'));
});

serve.use(function(req, res, next) {
    const err = new Error('Not Found');
    err['status'] = 404;
    // console.log(err)
    // res.status(404).json({ raiseGlobal: err })
    next(err);
});

// error handler
serve.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error 'page'
    res.status(err.status || 500);
    res.render('error');
});

export { serve };
