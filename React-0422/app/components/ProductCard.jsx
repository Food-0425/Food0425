// components/ProductCard.jsx
export const ProductCard = ({ product }) => {
  return (
    <div className="border p-4 rounded">
      <h2 className="text-lg font-bold">{product.title}</h2>
      {product.type === 'digital' ? (
        <p>這是數位產品！可立即下載</p>
      ) : (
        <p>這是實體產品，將由物流配送</p>
      )}
    </div>
  )
}

export default ProductCard
