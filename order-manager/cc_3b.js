let inventory = [
  {
    sku: "SKU-001",
    name: "Wrench",
    price: 5.99,
    stock: 36
  },
  {
    sku: "SKU-002",
    name: "Hammer",
    price: 3.99,
    stock: 98
  },
  {
    sku: "SKU-003",
    name: "Cordless Drill",
    price: 19.99,
    stock: 150
  },
  {
    sku: "SKU-004",
    name: "King Size KitKat",
    price: 2.99,
    stock: 275
  }
];

inventory.forEach(product => {
  console.log(
    `Item Sku: ${product.sku} | Product Name: ${product.name} | Product Price: $${product.price.toFixed(2)} | Stock: ${product.stock}`
  );
});

inventory.push({
  sku: "SKU-005",
  name: "Plumbers Tape",
  price: 1.99,
  stock: 65
});

console.log("Removed Product:", inventory.pop());

inventory[2].price = 16.99; 

inventory[3].stock += 45; 

console.log("--- UPDATED INVENTORY --- ");

inventory.forEach(product => {
  console.log(
    `Item Sku: ${product.sku} | Product Name: ${product.name} | Product Price: $${product.price.toFixed(2)} | Stock: ${product.stock}`
  );
});

let orders = [
  {
    orderId: "1001",
    items: [
      { sku: "SKU-001", qty: 4 },
      { sku: "SKU-002", qty: 3 }
    ]
  },
  {
    orderId: "1002",
    items: [
      { sku: "SKU-003", qty: 10 },
      { sku: "SKU-004", qty: 500 } 
    ]
  }
];

let processOrder = (order) => {
  let total = 0;
  let insufficientItem = null;

order.items.forEach(item => {
  if (insufficientItem) return;

  let product = inventory.find(p => p.sku === item.sku);
  if (!product || product.stock < item.qty) {
    insufficientItem = item.sku;
  }
});

  if (insufficientItem) {
    return `Insufficient Stock for Item ${insufficientItem} In Order ${order.orderId}`;
  }

  order.items.forEach(item => {
    let product = inventory.find(p => p.sku === item.sku);
    product.stock -= item.qty;
    total += product.price * item.qty;
  });

  return `Order ${order.orderId} Total: $${total.toFixed(2)}`;
};

orders.forEach(order => {
  console.log(processOrder(order));
});

console.log(
  `Total Inventory Value: $${inventory
    .reduce((total, product) => total + (product.price * product.stock), 0)
    .toFixed(2)}`
);

console.log(
  "Low Stock Items:",
  inventory.filter(product => product.stock <= 100)
);

console.log(
  "Price List:",
  inventory.map(product => `${product.sku} — $${product.price.toFixed(2)}`)
);