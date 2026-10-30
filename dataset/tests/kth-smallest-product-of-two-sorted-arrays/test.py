from solution import Solution

def run_tests():
    s = Solution()
    assert s.kthSmallestProduct([2, 5], [3, 4], 2) == 8
    assert s.kthSmallestProduct([-4, -2, 0, 3], [2, 4], 6) == 0
    assert s.kthSmallestProduct([-2, -1, 0, 1, 2], [-3, -1, 2, 4, 5], 3) == -6
    print("All tests passed for kth-smallest-product-of-two-sorted-arrays!")

if __name__ == "__main__":
    run_tests()
