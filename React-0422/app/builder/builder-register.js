// builder-register.js
import { Builder } from '@builder.io/react'
import { ProductCard } from '../components/ProductCard'

Builder.registerComponent(ProductCard, {
  name: 'ProductCard',
  inputs: [
    {
      name: 'product',
      type: 'object',
      defaultValue: {
        type: 'digital',
        title: 'Awesome Course',
      },
    },
  ],
})
