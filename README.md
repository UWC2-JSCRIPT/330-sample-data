# Sample Data

## Week 2 Lecture

`$ mongoimport --db=week2 --collection=users week2/users.json`

## Week 3 Lecture

```
$ git clone git@github.com:UWC2-JSCRIPT/330-sample-data.git
$ cd 330-sample-data/week3
$ npm install
$ node gen-users.js
```

```
$ mongoimport --db=week3 --collection=books week3-aggregation/books.json
$ mongoimport --db=week3 --collection=authors week3-aggregation/authors.json
```