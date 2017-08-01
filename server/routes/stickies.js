var express = require('express');
var router = express.Router();

/* GET notes listing. */
router.get('/', function(req, res, next) {
  res.json([
    {
      id: '1',
      title: 'Sticky Sample',
      notes: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis sed erat rhoncus dolor laoreet efficitur. Aenean laoreet justo libero, nec rhoncus sapien scelerisque ut. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Maecenas ipsum felis, feugiat rhoncus lacinia ac, dapibus ut mi. Fusce et laoreet neque'
    },
  ]);
});

module.exports = router;
