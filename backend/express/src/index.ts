import express from 'express';
import { fractions, validateFraction } from "./data/fractions";
import * as _ from "lodash";
import { Fraction } from "./types";

const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const PORT: number = 3000;

app.get('/', (req, res) => res.send("Hello world"));

app.get('/api/fractions', (req, res) => {
  res.json(fractions).end();
});

app.get('/api/fractions/:id', (req, res) => {
  let fraction = _.find(fractions, (fraction) => (fraction.id === parseInt(req.params.id)));
  if(!fraction) return res.status(404).json({msg: 'Fraction number with the given ID not find.'});
  res.json(fraction).end();
});

app.post('/api/fractions', (req, res) => {
  console.log("req.body:", req.body);
  const {error} = validateFraction(req.body);
  if(error){
    return res.status(405).json({msg: error.message}).end();
  }

  const fraction: Fraction = {
    id: fractions.length + 1,
    numerator: req.body.numerator,
    denominator: req.body.denominator
  };
  fractions.push(fraction);
  res.json(fraction).end();
});

app.listen(PORT, () => {
  console.log(`Express with Typescript! http://localhost:${PORT}`);
});