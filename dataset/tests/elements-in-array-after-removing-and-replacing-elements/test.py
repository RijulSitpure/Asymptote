from solution import Solution

def run_tests():
    s = Solution()
    assert s.elementInNums([0, 1, 2], [[0, 2], [2, 0], [3, 2], [5, 0]]) == [2, 2, -1, 0]
    assert s.elementInNums([2], [[0, 0], [1, 0], [2, 0], [3, 0]]) == [2, -1, 2, -1]
    print("All tests passed for elements-in-array-after-removing-and-replacing-elements!")

if __name__ == '__main__':
    run_tests()
