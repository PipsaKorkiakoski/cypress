export function createRandomPassword() {
  const upper_chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lower_chars = "abcdefghijklmnopqrstuvwxyz";
  const nbrs = "0123456789";
  let rnum = 0;
  const string_length = 5;
  let randomstring = "!";
  for (let i = 0; i < string_length; i++) {
    rnum = Math.floor(Math.random() * upper_chars.length);
    randomstring += upper_chars.substring(rnum, rnum + 1);
    rnum = Math.floor(Math.random() * upper_chars.length);
    randomstring += lower_chars.substring(rnum, rnum + 1);
    rnum = Math.floor(Math.random() * nbrs.length);
    randomstring += nbrs.substring(rnum, rnum + 1);
  }
  return randomstring;
}
