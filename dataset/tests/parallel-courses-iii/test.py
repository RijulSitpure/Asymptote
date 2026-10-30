from solution import Solution

def run_tests():
    s = Solution()
    assert s.minimumTime(3, [[1, 3], [2, 3]], [3, 2, 5]) == 8
    assert s.minimumTime(5, [[1, 5], [2, 5], [3, 5], [3, 4], [4, 5]], [1, 2, 3, 4, 5]) == 12
    print("All tests passed for parallel-courses-iii!")

if __name__ == "__main__":
    run_tests()
