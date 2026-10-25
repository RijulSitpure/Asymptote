class Solution:
    def chalkReplacer(self, chalk: list[int], k: int) -> int:
        k %= sum(chalk)
        for i, c in enumerate(chalk):
            if k < c:
                return i
            k -= c
        return 0

def test():
    sol = Solution()
    assert sol.chalkReplacer([5,1,5], 22) == 0
    assert sol.chalkReplacer([3,4,1,2], 25) == 1

if __name__ == '__main__':
    test()
