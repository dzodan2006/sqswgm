export const COUNTRY_FLAG_URLS: Record<string, string> = {
  // Evropa (UEFA)
  FRA: 'https://flagcdn.com/fr.svg',
  ENG: 'https://flagcdn.com/gb-eng.svg',
  ESP: 'https://flagcdn.com/es.svg',
  GER: 'https://flagcdn.com/de.svg',
  POR: 'https://flagcdn.com/pt.svg',
  NED: 'https://flagcdn.com/nl.svg',
  BEL: 'https://flagcdn.com/be.svg',
  CRO: 'https://flagcdn.com/hr.svg',
  SUI: 'https://flagcdn.com/ch.svg',
  AUT: 'https://flagcdn.com/at.svg',
  SCO: 'https://flagcdn.com/gb-sct.svg',
  SWE: 'https://flagcdn.com/se.svg',
  CZE: 'https://flagcdn.com/cz.svg',
  BIH: 'https://flagcdn.com/ba.svg',
  NOR: 'https://flagcdn.com/no.svg',
  ITA: 'https://flagcdn.com/it.svg',
  SRB: 'https://flagcdn.com/rs.svg',
  RUS: 'https://flagcdn.com/ru.svg',
  POL: 'https://flagcdn.com/pl.svg',
  DEN: 'https://flagcdn.com/dk.svg',
  TUR: 'https://flagcdn.com/tr.svg',
  UKR: 'https://flagcdn.com/ua.svg',
  GRE: 'https://flagcdn.com/gr.svg',
  HUN: 'https://flagcdn.com/hu.svg',
  ROU: 'https://flagcdn.com/ro.svg',
  SVK: 'https://flagcdn.com/sk.svg',
  SVN: 'https://flagcdn.com/si.svg',

  // Južna Amerika (CONMEBOL)
  BRA: 'https://flagcdn.com/br.svg',
  ARG: 'https://flagcdn.com/ar.svg',
  URU: 'https://flagcdn.com/uy.svg',
  COL: 'https://flagcdn.com/co.svg',
  ECU: 'https://flagcdn.com/ec.svg',
  PAR: 'https://flagcdn.com/py.svg',
  CHI: 'https://flagcdn.com/cl.svg',

  // Severna i Srednja Amerika (CONCACAF)
  USA: 'https://flagcdn.com/us.svg',
  MEX: 'https://flagcdn.com/mx.svg',
  CAN: 'https://flagcdn.com/ca.svg',
  PAN: 'https://flagcdn.com/pa.svg',
  HAI: 'https://flagcdn.com/ht.svg',
  CUW: 'https://flagcdn.com/cw.svg',
  JAM: 'https://flagcdn.com/jm.svg',

  // Afrika (CAF)
  MAR: 'https://flagcdn.com/ma.svg',
  SEN: 'https://flagcdn.com/sn.svg',
  EGY: 'https://flagcdn.com/eg.svg',
  CIV: 'https://flagcdn.com/ci.svg',
  GHA: 'https://flagcdn.com/gh.svg',
  ALG: 'https://flagcdn.com/dz.svg',
  RSA: 'https://flagcdn.com/za.svg',
  TUN: 'https://flagcdn.com/tn.svg',
  CPV: 'https://flagcdn.com/cv.svg',
  CMR: 'https://flagcdn.com/cm.svg',
  NGA: 'https://flagcdn.com/ng.svg',

  // Azija (AFC) i Okeanija (OFC)
  JPN: 'https://flagcdn.com/jp.svg',
  KOR: 'https://flagcdn.com/kr.svg',
  IRN: 'https://flagcdn.com/ir.svg',
  AUS: 'https://flagcdn.com/au.svg',
  KSA: 'https://flagcdn.com/sa.svg',
  QAT: 'https://flagcdn.com/qa.svg',
  JOR: 'https://flagcdn.com/jo.svg',
  UZB: 'https://flagcdn.com/uz.svg',
  IRQ: 'https://flagcdn.com/iq.svg',
  NZL: 'https://flagcdn.com/nz.svg',
};

export function getCountryFlag(code: string): string {
  const c = code.toUpperCase();
  return COUNTRY_FLAG_URLS[c] || 'https://flagcdn.com/un.svg';
}

export function getCountryFlagUrl(code: string): string {
  return getCountryFlag(code);
}
