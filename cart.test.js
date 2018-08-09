const cart = require('./cart.js')
const cars = require('./data/cars')

describe('Cart Properties: ', function(){
    test('Default Empty Array?', function(){
        expect( Array.isArray( cart.cart)).toEqual( true )
        expect( cart.cart.length ).toEqual(0)
    })
    test('Total default 0', function(){
        expect( cart.total ).toEqual(0)
    })
})

describe('Cart Methods: ', function(){
    afterEach(function(){
        cart.cart = []
        cart.total = 0
    })

    test('addToCart adds to array', function(){
        cart.addToCart(cars[0])
        cart.addToCart(cars[1])

        expect(cart.cart.length).toEqual(2)
        expect(cart.cart[0]).toEqual(cars[0])
        expect(cart.cart[1]).toEqual(cars[1])
    })

    test('add to cart should increase total', function(){
        cart.addToCart(cars[0])
        cart.addToCart(cars[3])
        cart.addToCart(cars[6])

        expect(cart.total).toEqual(cars[0].price + cars[3].price + cars[6].price)
    })

    test('remove from cart should remove', function(){
        cart.addToCart(cars[0])
        cart.addToCart(cars[1])
        cart.addToCart(cars[2])

        cart.removeFromCart(1, cars[1].price)

        expect(cart.cart.length).toEqual(2)
        expect(cart.cart[0]).toEqual(cars[0])
        expect(cart.cart[1]).toEqual(cars[2])
    })

    test('remove from cart decreases total', function(){
        cart.addToCart(cars[0])
        cart.addToCart(cars[3])
        cart.addToCart(cars[6])

        cart.removeFromCart(0, cars[0].price)
        cart.removeFromCart(1, cars[3].price)

        expect(cart.total).toEqual(cars[6].price)
    })

    test('checkout should empty cart', function(){
        cart.addToCart(cars[0])
        cart.addToCart(cars[1])
        cart.addToCart(cars[2])
        cart.addToCart(cars[3])

        cart.checkout()

        expect(cart.cart.length).toEqual(0)
        expect(cart.total).toEqual(0)
    })
})