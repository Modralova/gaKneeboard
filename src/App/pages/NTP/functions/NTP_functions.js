import { ntp } from '../NTP';
import fZeros from './zeros';

export function milesToKm(miles) { return miles * 1.852; }

export function kmetersToNM(kmeters) { return kmeters / 1.852; }

export function fTime(S, W) {
  const Ws = W / 3600;

  let timeMs = S / W;

  function isZeroGate(val) {
    if (val === 0) {
      throw new Error('Are you going to divide by zero?;D');
    }
  } try {
    isZeroGate(Ws);

    let time;
    const t = S / Ws;

    if (!Number.isNaN(t) || typeof t !== 'number') {
      const date = new Date(0);

      date.setSeconds(t);

      time = date.toISOString().substring(11, 19);
    }

    if (timeMs < 1) timeMs *= 60;

    const tM = Math.floor(timeMs);

    const tS = timeMs - tM;

    const tSt = tS * 60; // sekundy/minuty

    let ts = String(parseInt(tSt, 10));

    if (ts.length < 2) {
      ts = `0${String(ts)}`;
    }

    return {
      iso: time === undefined ? '00:00:00' : time,
      sec: Number.isNaN(t) ? 0 : t,
    };
  } catch (error) {
    return undefined;
  }
}

export function nanGate(val) {
  return Number.isNaN(val) ? 0 : val;
}

export function fDN(fInDM, inDelM) {
  let inDM = fInDM;

  if (inDM === 0) { inDM = 360; }

  const DN = (inDM - 180) - inDelM;

  if (DN < 0) { return DN + 360; }
  if (DN > 360) { return DN - 360; }
  return DN;
}
//

export function fnkdm(innkdg, inDelM) {
  const nkdm = innkdg - inDelM;

  if (nkdm < 0) return nkdm + 360;
  return nkdm;
}
//

export function fKB(innkdg, inDelM, inDelB) {
  const KB = innkdg - inDelM - inDelB;

  if (KB < 0) return KB + 360;
  return KB;
}
//

export function fKW(DN, KB) {
  const KW = DN - KB;

  if (KW >= 180) return KW - 360;
  if (KW <= -180) return KW + 360;

  return KW;
}
//

export function fKM(KZ, KB) {
  let KM = KB + KZ;

  if (KM < 0) KM += 360;
  if (KM > 360) KM -= 360;

  return KM;
}
//

export function fW(KW, V, U) {
  let wMin;
  const NMkm = ntp.currentState.si;
  const kw = KW * Math.PI / 180;
  const W = parseInt(V + Math.cos(kw) * U, 10);

  switch (NMkm) {
    case 'nm':

      wMin = parseFloat(W) / 12;

      break;

    case 'km':

      wMin = milesToKm(parseFloat(W)) / 12;

      break;
  }

  ntp.oVmin.iRef.current.value = Number.isNaN(wMin) ? ' ' : wMin.toFixed(1);

  return W;
}
//

export function fsinKW(U, V, fkw) {
  let KW = fkw;

  let kw = KW * Math.PI / 180;

  if (KW === 180 || KW === -180) KW = 0;
  if (KW < 0) kw *= (-1);

  const KZ1 = U * (Math.sin(kw) / V);
  const KZ2 = Math.sin(KZ1);
  const KZ3 = KZ2 * (180 / Math.PI);
  const KZ4 = KZ3 + (0.5);

  let KZ5 = parseInt(KZ4, 10);

  if (KW > 0) KZ5 *= (-1);

  return KZ5;
}

export function count() {
  if (ntp.currentState === undefined) { return; }

  // const Ktm = ntp.currentState.si;
  // let s = parseFloat(ntp.is.iRef.current.value);

  // switch (Ktm) {
  //   case 'km':

  //     if (ntp.currentState.value) {
  //       s = kmetersToNM(parseFloat(ntp.is.iRef.current.value));
  //     }

  //     break;

  //   case 'NM':

  //     if (!ntp.currentState.value) {
  //       s = milesToKm(parseFloat(ntp.is.iRef.current.value));
  //     }

  //     break;
  // }

  const δm = parseInt(ntp.iδm.iRef.current.value.replace(/\W+/, ''), 10);

  const δb = parseInt(ntp.iδb.iRef.current.value.replace(/\W+/, ''), 10);

  const v = parseInt(ntp.iv.iRef.current.value, 10);

  const DN = fDN(parseInt(ntp.idm.iRef.current.value.replace(/\W+/, ''), 10), δm);

  const nkdm = fnkdm(parseInt(ntp.inkdg.iRef.current.value.replace(/\W+/, ''), 10), δm);

  const KB = fKB(parseInt(ntp.inkdg.iRef.current.value.replace(/\W+/, ''), 10), δm, δb);

  const KW = fKW(DN, KB);

  const KZ = fsinKW(parseInt(ntp.iu.iRef.current.value, 10), v, KW);

  const W = fW(KW, v, parseInt(ntp.iu.iRef.current.value, 10));

  const KM = fKM(KZ, KB);

  const Vmin = parseFloat(ntp.oVmin.iRef.current.value);

  ntp.odn.iRef.current.value = fZeros(Number.isNaN(DN) ? ' ' : DN, 'i');
  ntp.onkdm.iRef.current.value = fZeros(Number.isNaN(nkdm) ? ' ' : nkdm, 'i');
  ntp.okb.iRef.current.value = fZeros(Number.isNaN(KB) ? ' ' : KB, 'i');
  ntp.okw.iRef.current.value = fZeros(Number.isNaN(KW) ? ' ' : KW, 'i');
  ntp.ow.iRef.current.value = Number.isNaN(W) ? ' ' : W;
  ntp.okz.iRef.current.value = fZeros(Number.isNaN(KZ) ? ' ' : KZ, 'i');
  ntp.okm.iRef.current.value = fZeros(Number.isNaN(KM) ? ' ' : KM, 'i');

  // NTP SCHEMA
  return {

    from: ntp.ifrom.iRef.current.value.replace(' ', '').toUpperCase(),
    to: ntp.ito.iRef.current.value.replace(' ', '').toUpperCase(),
    dn: nanGate(DN),
    dm: nanGate(fZeros(ntp.idm.iRef.current.value.replace(/\W+/, ''), 'o')),
    nkdg: nanGate(parseInt(ntp.inkdg.iRef.current.value.replace(/\W+ /, ''), 10)),
    nkdm: nanGate(nkdm),
    u: nanGate(ntp.iu.iRef.current.value.replace(' ', '')),
    v: nanGate(v),
    w: nanGate(W),
    kz: nanGate(KZ),
    km: fZeros(KM, 'i'),
    kb: fZeros(KB, 'i'),
    kw: nanGate(KW),
    vmin: nanGate(Vmin),
    δm: nanGate(δm),
    δb: nanGate(δb),

  };
}
