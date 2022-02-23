
import CONFIG from '../config'
const { DOMAIN, ENV_PREFIX } = CONFIG
import Cookies from 'js-cookie'

let cookiePreFix
switch ( ENV_PREFIX ) {
  case 'dev' :
    cookiePreFix = 'fat_'
    break
  case 'fat' :
    cookiePreFix = 'fat_'
    break
  case 'uat' :
    cookiePreFix = 'uat_'
    break
  case 'pro' :
    cookiePreFix = ''
    break
  default :
    cookiePreFix = 'fat_'
}

const cookieParams = {
  path : '/',
  domain : DOMAIN,
  expires : 7
  // Secure : true,
  // SameSite : 'none',
}

export function getAllCookies() {
  return Cookies.get()
}

export function getCookieByKey( key, off ) {
  let keyStr = ''
  if ( !off ) {
    keyStr = cookiePreFix + '' + key
  } else {
    keyStr = key
  }
  return Cookies.get( keyStr )
}
// setUserInfos
export function setCookie( key, value, params ) {
  const setParams = params || cookieParams
  const keyStr = cookiePreFix + '' + key
  return Cookies.set( keyStr, value, setParams )
}

export function removeCookieByKey( key, off = false ) {
  const keyStr = off ? key : cookiePreFix + '' + key
  return Cookies.remove( keyStr, cookieParams )
}

export function clearAllCookies() {
  const keys = Object.keys( getAllCookies() )
  keys.forEach( ( key ) => {
    removeCookieByKey( key, true )
  } )
}
