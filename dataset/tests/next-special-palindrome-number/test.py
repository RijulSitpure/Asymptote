class Solution:
    def nextSpecialPalindrome(self, n: int) -> int:
        cur = n + 1
        while True:
            s = str(cur)
            if s == s[::-1]:
                return cur
            half = len(s) // 2
            left = s[:len(s) - half]
            cand = int(left + left[::-1][len(s) % 2:])
            if cand > n:
                return cand
            cur = int(left) + 1
            cur = int(str(cur) + "0" * half)

def run_tests():
    sol = Solution()
    assert sol.nextSpecialPalindrome(10) == 11
    assert sol.nextSpecialPalindrome(123) == 131
    assert sol.nextSpecialPalindrome(99) == 101
    print("All tests passed for 3646.")

if __name__ == "__main__":
    run_tests()
