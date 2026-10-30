from solution import Solution

def run_tests():
    s = Solution()
    assert s.minimumRefill([2, 2, 3, 3], 5, 5) == 1
    assert s.minimumRefill([2, 2, 3, 3], 3, 4) == 2
    assert s.minimumRefill([5], 10, 8) == 0
    print("All tests passed for watering-plants-ii!")

if __name__ == '__main__':
    run_tests()
