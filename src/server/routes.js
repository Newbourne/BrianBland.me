import fs from 'fs'
import path from 'path'
import debug from 'debug'

import React from 'react'
import Router from 'react-router';
import Location from 'react-router/lib/Location';

import render from './render'
import routes from './../app/routes';

var favIconPath = './../../data/favicon.ico'
var articleDir = './../../data/articles/'
var rootPath = './../../data/'

export default [
    {
        method: '*',
        path: '/favicon.ico',
        config: {
            handler: function (req, rep) {
                rep.file(path.join(__dirname + favIconPath))
            }
        }
    },
    {
        method: 'GET',
        path: '/assets/{param*}',
        config: {
            handler: {
                directory: {
                    path: __dirname + './../../dist/'
                }
            }
        }
    },
    {
        method: 'GET',
        path: '/api/articles/{param*}',
        config: {
            handler: function (req, rep) {
                console.log('path', path.join(__dirname, articleDir + req.params))
                rep()
            }
        }
    },
    {
        method: 'GET',
        path: '/api/{file*}',
        config: {
            handler: function (req, rep) {
                var rfp = path.join(__dirname, rootPath + req.params.file)
                var isFile = fs.existsSync(rfp)
                if (!isFile) {
                    rep()
                }
                else {
                    rep(fs.readFileSync(rfp)).type('text/plain')
                }
            }
        }
    },
    {
        method: '*',
        path: '/{param*}',
        config: {
            handler: function (req, rep) {
                console.log('redirected?')
                render(req, rep, 'default', {})
            }
        }
    }
];