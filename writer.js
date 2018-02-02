var csvWriter = require('csv-write-stream')

var writer = csvWriter({
  separator: ';',
  newline: '\n',
  headers: ["hello", "foo"],
  sendHeaders: true
})

writer.pipe(fs.createWriteStream('out.csv'))

writer.write(['world', 'bar'])

writer.end()
