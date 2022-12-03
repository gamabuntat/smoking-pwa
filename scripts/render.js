const fs = require('fs');
const path = require('path');
const React = require('react');
const ReactDOMServer = require('react-dom/server');

require('@babel/register')({
    extensions: ['.tsx', '.ts'],
    plugins: [
        [
            require.resolve('babel-plugin-module-resolver'),
            {
                root: ['./src/'],
                alias: {
                    '~': path.resolve(__dirname, '../src'),
                },
            },
        ],
    ],
    presets: ['@babel/env'],
});

const { App } = require('../src/App');

const appHtml = ReactDOMServer.renderToString(React.createElement(App));

fs.readFile(
    path.resolve(__dirname, '../dist/index.html'),
    'utf8',
    (err, data) => {
        if (err) throw err;
        const newData = data.replace(
            '<div id="root"></div>',
            `<div id="root">${appHtml}</div>`
        );

        fs.writeFile(
            path.resolve(__dirname, '../dist/index.html'),
            newData,
            'utf8',
            (err) => {
                if (err) throw err;
                console.log('success!');
            }
        );
    }
);
