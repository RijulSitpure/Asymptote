from solution import Solution

def run_tests():
    s = Solution()
    assert s.numberOfPaths(5, [[1, 2], [5, 2], [4, 1], [2, 4], [3, 1], [3, 4]]) == 2
    assert s.numberOfPaths(4, [[1, 2], [3, 4]]) == 0
    print("All tests passed for paths-in-maze-that-lead-to-same-room!")

if __name__ == "__main__":
    run_tests()
