class Solution:
    def maxDepthAfterSplit(self, seq: str) -> list[int]:
        res = []
        depth = 0
        for c in seq:
            if c == '(':
                res.append(depth % 2)
                depth += 1
            else:
                depth -= 1
                res.append(depth % 2)
        return res

def test():
    sol = Solution()
    res1 = sol.maxDepthAfterSplit("(()())")
    assert len(res1) == 6, "test 1 failed"
    res2 = sol.maxDepthAfterSplit("()(())()")
    assert len(res2) == 8, "test 2 failed"
    print("✓ maximum-nesting-depth-of-two-valid-parentheses-strings passed")

if __name__ == "__main__":
    test()
