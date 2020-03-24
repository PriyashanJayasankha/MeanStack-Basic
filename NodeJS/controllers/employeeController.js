const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId

var { Employee } = require('../models/employee')

router.get('/all', (req, res) => {
  Employee.find((err, docs) => {
    if (err) {
      console.log('Error in Retriving Employees: ' + JSON.stringify(err, undefined, 2));
    } else {
      res.send(docs);
    }
  });
});

router.get('/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)){
    Employee.findById(req.params.id, (err, doc) => {
      if (err) {
        console.log('Error in Retriving Employee: ' + JSON.stringify(err, undefined, 2));
      } else {
        res.send(doc);
      }
    });
  } else {
    return res.status(400).send('No record with given id: ' + req.params.id);
  }
});

router.post('/add', (req, res) => {
  var emp = new Employee({
    name: req.body.name,
    position: req.body.position,
    office: req.body.office,
    salary: req.body.salary
  });

  emp.save((err, doc) => {
    if (err) {
      console.log('Error in adding data: ' + JSON.stringify(err, undefined, 2));
    } else {
      res.send(doc);
    }
  })

});

router.put('/update/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)) {
    var emp = {
      name: req.body.name,
      position: req.body.position,
      office: req.body.office,
      salary: req.body.salary
    };

    Employee.findByIdAndUpdate(req.params.id, {$set: emp}, {new: true}, (err, doc) => {
      if (err) {
        console.log('Error in update employee: ' + JSON.stringify(err, undefined, 2));
      } else {
        res.send(doc);
      }
    });
  } else {
    return res.status(400).send('No record with given id: ' + req.params.id);
  }
});

router.delete('/delete/:id', (req, res) => {
  if (ObjectId.isValid(req.params.id)){
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
      if (err) {
        console.log('Error in removing Employee: ' + JSON.stringify(err, undefined, 2));
      } else {
        res.send(doc);
      }
    });
  } else {
    return res.status(400).send('No record with given id: ' + req.params.id);
  }
});

module.exports = router;
