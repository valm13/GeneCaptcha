// Doc : https://github.com/produck/svg-captcha

const { request, json } = require('express')
const express = require('express')
const app = express()
var svgCaptcha = require('svg-captcha');

function generateCaptcha(text, bg_color) {
    var options = {
    width: 600,
    height: 200,
    noise: 0,
    color: false,
    inverse: false,
    ignoreChars: '',
    fontSize: 128,
    charPreset: '',
    };
    if(arguments.length == 2)
        options.background = bg_color;
    var captcha = svgCaptcha(text, options);
    console.log(captcha);
    return captcha;
}
app.get('/captcha', (req,res) => {
    const text = req.query.text;
    const color = req.query.color;
    const font = req.query.font;
    var captcha;
    if(text != undefined)
    {
        if(font != undefined)
            svgCaptcha.loadFont("./fonts/"+font);
        else
            console.log('pas de font');
        if(color != undefined)
        {
            captcha = generateCaptcha(text,color);
        }
        else
        {
            console.log('pas de color');
            captcha = generateCaptcha(text);
        } 
    }
    else
    {
        console.log('pas de text');
        exit;
    }  
    console.log("text ="+text+"|color = "+color+"|font= "+font);
    return res.status(200).json(captcha)
})
app.listen(8080, () => {
    console.log('Serveur de génération de captcha à l\'écoute');
    console.log('Exemple de requête : http://localhost:8080/captcha?text=blabla&color=blue&font=comicsansms.ttf');
  })