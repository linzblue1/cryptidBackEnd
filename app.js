var express = require('express');
var path = require('path');
var logger = require('morgan');
var next = require('next')

// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'pages')));

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
    .then(() => {
        const server = express()

        server.get('*', (req, res) => {
            return handle(req, res)
        })

        server.listen(3001, (err) => {
            if (err) throw err
            console.log('> Ready on http://localhost:3001')
        })
    })
    .catch((ex) => {
        console.error(ex.stack)
        process.exit(1)
    })

module.exports = app;
