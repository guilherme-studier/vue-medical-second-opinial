/** Helpers relacionados a funcionalidades de autenticação */
import Cookies from 'js-cookie'

/** Retorna o nome do cookie de autenticação para o domínio */
export const getAuthCookieName = () => 'JWT-API'

/** Busca o cookie de autenticação do usuário do domínio */
export const getCurrentUserAccess = () => {
  const cookieName = getAuthCookieName()
  return Cookies.get(cookieName)
}

/** Cria um cookie de autenticação para o domínio */
export const setCurrentUserAccess = (token) => {
  const cookieName = getAuthCookieName()
  Cookies.set(cookieName, token)
}

/** Deleta o cookie de autenticação do domínio */
export const deleteCookie = (name) => {
  Cookies.remove(name)
}
