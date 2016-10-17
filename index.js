const path = require('path');
const express = require('express');
const moment = require('moment');

const app = express();

const acceptable_formats = [
  'MMMM DD, YYYY',
  'MMMM-DD-YYYY',
  'DD MMMM YYYY',
  'DD MMMM, YYYY',
  'DD-MMMM-YYYY',
]

app.set('port', (process.env.PORT || 3000));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/:timestamp', function(req, res) {
  let time = moment(req.params.timestamp, acceptable_formats, true);
  time = time.isValid() ? time : moment.unix(req.params.timestamp);

  if (time.isValid()) {
    res.json({
      unix: time.format('X'),
      natural: time.format('MMM DD, YYYY')
    })
  } else {
    res.json({
      unix: null,
      natural: null
    })
  }
});

app.listen(app.get('port'), function() {
  console.log(`Server ready on port: ${app.get('port')}`)
});
