class Solution:
    def confusingNumberII(self, n: int) -> int:
        mapping = {0: 0, 1: 1, 6: 9, 8: 8, 9: 6}
        digits = [0, 1, 6, 8, 9]

        def is_confusing(x: int) -> bool:
            orig = x
            rotated = 0
            while x > 0:
                rotated = rotated * 10 + mapping[x % 10]
                x //= 10
            return rotated != orig

        def dfs(num: int) -> int:
            count = 1 if is_confusing(num) else 0
            for d in digits:
                nxt = num * 10 + d
                if nxt <= n:
                    count += dfs(nxt)
            return count

        total = 0
        for d in [1, 6, 8, 9]:
            if d <= n:
                total += dfs(d)
        return total

def test():
    sol = Solution()
    assert sol.confusingNumberII(20) == 6, "test 1 failed"
    assert sol.confusingNumberII(100) == 19, "test 2 failed"
    print("✓ confusing-number-ii passed")

if __name__ == "__main__":
    test()
