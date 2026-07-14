const { createClient } = require('@sanity/client')

// Fill these in
const client = createClient({
  projectId: '<PROJECT_ID>',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2023-01-01',
  token: '<YOUR_SANITY_TOKEN>' // Required to write
})

const menuItems = [
  {
    "name": "Stacked Pancakes (Berry & Caramelized Banana)",
    "category": "breakfast",
    "price": 320.0,
    "description": "Fluffy, golden pancakes with juicy homemade mixed berries jam, caramelized banana, and a drizzle of rich maple syrup.",
    "dietary": []
  },
  {
    "name": "All Day Breakfast",
    "category": "breakfast",
    "price": 380.0,
    "description": "Artisan toast, saut\u00e9ed mushrooms and cherry tomatoes, sliced avocado and choice of your egg served with achari hollandaise on the side a tangy, pickled spice infused take on the classic creamy sauce",
    "dietary": []
  },
  {
    "name": "Eggs On Avocado W Achari Hollandaise",
    "category": "breakfast",
    "price": 295.0,
    "description": "Creamy smashed avocado spread over crisp sour dough bread, topped with two perfectly cooked eggs of your choice, and finished with our signature achari hollandaise",
    "dietary": []
  },
  {
    "name": "Honey Butter Toast",
    "category": "breakfast",
    "price": 285.0,
    "description": "Golden brioche soaked in vanilla custard, topped with honey-butter and a cloud of clotted cream sweet mornings in every bite.",
    "dietary": []
  },
  {
    "name": "Hummus & Pickled Veg",
    "category": "bagels",
    "price": 285.0,
    "description": "A toasty bagel spread with creamy hummus, pickled veggies and crisp lettuce, olive oil. Bright, savory, and perfect for a satisfying bite any time of day.",
    "dietary": [
      "veg"
    ]
  },
  {
    "name": "3 Cheese & Caramelized Onions",
    "category": "bagels",
    "price": 310.0,
    "description": "A toasty bagel with cream cheese, shredded cheddar and mozzarella, then crowned with sweet caramelized onion chutney & fresh arugula.",
    "dietary": []
  },
  {
    "name": "Pizza Bagel",
    "category": "bagels",
    "price": 340.0,
    "description": "A toasty bagel with herb-garlic butter, topped with rich marinara sauce, melted mozzarella, and chicken pepperoni slices. Pizza meets bagel, simply comforting.",
    "dietary": []
  },
  {
    "name": "Watermelon Feta",
    "category": "salads",
    "price": 175.0,
    "description": "A fresh & light salad with juicy fresh watermelon with feta over arugula and mint leaves. Dressed in a balsamic vinaigrette, a perfect dish for a warm afternoon",
    "dietary": []
  },
  {
    "name": "Iron Feast",
    "category": "salads",
    "price": 220.0,
    "description": "A hearty bowl of greens with iceberg,baby spinach, quinoa, lentils. Cherry tomatoes, orange, pumpkin & sunflower seeds, feta and orange vinaigrette, wholesome, nourishing, and deeply satisfying.",
    "dietary": []
  },
  {
    "name": "Buffalo Chicken",
    "category": "pide",
    "price": 350.0,
    "description": "A crisp boat-shaped pide base piled high with juicy chicken tossed in tangy, spicy buffalo sauce. Topped with mozzarella cheese",
    "dietary": []
  },
  {
    "name": "Creamed Corn & Spinach",
    "category": "pide",
    "price": 295.0,
    "description": "Golden pide filled with sweet corn, baby spinach, creamy sauce, and a cheesy-garlic finish.",
    "dietary": []
  },
  {
    "name": "Thecha Shrimp",
    "category": "pide",
    "price": 375.0,
    "description": "Shrimp saut\u00e9ed in fiery thecha a rustic maharashtrian chili-&-nut spice mix with roasted garlic, fresh herbs, and mozzarella.",
    "dietary": []
  },
  {
    "name": "Buffalo Chicken (Crostini)",
    "category": "crostini",
    "price": 330.0,
    "description": "A warm garlic-herb butter brushed baguette layered w/ sour cream, fiery buffalo-tossed chicken, tangy feta. Spicy, mellow, and oh-so satisfying.",
    "dietary": []
  },
  {
    "name": "Mediterranean",
    "category": "crostini",
    "price": 250.0,
    "description": "A warm garlic-herb butter brushed baguette, topped with homemade hummus, crumbly feta, and grilled veggies",
    "dietary": [
      "veg"
    ]
  },
  {
    "name": "Avocado & Sundried Tomato",
    "category": "crostini",
    "price": 275.0,
    "description": "Soft smashed avocado over herb garlic butter, with sun-dried tomatoes and crunchy roasted almonds, a sweet-heat drizzle of chill-infused honey and a sprinkle of feta.",
    "dietary": []
  },
  {
    "name": "Toscano Dolce",
    "category": "dessert",
    "price": 345.0,
    "description": "Soft vanilla cake gently soaked in a rich coffee elixir, coffee cream a perfect twist on classic tiramisu",
    "dietary": []
  },
  {
    "name": "Isle Of Lime",
    "category": "dessert",
    "price": 250.0,
    "description": "A refreshing tropical indulgence with biscoff crumble, lime & coconut cream cheese, coconut sauce, and a hint of mint",
    "dietary": []
  },
  {
    "name": "Yam Chips",
    "category": "nibbles",
    "price": 115.0,
    "description": "A twist your taste buds won't see coming thinly hand cut elephant foot yam, fried and seasoned with homemade secret spiced mix",
    "dietary": []
  },
  {
    "name": "Tendli Fries",
    "category": "nibbles",
    "price": 115.0,
    "description": "Your new favourite sidekick to any meal spiced ivy gourd seasoned with homemade secret spice mix fried to golden perfection",
    "dietary": []
  },
  {
    "name": "Ham & Cheese",
    "category": "sandwiches",
    "price": 425.0,
    "description": "Mustard, cheddar cheese, tomato, caramelized onion and chicken ham, fried egg on sourdough bread",
    "dietary": []
  },
  {
    "name": "Roasted Veg",
    "category": "sandwiches",
    "price": 340.0,
    "description": "Sour dough bread, pesto, hummus, grilled veg, feta cheese, tomato and lettuce.",
    "dietary": [
      "veg"
    ]
  },
  {
    "name": "Bbq Chicken Sandwich",
    "category": "sandwiches",
    "price": 380.0,
    "description": "Bbq mayo, lettuce, gherkins, bbq chicken, cheddar cheese, fried egg",
    "dietary": []
  },
  {
    "name": "Egg Avocado And Bacon Sandwich",
    "category": "sandwiches",
    "price": 360.0,
    "description": "Churmuri mayo, cheese, roman lettuce, chicken bacon, avocado, fried egg on sourdough bread",
    "dietary": []
  },
  {
    "name": "Ocean Iced Latte",
    "category": "specialty-coffees",
    "price": 350.0,
    "description": "Layers of silky caramel syrup, aromatic butterfly pea tea, rich espresso, and warm milk, topped with a soft cloud of milk foam.",
    "dietary": []
  },
  {
    "name": "Mediterranean Glow Iced Latte",
    "category": "specialty-coffees",
    "price": 220.0,
    "description": "Sweet honey forms the base, followed by a burst of fresh orange juice, finished with a rich layer of espresso.",
    "dietary": []
  },
  {
    "name": "Espresso - Single",
    "category": "espresso-bar",
    "price": 130.0,
    "description": "",
    "dietary": []
  },
  {
    "name": "Espresso - Double",
    "category": "espresso-bar",
    "price": 150.0,
    "description": "",
    "dietary": []
  },
  {
    "name": "Americano",
    "category": "espresso-bar",
    "price": 160.0,
    "description": "",
    "dietary": []
  },
  {
    "name": "Cappuccino",
    "category": "classics",
    "price": 180.0,
    "description": "",
    "dietary": []
  },
  {
    "name": "Latte",
    "category": "classics",
    "price": 180.0,
    "description": "",
    "dietary": []
  },
  {
    "name": "Caf\u00e9 Latte",
    "category": "classics",
    "price": 180.0,
    "description": "",
    "dietary": []
  },
  {
    "name": "Flat White",
    "category": "classics",
    "price": 180.0,
    "description": "",
    "dietary": []
  },
  {
    "name": "Cortado",
    "category": "classics",
    "price": 175.0,
    "description": "",
    "dietary": []
  },
  {
    "name": "Macchiato",
    "category": "classics",
    "price": 175.0,
    "description": "",
    "dietary": []
  },
  {
    "name": "Mocha",
    "category": "classics",
    "price": 210.0,
    "description": "",
    "dietary": []
  },
  {
    "name": "Spanish Latte",
    "category": "classics",
    "price": 220.0,
    "description": "",
    "dietary": []
  },
  {
    "name": "Classic Hot Choc",
    "category": "hot-chocolate",
    "price": 210.0,
    "description": "",
    "dietary": []
  },
  {
    "name": "S'mores",
    "category": "hot-chocolate",
    "price": 250.0,
    "description": "A decadent hot chocolate topped with torched marshmallow for that classic campfire s'mores flavour.",
    "dietary": []
  },
  {
    "name": "Classic Hot Teas",
    "category": "teas",
    "price": 150.0,
    "description": "Our barista team will be happy to guide you through our curated tea collection.",
    "dietary": []
  },
  {
    "name": "Iced Tea",
    "category": "teas",
    "price": 195.0,
    "description": "Flavors: passion fruit, apple, peach",
    "dietary": []
  },
  {
    "name": "Classic Cold Coffee",
    "category": "cold-coffee",
    "price": 190.0,
    "description": "",
    "dietary": []
  },
  {
    "name": "Irish Cold Coffee",
    "category": "cold-coffee",
    "price": 210.0,
    "description": "",
    "dietary": []
  },
  {
    "name": "Cold Mocha",
    "category": "cold-coffee",
    "price": 195.0,
    "description": "",
    "dietary": []
  },
  {
    "name": "Vietnamese Coffee",
    "category": "cold-coffee",
    "price": 215.0,
    "description": "",
    "dietary": []
  },
  {
    "name": "Iced Latte",
    "category": "cold-coffee",
    "price": 195.0,
    "description": "",
    "dietary": []
  },
  {
    "name": "Spanish Latte",
    "category": "cold-coffee",
    "price": 220.0,
    "description": "",
    "dietary": []
  },
  {
    "name": "Irish Latte",
    "category": "cold-coffee",
    "price": 210.0,
    "description": "",
    "dietary": []
  },
  {
    "name": "Aeropress",
    "category": "handcrafted-brews",
    "price": 230.0,
    "description": "",
    "dietary": []
  },
  {
    "name": "Pour Over",
    "category": "handcrafted-brews",
    "price": 230.0,
    "description": "",
    "dietary": []
  },
  {
    "name": "Syphon",
    "category": "handcrafted-brews",
    "price": 260.0,
    "description": "",
    "dietary": []
  },
  {
    "name": "Watermelon Juice",
    "category": "coolers",
    "price": 120.0,
    "description": "",
    "dietary": []
  },
  {
    "name": "Lemon Mint Mojito",
    "category": "coolers",
    "price": 150.0,
    "description": "",
    "dietary": []
  },
  {
    "name": "Orange Mint Mojito",
    "category": "coolers",
    "price": 150.0,
    "description": "",
    "dietary": []
  },
  {
    "name": "Green Apple Mojito",
    "category": "coolers",
    "price": 150.0,
    "description": "",
    "dietary": []
  },
  {
    "name": "Lemon Fresh Soda",
    "category": "coolers",
    "price": 110.0,
    "description": "",
    "dietary": []
  },
  {
    "name": "Strawberry Milkshake",
    "category": "milkshakes",
    "price": 165.0,
    "description": "",
    "dietary": []
  },
  {
    "name": "Berry Blast Milkshake",
    "category": "milkshakes",
    "price": 165.0,
    "description": "",
    "dietary": []
  },
  {
    "name": "Vanilla Milkshake",
    "category": "milkshakes",
    "price": 165.0,
    "description": "",
    "dietary": []
  },
  {
    "name": "Mango Milkshake",
    "category": "milkshakes",
    "price": 165.0,
    "description": "",
    "dietary": []
  },
  {
    "name": "Soy Milk",
    "category": "milkshakes",
    "price": 50.0,
    "description": "",
    "dietary": []
  },
  {
    "name": "Oat Milk",
    "category": "milkshakes",
    "price": 50.0,
    "description": "",
    "dietary": []
  },
  {
    "name": "Almond Milk",
    "category": "milkshakes",
    "price": 80.0,
    "description": "",
    "dietary": []
  },
  {
    "name": "Espresso",
    "category": "hot-beverage",
    "price": 160.0,
    "description": "Concentrated coffee, pure, rich, hot.",
    "dietary": []
  },
  {
    "name": "Double Espresso",
    "category": "hot-beverage",
    "price": 190.0,
    "description": "Concentrated coffee, pure, rich, hot.",
    "dietary": []
  },
  {
    "name": "Americano",
    "category": "hot-beverage",
    "price": 175.0,
    "description": "Smooth espresso diluted with hot water for a mellow cup",
    "dietary": []
  },
  {
    "name": "Cappuccino",
    "category": "hot-beverage",
    "price": 190.0,
    "description": "Espresso crowned with velvety steamed milk and foam",
    "dietary": []
  },
  {
    "name": "Caff\u00e8 Latte",
    "category": "hot-beverage",
    "price": 190.0,
    "description": "Creamy steamed milk blended with a bold espresso base",
    "dietary": []
  },
  {
    "name": "Flat White",
    "category": "hot-beverage",
    "price": 190.0,
    "description": "Silky micro-foam and espresso in perfect balance.",
    "dietary": []
  },
  {
    "name": "Mocha",
    "category": "hot-beverage",
    "price": 220.0,
    "description": "Espresso with steamed milk and a touch of chocolate indulgence.",
    "dietary": []
  },
  {
    "name": "Cortado",
    "category": "hot-beverage",
    "price": 200.0,
    "description": "Equal parts espresso and warm milk for a smooth, bold sip",
    "dietary": []
  },
  {
    "name": "Hot Chocolate - Premium",
    "category": "hot-beverage",
    "price": 230.0,
    "description": "Luxurious cocoa finished with steamed milk",
    "dietary": []
  },
  {
    "name": "Spanish Latte",
    "category": "hot-beverage",
    "price": 230.0,
    "description": "Espresso sweetened with condensed milk and velvety foam.",
    "dietary": []
  },
  {
    "name": "Macchiato",
    "category": "hot-beverage",
    "price": 200.0,
    "description": "Espresso \"stained\" with a dollop of frothy milk.",
    "dietary": []
  },
  {
    "name": "Hot Tea",
    "category": "hot-beverage",
    "price": 230.0,
    "description": "A selection of fine teas, including black, green, and herbal.",
    "dietary": []
  },
  {
    "name": "Iced Americano",
    "category": "iced-beverages",
    "price": 190.0,
    "description": "Espresso poured over cold water and ice for a crisp finish.",
    "dietary": []
  },
  {
    "name": "Classic Iced Coffee",
    "category": "iced-beverages",
    "price": 220.0,
    "description": "Robust coffee with vanilla ice cream blended w/ ice.",
    "dietary": []
  },
  {
    "name": "Iced Latte",
    "category": "iced-beverages",
    "price": 220.0,
    "description": "Cold milk and espresso served refreshingly over ice",
    "dietary": []
  },
  {
    "name": "Iced Mocha",
    "category": "iced-beverages",
    "price": 250.0,
    "description": "Espresso, chocolate, and chilled milk on the rocks",
    "dietary": []
  },
  {
    "name": "Caramel Iced Coffee",
    "category": "iced-beverages",
    "price": 260.0,
    "description": "Classic iced coffee with a rich caramel drizzle",
    "dietary": []
  },
  {
    "name": "Nordic Spark",
    "category": "iced-beverages",
    "price": 280.0,
    "description": "Espresso & tonic water",
    "dietary": []
  },
  {
    "name": "Island Drift",
    "category": "iced-beverages",
    "price": 280.0,
    "description": "Fresh coconut water & espresso",
    "dietary": []
  },
  {
    "name": "Mediterranean Glow",
    "category": "iced-beverages",
    "price": 280.0,
    "description": "Orange, honey & espresso",
    "dietary": []
  },
  {
    "name": "Cold Brew With Milk",
    "category": "iced-beverages",
    "price": 280.0,
    "description": "This delicious latte style cold brew has notes of dry fruit, shiraz and caramel.",
    "dietary": []
  },
  {
    "name": "Vietnamese Style Iced Coffee",
    "category": "iced-beverages",
    "price": 280.0,
    "description": "Our take on the vietnamese classic! Concentrated, dark cold brew poured over ice, topped with sweetened condensed milk.",
    "dietary": []
  },
  {
    "name": "Medium Roast",
    "category": "pour-over",
    "price": 280.0,
    "description": "Rich chocolate caramel",
    "dietary": []
  },
  {
    "name": "Medium Dark",
    "category": "pour-over",
    "price": 290.0,
    "description": "Berry & chocolate with velvety finish",
    "dietary": []
  },
  {
    "name": "Mild",
    "category": "pour-over",
    "price": 290.0,
    "description": "Banana and berry",
    "dietary": []
  }
]

async function seed() {
  console.log('Seeding ' + menuItems.length + ' items...')
  for (const item of menuItems) {
    const doc = {
      _type: 'menuItem',
      ...item
    }
    try {
      const res = await client.create(doc)
      console.log(`Created ${item.name}`)
    } catch (err) {
      console.error(`Failed to create ${item.name}:`, err.message)
    }
  }
  console.log('Done seeding.')
}

seed()
