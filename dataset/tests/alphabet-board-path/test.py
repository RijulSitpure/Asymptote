class Solution:
    def alphabetBoardPath(self, target: str) -> str:
        res = []
        r, c = 0, 0
        for ch in target:
            idx = ord(ch) - ord('a')
            tr, tc = divmod(idx, 5)
            if tc < c:
                res.append('L' * (c - tc))
            if tr < r:
                res.append('U' * (r - tr))
            if tr > r:
                res.append('D' * (tr - r))
            if tc > c:
                res.append('R' * (tc - c))
            res.append('!')
            r, c = tr, tc
        return "".join(res)

def test():
    sol = Solution()
    assert sol.alphabetBoardPath("leet") == "DDR!UURRR!!DDD!", "test 1 failed"
    assert sol.alphabetBoardPath("code") == "RR!DDRR!LUU!R!", "test 2 failed"
    print("✓ alphabet-board-path passed")

if __name__ == "__main__":
    test()
