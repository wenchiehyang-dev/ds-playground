const radius = { sm: 4, md: 8, lg: 16 }

for (const name in radius) {
    radius[name] = radius[name] + 'px';
}

for (const name in radius) {
  console.log(name, radius[name]);
}
