class Solution:
    def mirrorDistance(self, n: int) -> int:
        rev_n = int(str(n)[::-1])
        return abs(n - rev_n)

def run_tests():
    sol = Solution()
    assert sol.mirrorDistance(123) == 198 # |123 - 321| = 198
    assert sol.mirrorDistance(11) == 0
    assert sol.mirrorDistance(20) == 18 # |20 - 2| = 18
    print("All tests passed for 3783.")

if __name__ == "__main__":
    run_tests()
