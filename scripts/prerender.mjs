import { readFile, rm, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'
import { pathToFileURL } from 'node:url'

const distDir = resolve('dist')
const clientHtmlPath = resolve(distDir, 'index.html')
const serverEntryPath = resolve(distDir, 'server', 'entry-server.js')

const template = await readFile(clientHtmlPath, 'utf8')
const { render } = await import(pathToFileURL(serverEntryPath).href)

const appHtml = render()
const prerenderedHtml = template.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)

await writeFile(clientHtmlPath, prerenderedHtml)
await rm(resolve(distDir, 'server'), { recursive: true, force: true })
