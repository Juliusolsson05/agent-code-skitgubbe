import { rename, rmdir } from 'node:fs/promises'
await rename('lan-dist/lan/index.html', 'lan-dist/index.html')
await rmdir('lan-dist/lan')
