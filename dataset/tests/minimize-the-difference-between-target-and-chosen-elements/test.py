from solution import Solution

def run_tests():
    s = Solution()
    assert s.minimizeTheDifference([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 13) == 0
    assert s.minimizeTheDifference([[1], [2], [3]], 100) == 94
    assert s.minimizeTheDifference([[1, 2, 9, 8, 7]], 6) == 1
    print("All tests passed for minimize-the-difference-between-target-and-chosen-elements!")

if __name__ == "__main__":
    run_tests()
