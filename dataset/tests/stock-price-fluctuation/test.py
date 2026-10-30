from solution import StockPrice

def run_tests():
    sp = StockPrice()
    sp.update(1, 10)
    sp.update(2, 5)
    assert sp.current() == 5
    assert sp.maximum() == 10
    sp.update(1, 3)
    assert sp.maximum() == 5
    sp.update(4, 2)
    assert sp.minimum() == 2
    print("All tests passed for stock-price-fluctuation!")

if __name__ == "__main__":
    run_tests()
