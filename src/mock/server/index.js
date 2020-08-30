/*
 * @Author: Damom
 * @Date: 2020-08-20 22:34:48
 * @LastEditors: Damom
 * @LastEditTime: 2020-08-30 11:55:12
 * @Description: file content
 */
const jsonServer = require('json-server')
const db = require('./db')
const routes = require('./routes')
const port = 3002

const server = jsonServer.create()
const router = jsonServer.router(db)
const middlewares = jsonServer.defaults()
const rewriter = jsonServer.rewriter(routes)

server.use(middlewares)
server.use((request,res,next)=>{
    console.log(request.method)
    // request.method = 'GET'
    next()
})

server.use(rewriter)
server.use(router)

server.listen(port,()=>{
    console.log('open mock server at localhost:' + port)
})