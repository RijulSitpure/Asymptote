from solution import Solution

def run_tests():
    s = Solution()
    assert s.maximumBeauty([[1, 2], [3, 2], [2, 4], [5, 6], [3, 5]], [1, 2, 3, 4, 5, 6]) == [2, 4, 5, 5, 6, 6]
    assert s.maximumBeauty([[1, 2], [1, 2], [1, 2], [1, 2]], [1]) == [2]
    print("All tests passed for most-beautiful-item-for-each-query!")

if __name__ == "__main__":
    run_tests()
