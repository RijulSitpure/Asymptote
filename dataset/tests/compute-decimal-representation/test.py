class Solution:
    def computeDecimalRepresentation(self, digits: list[int]) -> int:
        val = 0
        for d in digits:
            val = val * 10 + d
        return val

def run_tests():
    sol = Solution()
    assert sol.computeDecimalRepresentation([1, 2, 3]) == 123
    assert sol.computeDecimalRepresentation([0]) == 0
    assert sol.computeDecimalRepresentation([9, 0, 5, 4]) == 9054
    print("All tests passed for 3697.")

if __name__ == "__main__":
    run_tests()