import {defineField, defineType} from 'sanity'

export const menuItem = defineType({
  name: 'menuItem',
  title: 'Menu Item',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Breakfast', value: 'breakfast'},
          {title: 'Bagels', value: 'bagels'},
          {title: 'Salads', value: 'salads'},
          {title: 'Pide', value: 'pide'},
          {title: 'Crostini', value: 'crostini'},
          {title: 'Dessert', value: 'dessert'},
          {title: 'Nibbles', value: 'nibbles'},
          {title: 'Sandwiches', value: 'sandwiches'},
          {title: 'Specialty Coffees', value: 'specialty-coffees'},
          {title: 'Espresso Bar', value: 'espresso-bar'},
          {title: 'Classics', value: 'classics'},
          {title: 'Hot Chocolate', value: 'hot-chocolate'},
          {title: 'Teas', value: 'teas'},
          {title: 'Cold Coffee', value: 'cold-coffee'},
          {title: 'Handcrafted Brews', value: 'handcrafted-brews'},
          {title: 'Coolers', value: 'coolers'},
          {title: 'Milkshakes', value: 'milkshakes'},
          {title: 'Hot Beverage', value: 'hot-beverage'},
          {title: 'Iced Beverages', value: 'iced-beverages'},
          {title: 'Pour Over', value: 'pour-over'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'price',
      title: 'Price (INR)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'featured',
      title: 'Featured Item',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'dietary',
      title: 'Dietary Markers',
      type: 'array',
      of: [{type: 'string'}],
      options: {
        list: [
          {title: 'Vegetarian', value: 'veg'},
          {title: 'Non-Vegetarian', value: 'non-veg'},
          {title: 'Vegan', value: 'vegan'},
          {title: 'Gluten-Free', value: 'gf'},
        ],
      },
    }),
  ],
})
