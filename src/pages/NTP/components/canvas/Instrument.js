
import React, { useEffect, useRef } from "react";
import { ntp } from "../../NTP.js"
import { fZeros } from "../../functions/zeros.js";
import { useSelector, useDispatch } from "react-redux";


export let img;

export const Instrument = (props) => {

  const themeState = useSelector(store => store.themeReducer).theme;


const colors = themeState === "dark" ? 

{

fillStyle: "#242424",
face: "#b5d0aa",
plane: "#6b6b6b",
wind: "#9dddff"

}:{

  fillStyle: "#ffffff",
  face:"#1f1f1f",
  plane: "#ce9178",
  wind: "blue"


}

  useEffect(() => {



    let r = 75
    let NKDG = props.nkdg
    let DM = props.dm
    let KZ = props.kz

    let canvas = props.context.current.firstChild
    const context = canvas.getContext('2d', { willReadFrequently: true })



    let ico = document.createElement("canvas");
    ico.id = "ICO";
    // ico.width = 150;
    // ico.height = 150;
    ico.width = 100;
    ico.height = 100;
    let ico_ctx = ico.getContext("2d");

    context.save();

    context.fillStyle = "white";
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
   // context.scale(.33, .33)
    context.scale(.66, .66)
    context.translate(r, r);

    drawFace(context, r, "black", NKDG)
    drawRose(context, r, NKDG, "black");
    drawNKDG(context, r, "black")
    drawKZ(context, r, KZ, "black", .25, 50, 65)
    drawWind(context, r, DM, NKDG, "black",50);
    drawAT3(context, r, KZ, "black");


    context.translate(-r, -r);

    //  var slice = context.getImageData(0, 0, 50, 50)
    var slice = context.getImageData(0, 0, 100, 100)
    ico_ctx.putImageData(slice, 0, 0)

    img = ico.toDataURL();


    context.restore();


    context.fillStyle = colors.fillStyle;
    context.fillRect(0, 0, context.canvas.width, context.canvas.height);
    context.translate(r, r);

    drawFace(context, r, colors.face, NKDG)
    drawRose(context, r, NKDG, colors.face);
    drawNKDG(context, r, colors.face)
    drawKZ(context, r, KZ, colors.wind, .20, 50, 65)
    drawWind(context, r, DM, NKDG, colors.wind,250);
    drawAT3(context, r, KZ, colors.plane);




    context.translate(-r, -r);


  }, [props])


  return (



    <canvas ref={ntp.canvas.ref}  {...props} width={150} height={150} style={{ borderRadius: "7px", }} />


  );


}


const drawRose = (context, r, NKDG, color) => {


  var rose = ['', 'E', 'S', 'W', 'N'];
  var ang;
  var num;
  context.font = r * 0.35 + "px Courier";
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.fillStyle = color;

  for (num = 1; num < 5; num++) {
    ang = -NKDG * (Math.PI / 180) + num * Math.PI / 2;


    context.rotate(ang);
    context.translate(0, -r * 0.85);
    //context.rotate(-ang);
    context.fillText(rose[num].toString(), 0, 0);
    //context.rotate(ang);
    context.translate(0, r * 0.85);
    context.rotate(-ang);

  }

}

function drawFace(context, r, color, NKDG) {

  context.strokeStyle = color;
  var s = r * 0.025
  context.beginPath();
  context.lineWidth = r / 250;


  var ang;
  var num;


  for (num = 0; num <= 119; num++) {

    ang = -NKDG * (Math.PI / 180) + num * Math.PI / 12;


    context.rotate(ang);
    context.moveTo(0, s * -34.5);


    if (![0,30,60,90].some(val => val === num ) && !(num % 15)) {
      
      context.lineTo(0, s * -39);
      
    }
   
    context.lineTo(0, s * -35);
    context.stroke();

    context.rotate(-ang);

  }

}


function drawWind(context, r, DM, NKDG, color, weigth) {

  context.strokeStyle = color;//"#ce9178";
  var s = r * 0.025
  context.rotate((DM - NKDG) * (Math.PI / 180));

  context.beginPath();
  context.lineWidth = r / weigth;

  context.moveTo(s * -20, s * -33);
  context.lineTo(0, s * -23);
  context.lineTo(s * 20, s * -33);
  context.lineTo(0, s * -28);
  context.lineTo(s * -20, s * -33)

  context.stroke();

  context.rotate((-DM + NKDG) * (Math.PI / 180));

}



function drawAT3(context, r, KZ, color) {

  var s = r * 0.03

  context.rotate(KZ * (Math.PI / 180));


  context.beginPath();
  context.lineWidth = r / 96;
  context.fillStyle = color;//'#1f1f1f';
  //context.strokeStyle='red';

  context.moveTo(0, s * -10);
  context.lineTo(s * -1, s * -10);
  context.lineTo(s * -2, s * -5);
  context.lineTo(s * -14, s * -5);
  context.lineTo(s * -14, s * -1);
  context.lineTo(s * -2, 0);
  context.lineTo(s * -1, s * 6);
  context.lineTo(s * -6, s * 6);
  context.lineTo(s * -6, s * 9);
  context.lineTo(s * -1, s * 9);
  context.lineTo(0, s * 11);
  context.lineTo(s * 1, s * 9);
  context.lineTo(s * 6, s * 9);
  context.lineTo(s * 6, s * 6);
  context.lineTo(s * 1, s * 6);
  context.lineTo(s * 2, 0);
  context.lineTo(s * 14, s * -1);
  context.lineTo(s * 14, s * -5);
  context.lineTo(s * 2, s * -5);
  context.lineTo(s * 1, s * -10);
  context.lineTo(0, s * -10);
  context.fill();

  // context.shadowColor = "red";
  // context.shadowBlur = 5
  context.rotate(-KZ * (Math.PI / 180));
  //context.stroke(); 
}

function drawKZ(context, r, KZ, color, fS, x, y) {


  context.font = r * fS + "px Courier";
  context.textBaseline = "middle";
  context.textAlign = "center";
  context.fillStyle = color;
  context.fillText(fZeros(KZ, "i"), x, y);

  var s = r * 0.03

  context.rotate(KZ * (Math.PI / 180));
  context.beginPath();
  context.lineWidth = r / 250;
  context.strokeStyle = color;
  context.moveTo(0, s * -39);
  context.lineTo(0, s * 0);
  context.moveTo(0, s * 39);
  context.lineTo(0, s * 0);
  context.stroke();
  context.rotate(-KZ * (Math.PI / 180));

}



function drawNKDG(context, r, color) {

  var s = r * 0.03

  // context.rotate((Math.PI / 180)+NKDG);
  context.beginPath();
  context.lineWidth = r / 250;
  context.strokeStyle = color;
  context.moveTo(0, s * -39);
  context.lineTo(0, s * 0);
  context.moveTo(0, s * 39);
  context.lineTo(0, s * 0);
  context.stroke();
  // context.rotate((Math.PI / 180)-NKDG);

}





