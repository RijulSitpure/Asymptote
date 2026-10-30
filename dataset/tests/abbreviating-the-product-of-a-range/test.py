from solution import Solution

def run_tests():
    s = Solution()
    assert s.abbreviateProduct(1, 4) == "24e0"
    assert s.abbreviateProduct(2, 11) == "399168e2"
    assert s.abbreviateProduct(371, 375) == "7219856259e3"
    print("All tests passed for abbreviating-the-product-of-a-range!")

if __name__ == '__main__':
    run_tests()
