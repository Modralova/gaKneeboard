export function galToL(fuel) {
  return fuel * 3.78541178;
}

export function lToGal(fuel) {
  return fuel / 3.78541178;
}

export function kgmToLbsin(torque) {
  return torque * 86.796165979664;
}

export function lbsinToKgm(torque) {
  return torque / 86.796165979664;
}

export function kgToLbs(weight) {
  return weight * 2.20462262;
}

export function lbsToKg(weight) {
  return weight / 2.20462262;
}

export function mToIn(Agc) {
  const CMs = Agc * 100;

  return (CMs * 0.39370079).toFixed(3);
}

export function inToM(Agc) {
  const INs = Agc;

  return ((INs * 2.54) / 100).toFixed(3);
}
