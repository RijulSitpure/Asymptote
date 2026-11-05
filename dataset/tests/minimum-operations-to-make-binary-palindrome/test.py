class Solution:
    def minOperations(self, s: str) -> int:
        left = 0
        right = len(s) - 1
        flips = 0
        while left < right:
            if s[left] != s[right]:
                flips += 1
            left += 1
            right -= 1
        return flips

def run_tests():
    sol = Solution()
    assert sol.minOperations("1001") == 0
    assert sol.minOperations("1010") == 2
    assert sol.minOperations("010") == 0
    print("All tests passed for 3766.")

if __name__ == "__main__":
    run_tests()
