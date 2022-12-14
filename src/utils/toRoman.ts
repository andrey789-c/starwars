const font_ar = [1,4,5,9,10,40,50,90,100,400,500,900,1000,4000,5000,9000,10000];
const font_rom = ["I","IV","V","IX","X","XL","L","XC","C","CD","D","CM","M", "M&#8577;","&#8577;","&#8577;&#8578;","&#8578;"];

export const to_roman = (text: number) => {
    if (!text) return "";
    var rezult = "";
    var n = font_ar.length - 1;
    while (text > 0) {
       if (text >= font_ar[n]) {
           rezult += font_rom[n];
           text -= font_ar[n];
       }
       else n--;
    }
    return rezult;
}