
import { ntp } from '../NTP.js';
import { fZeros } from "./zeros.js";


export function fTime(S, W) {

   let Ws = W / 3600;

   var T_ms = S / W;

   function isZeroGate(val) {

      if (val === 0) {
         throw new Error('Are you going to divide by zero?;D');
      }

   } try {

      isZeroGate(Ws);

      var T_m_s = S / Ws;




      if (!isNaN(T_m_s) || typeof T_m_s != "number") {

         var date = new Date(0);

         date.setSeconds(T_m_s);

         var time = date.toISOString().substring(11, 19);

      }

   } catch (error) {

      console.error(error);

   }

   if (T_ms < 1) T_ms = T_ms * 60;


   var t_m = Math.floor(T_ms);

   var t_s = T_ms - t_m;

   var _ts = t_s * 60;   // sekundy/minuty



   var ts = String(parseInt(_ts));

   if (ts.length < 2) {

      ts = "0" + String(ts);
   }

   return {
      iso:  time === undefined  ? "00:00:00" : time,
      sec: isNaN(T_m_s) ? 0 : T_m_s
   };
}




export function fDN(inDM, inDelM) {

   if (inDM == 0) { inDM = 360 };

   var DN = (inDM - 180) - inDelM;

   if (DN < 0) { return DN + 360; }
   if (DN > 360) { return DN - 360 }
   else { return DN; }

}
//



export function fnkdm(innkdg, inDelM) {
   var nkdm = innkdg - inDelM;

   if (nkdm < 0) return nkdm + 360;
   else return nkdm;
}
//



export function fKB(innkdg, inDelM, inDelB) {
   var KB = innkdg - inDelM - inDelB;

   if (KB < 0) return KB + 360;
   else return KB;

}
//


export function fKW(DN, KB) {
   var KW = DN - KB;

   if (KW >= 180) return KW - 360;
   if (KW <= -180) return KW + 360;

   else return KW;
}
//



export function fKM(KZ, KB) {
   var KM = KB + KZ;

   if (KM < 0) KM = KM + 360;
   if (KM > 360) KM = KM - 360;

   return KM;
}
//




export function fW(KW, V, U) {

   var w_min;
   var NMkm = ntp.currentState.si;
   var kw = KW * Math.PI / 180;
   var W = parseInt(V + Math.cos(kw) * U);

   switch (NMkm) {

      case "nm":

         w_min = parseFloat(W) / 12;

         break;

      case "km":

         w_min = milesToKm(parseFloat(W)) / 12;

         break;
   }

   ntp.oVmin.iRef.current.value = isNaN(w_min) ? " " : w_min.toFixed(1);

   return W;
}
//



export function fsinKW(U, V, KW) {
   var kw = KW * Math.PI / 180;

   if (KW == 180 || KW == -180) KW = 0;
   if (KW < 0) kw = kw * (-1);

   var KZ1 = U * (Math.sin(kw) / V);
   var KZ2 = Math.sin(KZ1);
   var KZ3 = KZ2 * (180 / Math.PI);
   var KZ4 = KZ3 + (0.5);

   var KZ5 = parseInt(KZ4);

   if (KW > 0) KZ5 = KZ5 * (-1);

   return KZ5;

}


export function count() {



   if (ntp.currentState === undefined) { return }

   var Ktm = ntp.currentState.si;
   var s = parseFloat(ntp.is.iRef.current.value);



   switch (Ktm) {

      case "km":

         if (ntp.currentState.value) {
            s = kmetersToNM(parseFloat(ntp.is.iRef.current.value));
         }

         else s = s;

         break;

      case "NM":

         if (ntp.currentState.value) {
            s = s;
         }
         else {
            s = milesToKm(parseFloat(ntp.is.iRef.current.value));
         }

         break;
   }


   var δm = parseInt(ntp.iδm.iRef.current.value.replace(/\W+/, ""));

   var δb = parseInt(ntp.iδb.iRef.current.value.replace(/\W+/, ""));

   var v = parseInt(ntp.iv.iRef.current.value)

   var DN = fDN(parseInt(ntp.idm.iRef.current.value.replace(/\W+/, "")),  δm );

   var nkdm = fnkdm(parseInt(ntp.inkdg.iRef.current.value.replace(/\W+/, "")), δm);

   var KB = fKB(parseInt(ntp.inkdg.iRef.current.value.replace(/\W+/, "")), δm, δb);

   var KW = fKW(DN, KB);

   var KZ = fsinKW(parseInt(ntp.iu.iRef.current.value), v, KW);

   var W = fW(KW, v, parseInt(ntp.iu.iRef.current.value));

   var KM = fKM(KZ, KB);

   var Vmin = parseFloat(ntp.oVmin.iRef.current.value);




   ntp.odn.iRef.current.value = fZeros(isNaN(DN) ? " " : DN, "i");
   ntp.onkdm.iRef.current.value = fZeros(isNaN(nkdm) ? " " : nkdm, "i");
   ntp.okb.iRef.current.value = fZeros(isNaN(KB) ? " " : KB, "i");
   ntp.okw.iRef.current.value = fZeros(isNaN(KW) ? " " : KW, "i");
   ntp.ow.iRef.current.value = isNaN(W) ? " " : W;
   ntp.okz.iRef.current.value = fZeros(isNaN(KZ) ? " " : KZ, "i");
   ntp.okm.iRef.current.value = fZeros(isNaN(KM) ? " " : KM, "i");


   //NTP SCHEMA
   return {

      from: ntp.ifrom.iRef.current.value.replace(" ", "").toUpperCase(),
      to: ntp.ito.iRef.current.value.replace(" ", "").toUpperCase(),
      dn: nanGate(DN),
      dm: nanGate(fZeros(ntp.idm.iRef.current.value.replace(/\W+/, ""), "o")),
      nkdg: nanGate(parseInt(ntp.inkdg.iRef.current.value.replace(/\W+ /, ""))),
      nkdm: nanGate(nkdm),
      u: nanGate(ntp.iu.iRef.current.value.replace(" ", "")),
      v: nanGate(v),
      w: nanGate(W),
      kz: nanGate(KZ),
      km: fZeros(KM, "i"),
      kb: fZeros(KB, "i"),
      kw: nanGate(KW),
      vmin: nanGate(Vmin),
      δm: nanGate(δm),
      δb: nanGate(δb) 

   };


}




export function milesToKm(miles) { return miles * 1.852; }

export function kmetersToNM(kmeters) { return kmeters / 1.852; }


export function nanGate(val) {


   return isNaN(val) ? 0 : val;


}



