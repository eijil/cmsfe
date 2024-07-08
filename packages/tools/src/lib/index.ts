export function toLowerCaseFirstLetter(str:string) {
  return str.replace(/\b(\w)/g, function(match, capture) {
    return capture.toLowerCase();
  });
}


export const Window = ()=>{
  return window
}