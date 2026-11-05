from solution import Solution

def run_tests():
    s = Solution()
    assert s.checkValidCuts(5, [[1, 0, 5, 2], [0, 2, 2, 4], [3, 2, 5, 3], [0, 4, 4, 5]]) == True, "Example 1 failed"
    assert s.checkValidCuts(4, [[0, 0, 1, 1], [2, 0, 3, 4], [0, 2, 2, 3], [3, 0, 4, 3]]) == True, "Example 2 failed"
    assert s.checkValidCuts(4, [[0, 2, 2, 4], [1, 0, 3, 2], [2, 2, 3, 4], [3, 0, 4, 2], [3, 2, 4, 4]]) == False, "Example 3 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

