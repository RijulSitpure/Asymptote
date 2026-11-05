class Solution:
    def minOperations(self, s: str, target: str) -> int:
        ans = 0
        for c1, c2 in zip(s, target):
            diff = (ord(c2) - ord(c1)) % 26
            ans += diff
        return ans

def run_tests():
    sol = Solution()
    assert sol.minOperations("abc", "bcd") == 3
    assert sol.minOperations("a", "z") == 25
    assert sol.minOperations("hello", "hello") == 0
    print("All tests passed for 3675.")

if __name__ == "__main__":
    run_tests()
