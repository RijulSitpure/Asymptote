class Solution:
    def getKth(self, lo: int, hi: int, k: int) -> int:
        cache = {1: 0}
        def get_power(x):
            if x in cache:
                return cache[x]
            if x % 2 == 0:
                res = 1 + get_power(x // 2)
            else:
                res = 1 + get_power(3 * x + 1)
            cache[x] = res
            return res
        items = [(get_power(x), x) for x in range(lo, hi + 1)]
        items.sort()
        return items[k - 1][1]

def test():
    sol = Solution()
    assert sol.getKth(12, 15, 2) == 13, "test 1 failed"
    assert sol.getKth(7, 11, 4) == 7, "test 2 failed"
    print("✓ sort-integers-by-the-power-value passed")

if __name__ == "__main__":
    test()
