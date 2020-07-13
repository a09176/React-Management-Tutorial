const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true}));

app.get('/api/customers', (req,res) =>{
    res.send([{
        'id' : 1,
        'image' : 'https://placeimg.com/64/64/1', 
        'name' : '김하나',
        'birthday': '010206',
        'gender' : '여',
        'job' : '개발자'
        },
        {
          'id' : 2,
          'image' : 'https://placeimg.com/64/64/2', 
          'name' : '김둘',
          'birthday': '010204',
          'gender' : '남',
          'job' : '직장인'
          },
          {
            'id' : 3,
            'image' : 'https://placeimg.com/64/64/3', 
            'name' : '김셋',
            'birthday': '010203',
            'gender' : '여',
            'job' : '선생님'
          } 
        ]);
});

app.listen(port , ()=> console.log(`Listening on port ${port}`));