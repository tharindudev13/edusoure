const SECRET_KEY = 0xDEADBEEF; 

export function encode(num) {
    const scrambled = (num ^ SECRET_KEY) >>> 0;
    return scrambled.toString(36).padStart(8, '0');
}

export function decode(str) {
    const scrambled = parseInt(str, 36);
    return (scrambled ^ SECRET_KEY) >>> 0;
}
