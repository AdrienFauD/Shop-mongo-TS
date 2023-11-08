interface UseDiscountProps {
    price: number,
    discount: number
}

export default function useDiscount({ price, discount }: UseDiscountProps) : number{

    return price - ((price * discount) / 100)
}