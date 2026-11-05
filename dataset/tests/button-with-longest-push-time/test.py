from solution import Solution

def run_tests():
    s = Solution()
    assert s.buttonWithLongestTime([[1,2],[2,5],[3,9],[1,15]]) == 1, "Example 1 failed"
    assert s.buttonWithLongestTime([[10,5],[1,7]]) == 10, "Example 2 failed"
    print("All tests passed successfully.")

if __name__ == '__main__':
    run_tests()

