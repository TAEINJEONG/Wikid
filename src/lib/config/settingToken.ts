export function setAccessTokenCookie(accessToken: string) {
    const expires = new Date();
    expires.setMinutes(expires.getMinutes() + 10); // 10분 후 만료
    document.cookie = `accessToken=${accessToken}; expires=${expires.toUTCString()}; path=/; Secure; SameSite=Strict`;
}
  
export function setRefreshTokenCookie(refreshToken: string) {
    const expires = new Date();
    expires.setHours(expires.getHours() + 24); // 24시간 후 만료
    document.cookie = `refreshToken=${refreshToken}; expires=${expires.toUTCString()}; path=/; Secure; SameSite=Strict`;
}

export function getToken(tokenName: string) {
    const token = document.cookie.split(';')
    .find((token) => token.trim().startsWith(`${tokenName}=`))
    ?.split("=")[1];

    return token;
}

export function deleteToken(tokenName: string) {
    const expires = new Date(0);
    document.cookie = `${tokenName}=; expires=${expires.toUTCString()}; path=/; Secure; SameSite=Strict`;
}