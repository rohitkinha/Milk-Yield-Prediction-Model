const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
// const http = require("http");

var data = {
};

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var farmsize;

app.get("/", function (req, res) {
    res.render("extrinsicform");

});
app.get("/intrinsicform", function (req, res) {
    res.render("intrinsicform",{cattle_number:farmsize});
});

var data1={}

app.post("/", function (req, res) {
    data1=req.body;
    farmsize = req.body.farmsize;
    res.redirect("/intrinsicform");
});


app.post("/intrinsicform", function (req, res) {
    data2=req.body;

    data={
        "extrinsic":data1,
        "intrinsic":data2
    }
    milkYeild=[];
    for(let i = 0; i < farmsize; i++){

        age=data.intrinsic.age[i];
        breed=data.intrinsic.breed[i];
        age_calving=data.intrinsic.age_calving[i];
        lactation_number=data.intrinsic.lactation_number[i];
        farmsize=data.extrinsic.farmsize;

        var x1=farmsize;
        var x2=age;
        var x3=lactation_number;
        var x4=age_calving;
        var x5=0;
        if(breed=="Brown"){
            x5=1
        }
        var x6=0;
        if(breed=="H.F"){
            x6=1
        }
        var x7=0;
        if(breed=="Jersi"){
            x7=1
        }
        var x8=0;
        if(breed=="Murah"){
            x8=1
        }
        var x9=0;
        if(breed=="N.R."){
            x9=1
        }
        var x10=0;
        if(breed=="Sahiwal"){
            x10=1;
        }
        var c1=0.04514957,c2=-0.57395445,c3=0.61455102,c4=1.59916944,c5=-0.66777694,c6=2.79924935,c7=0.26971087,c8=-0.82022929,c9=-1.32007493,c10=-0.26087906;
        var x = c1 * x1 + c2 * x2 + c3 * x3 + c4 * x4 + c5 * x5 + c6 * x6 + c7 * x7 + c8 * x8 + c9 * x9 + c10 * x10 + 3.5562231567465625;
        var xy = x.toFixed(2);
        milkYeild.push(xy);
    }
    console.log(milkYeild)
    res.render('output', { milkYeild: milkYeild });

    // const options = {
    //     hostname: '127.0.0.1',
    //     port: 8000,
    //     path: '/',
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/json',
    //         'Content-Length': JSON.stringify(data).length,
    //     }
    // };

    // const request = http.request(options, res => {
    //     console.log(`statusCode: ${res.statusCode}`);
    //     res.on('data', d => {
    //         process.stdout.write(d);
    //     });
    // });

    // request.on('error', error => {
    //     console.error(error);
    // });    

    // request.write(JSON.stringify(data));
    // request.end();
    res.redirect("/");
})


app.listen(3000, function () {
    console.log("Server is live and running.");
});