const makanTerusRehat = (waktu) =>
  waktu < 0 ? 0 : 1 + makanTerusRehat(waktu - 15)

console.log(makanTerusRehat(100))
console.log(makanTerusRehat(10))
