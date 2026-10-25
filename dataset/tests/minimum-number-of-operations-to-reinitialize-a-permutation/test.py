class Solution:
    def reinitializePermutation(self, n: int) -> int:
        pos = 1
        steps = 0
        while True:
            if pos < n // 2:
                pos = 2 * pos
            else:
                pos = 2 * pos - (n - 1)
            steps += 1
            if pos == 1:
                break
        return steps

def test():
    sol = Solution()
    assert sol.reinitializePermutation(2) == 1
    assert sol.reinitializePermutation(4) == 2
    assert sol.reinitializePermutation(6) == 4

if __name__ == '__main__':
    test()
