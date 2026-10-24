class Solution:
    def superpalindromesInRange(self, left: str, right: str) -> int:
        L, R = int(left), int(right)
        count = 0

        def is_pal(x: int) -> bool:
            s = str(x)
            return s == s[::-1]

        for k in range(1, 100000):
            s = str(k)
            t = s + s[-2::-1]
            v = int(t) ** 2
            if v > R:
                break
            if v >= L and is_pal(v):
                count += 1

        for k in range(1, 100000):
            s = str(k)
            t = s + s[::-1]
            v = int(t) ** 2
            if v > R:
                break
            if v >= L and is_pal(v):
                count += 1

        return count

def test():
    sol = Solution()
    assert sol.superpalindromesInRange("4", "1000") == 4, "test 1 failed"
    assert sol.superpalindromesInRange("1", "2") == 1, "test 2 failed"
    print("✓ super-palindromes passed")

if __name__ == "__main__":
    test()
