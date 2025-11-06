
// let params = 'nasi putih\ntelur\nkecap\nayam';

function changeParams(params) {
  return params.split(/\r?\n/).map(i => i.replace(/,$/, "").trim()).filter(i => i.length > 0);
}

console.log(changeParams('nasi putih,\ntelur,\nkecap,\nayam'))