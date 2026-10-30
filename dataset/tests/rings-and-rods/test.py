from solution import Solution

def run_tests():
    s = Solution()
    assert s.countPoints("B0B6G0R6R0R6G9") == 1
    assert s.countPoints("B0R0G0R9R0B0G0") == 1
    assert s.countPoints("G4") == 0
    print("All tests passed for rings-and-rods!")

if __name__ == '__main__':
    run_tests()
