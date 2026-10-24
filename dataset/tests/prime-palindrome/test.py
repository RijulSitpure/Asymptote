class Solution:
    def primePalindrome(self, n: int) -> int:
        def is_prime(x: int) -> bool:
            if x < 2 or x % 2 == 0:
                return x == 2
            d = 3
            while d * d <= x:
                if x % d == 0:
                    return False
                d += 2
            return True

        if 8 <= n <= 11:
            return 11
        for L in range(1, 6):
            for root in range(10**(L - 1), 10**L):
                s = str(root)
                cand = int(s + s[-2::-1])
                if cand >= n and is_prime(cand):
                    return cand
        return -1

def test():
    sol = Solution()
    assert sol.primePalindrome(6) == 7, "test 1 failed"
    assert sol.primePalindrome(8) == 11, "test 2 failed"
    assert sol.primePalindrome(13) == 101, "test 3 failed"
    print("✓ prime-palindrome passed")

if __name__ == "__main__":
    test()
