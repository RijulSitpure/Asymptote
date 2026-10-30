from solution import Solution

def run_tests():
    s = Solution()
    assert s.getDistances([2, 1, 3, 1, 2, 3, 3]) == [4, 2, 7, 2, 4, 4, 5]
    assert s.getDistances([10, 5, 10, 10]) == [5, 0, 3, 4]
    print("All tests passed for intervals-between-identical-elements!")

if __name__ == '__main__':
    run_tests()
