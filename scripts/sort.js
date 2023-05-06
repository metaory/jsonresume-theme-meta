const { readFileSync, writeFileSync } = require('fs')
console.log('--SORT--')

const cvPath = './src/private-meta.json'

const read = (path) => JSON.parse(readFileSync(path, { encoding: 'utf8' }))
const write = (path, data) => writeFileSync(path, JSON.stringify(data, null, 2))

async function init() {
  const cv = read(cvPath)

  cv.skills.sets = cv.skills.sets
    .map(x => ({...x, skills: x.skills.sort()}))

  cv.employment.history = cv.employment.history
    .map(x => ({ ...x, keywords: x.keywords.sort()}))

  cv.languages = cv.languages
    .sort((a, b) => a.language > b.language ? 1 : a.language < b.language ? -1 : 0)

  write(cvPath, cv)
}

init()
  .then(console.log)
  .catch(console.error)
