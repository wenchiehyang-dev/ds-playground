const radius = { sm: 4, md: 8, lg: 16 }

for (const name in radius) {
    radius[name] = radius[name] + 'px';
}

for (const name in radius) {
  console.log(name, radius[name]);
}

//No5

const space = {
  control: { x: 16, y: 8 },
  layout: { gap: 24 }
};

for (const group in space) {  // group = control, layout
  for (const name in space[group]) { // name = x, y, gap
    space[group][name] = space[group][name] + 'px';
    console.log(group, name, space[group][name]); 
  }
}

const a = { $value: 16, $type: 'number' };
const b = { 16: { $value: 16, $type: 'number' } };

console.log('$value' in a);
console.log('$value' in b);


const tokens = {
  space: { 16: { $value: 16 } },
  color: { blue: { 600: { $value: '#2563EB' } } }
};

function walk(group) {
  for (const key in group) {
    const item = group[key];
    if ('$value' in item) {
      console.log('token:', key, item.$value);
    } else {
      console.log('group:', key);
      walk(item);
    }
  }
}

walk(tokens);